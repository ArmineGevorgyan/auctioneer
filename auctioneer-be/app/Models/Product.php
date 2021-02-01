<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
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
        'is_available'
    ];
 
    protected $dates = [
        'closing_date',
    ];

    protected $casts = [
        'starting_price' => 'float',
        'current_price' => 'float',
    ];

    
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    public function bids()
    {
        return $this->hasMany('App\Models\Bid', 'product_id');
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
}
