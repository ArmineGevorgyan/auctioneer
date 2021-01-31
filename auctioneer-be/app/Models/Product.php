<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
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
        'desctiption',
        'image',
        'starting_price',
        'current_price',
        'is_available'
    ];

    
    protected $casts = [
        'starting_price' => 'float',
        'current_price' => 'float',
    ];

    
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }
}