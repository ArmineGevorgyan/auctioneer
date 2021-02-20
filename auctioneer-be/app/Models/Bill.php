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

    public function user()
    {
        return $this->hasOne('App\Models\User');
    }

    public function product()
    {
        return $this->hasOne('App\Models\Product');
    }
}
