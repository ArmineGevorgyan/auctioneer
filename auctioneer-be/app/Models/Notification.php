<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content',
        'user_id',
        'is_seen',
    ];
    
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
