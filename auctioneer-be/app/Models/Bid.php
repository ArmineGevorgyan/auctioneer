<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Jobs\GenerateMail;
use App\Mail\NewBidMail;
use App\Mail\AutobidFailedMail;
use App\Mail\AutobidAmountRunOutMail;

class Bid extends Model
{
    const IN_PROGRESS = 'IN_PROGRESS';
    const WON = 'WON';
    const LOST = 'LOST';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'amount',
        'product_id',
        'user_id',
        'auto_bidding',
        'status',
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    public static function boot()
    {
        parent::boot();
        
        self::created(function($model){
            self::sendMailToOtherBidders($model);
        });
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    public function bill()
    {
        return $this->belongsTo('App\Models\Bill');
    } 

    public function scopeAutobidding($query){
        return $query->where('auto_bidding', true);
    }

    public function updateAmount(){
        $highestBid = $this->product->getHighestBid();
        $user = $this->user;
        $diff = $highestBid->amount + 1 - $this->amount;

        if($this->amount >= $highestBid->amount || $user->max_bid_left < $diff) return;

        $this->product->update(['current_price' => $highestBid->amount + 1]);
        $this->update(['amount' => $highestBid->amount + 1]);
        $user->update(['max_bid_left' => $user->max_bid_left - $diff]);
        $this->checkAutobiddingAmount($this, $user);
        $this->updateOtherBids();

        $this->notifyUser($user);
    }

    public function updateOtherBids(){
        $bids = $this->product->bidsWithAutobidding();
        foreach($bids as $bid) {
            $bid->updateAmount();
        }
    }

    private function notifyUser($user) {
        $percent_used = ($user->max_bid_amount - $user->max_bid_left)/$user->max_bid_amount * 100;
        if($percent_used > $user->autobid_notify_percent){
            $user->notifications()
                ->create([
                    'content'=> "Auto-bidding: more than ".$user->autobid_notify_percent."% of your autobidding amount has been used."
                ]);
        }

    }

    public function sendMailToAutoBidders() {
        $highestBid = $this->product->getHighestBid();
        $bids = $this->product->bidsWithAutobidding();
        
        foreach($bids as $bid) {
            $diff = $highestBid->amount + 1 - $bid->amount; 
            $user = $bid->user;
            
            if($user->max_bid_left >= $diff) {
                return;
            }

            $this->update(['auto_bidding' => false]);
    
            \Log::info("Sending email notifications to other auto bidders about their unsuccessful autobid");
            $mailable = new AutobidFailedMail($model);
            GenerateMail::dispatch($mailable, [$user->email]);
        }
    }

    private static function sendMailToOtherBidders($model) { 
        \Log::info("Sending email notifications to other bidders about their bid being outbid");
        $other_bids = $model->product->bids;
        $emails = [];
        foreach($other_bids as $bid) {
            if($model->user->id == $bid->user->id)  continue;
            if($bid->auto_bidding)  continue; // autobidding is still continuing

            $emails[] = $bid->user->email;
        }
        $emails = array_unique($emails);

        $mailable = new NewBidMail($model);
        GenerateMail::dispatch($mailable, $emails);
    }

    private function checkAutobiddingAmount($model, $user) { 
        if($user->max_bid_left > 0) {
            return;
        }

        $this->update(['auto_bidding' => false]);

        \Log::info("User max bid amount run out, sending email notification.");      
        $mailable = new AutobidAmountRunOutMail($model);
        GenerateMail::dispatch($mailable, [$user->email]);
    }
}
