<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'amount',
        'product_id',
        'bid_id',
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    public function bid()
    {
        return $this->belongsTo('App\Models\Bid');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }
}
