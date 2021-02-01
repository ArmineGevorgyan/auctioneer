<?php

namespace App\Services;

use App\Interfaces\IUsersService;
use App\Models\User;

class UsersService implements IUsersService
{
    /**
     * {@inheritdoc}
     */
    public function getAllUsers()
    {
        return User::all();
    }

    /**
     * {@inheritdoc}
     */
    public function getUser($id)
    {
        return User::with(['bids', 'notifications'])->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function update($user, $data)
    {
        return $user->update(array_merge($data, ['max_bid_left' =>$data['max_bid_amount']]));
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
}