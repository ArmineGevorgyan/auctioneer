<?php

namespace App\Interfaces;

interface IUsersService
{
    /**
     * Get all users.
     *
     * @return Collection $users
     */
    public function getAllUsers();

    /**
     * Get user by the id.
     *
     * @param int $id
     *
     * @return App\Models\User $user
     */
    public function getUser($id);
}
