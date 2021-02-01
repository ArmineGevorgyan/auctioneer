<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
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
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    public function scopeAutobidding($query){
        return $query->where('auto_bidding', true);
    }

    public function updateAmount(){
        $highestBid = $this->product->getHighestBid();
        $user = $this->user;
        $diff = $highestBid->amount + 1 - $this->amount;

        if(($this->amount < $highestBid->amount) && $user->max_bid_amount >= $diff) {
            $this->product->update(['current_price' => $highestBid->amount + 1]);
            $this->update(['amount' => $highestBid->amount + 1]);
            $user->update(['max_bid_amount' => $user->max_bid_amount - $diff]);
            Bid::updateOtherBids($this);
        }
    }

    public static function updateOtherBids($model){
        $bids = $model->product->bidsWithAutobidding();
        foreach($bids as $bid) {
            $bid->updateAmount();
        }
    }
}
