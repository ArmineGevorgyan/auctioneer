<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Interfaces\IUsersService;
use App\Models\User;
use Log;

class UsersService implements IUsersService
{
    /**
     * {@inheritdoc}
     */
    public function getAllUsers($user)
    {
        Log::info('Getting all users');

        $this->validateAdmin($user);

        return User::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getUser($id)
    {
        Log::info('Getting user by id', ['id' => $id]);

        return User::with(['bids', 'bids.product', 'notifications'])->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function getUserByUsername($username)
    {
        Log::info('Getting user by username', ['username' => $username]);

        return User::where('username', $username)->first();
    }

    /**
     * {@inheritdoc}
     */
    public function update($user, $data)
    {
        Log::info('Updating user');
        
        return $user->update(array_merge($data, ['max_bid_left' =>$data['max_bid_amount']]));
    }

    /**
     * {@inheritdoc}
     */
    public function create($data)
    {
        Log::info('Creating user');
        
        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'api_token' => Str::random(60),
        ]);
        $user->assignRole('visitor');

        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function createAdmin($user, $data)
    {
        $this->validateAdmin($user);
        
        $user = $this->create($data);
        $user->assignRole('admin');

        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function markNotificationsSeen($user)
    {
        $notifications =  $user->notifications;

        foreach($notifications as $notification){
            $notification->update(['is_seen' => true]);
        }
    }
    
    private function validateAdmin($user)
    {
        if(!$user->is_admin) {
            Log::warning("Invalid User");
            throw new \Exception("Invalid User");
        }
    }
}