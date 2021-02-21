<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    const IN_PROGRESS = 'IN_PROGRESS';
    const SOLD = 'SOLD';
    const CLOSED = 'CLOSED';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'image',
        'starting_price',
        'current_price',
        'closing_date',
        'is_available',
        'status',
    ];
 
    protected $dates = [
        'closing_date',
    ];

    protected $casts = [
        'starting_price' => 'float',
        'current_price' => 'float',
    ];
  
    protected $appends = [
        'winning_user',
        'sold_price'
    ];
    
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    public function bids()
    {
        return $this->hasMany('App\Models\Bid', 'product_id');
    } 

    public function bill()
    {
        return $this->belongsTo('App\Models\Bill');
    } 

    public function lastBidByUser($user){
        return $this->bids()->where('user_id', $user->id)->orderBy('amount', 'desc')->first();
    }
    
    public function getHighestBid(){
        return $this->bids()->orderBy('amount', 'desc')->first();
    }
    
    public function bidsWithAutobidding(){
        return $this->bids()->where('auto_bidding', true)->get();
    }
    
    public static function getProductsByClosingDate($date){
        return Product::whereDate('closing_date', '<=', $date)->where('status', self::IN_PROGRESS)->get();
    }

    public function getWinningUserAttribute()
    {
        if($this->status !== self::SOLD){
            return "";
        }

        return $this->getHighestBid()->user->username;
    }

    public function getSoldPriceAttribute()
    {
        if($this->status !== self::SOLD){
            return "";
        }

        return $this->getHighestBid()->amount;
    }
}
