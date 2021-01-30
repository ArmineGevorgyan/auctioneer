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
        return User::all()->find($id);
    }
}