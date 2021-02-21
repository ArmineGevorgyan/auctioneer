<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'max_bid_amount',
        'max_bid_left',
        'autobid_notify_percent',
    ];
  
    protected $appends = [
        'is_admin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'roles',
        'api_token'
    ];

    public function getIsAdminAttribute(){
        return $this->hasRole('admin');
    }
    
    public function bids()
    {
        return $this->hasMany('App\Models\Bid', 'user_id');
    }
    
    public function notifications()
    {
        return $this->hasMany('App\Models\Notification', 'user_id');
    }
}
