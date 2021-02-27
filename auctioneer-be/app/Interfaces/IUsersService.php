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
     * Get user by the username.
     *
     * @param int $username
     *
     * @return App\Models\User $user
     */
    public function getUser($username);

    /**
     * Get user by .
     *
     * @param int $id
     *
     * @return App\Models\User $user
     */
    public function getUserByUsername($id);

    /**
     * Update a given user
     * 
     * @param App\Models\User $user
     * @param array $data
     * 
     * @return App\Models\User $user
     */
    public function update(User $user, $data);

    /**
     * Create a new user
     * 
     * @param array $data
     * 
     * @return App\Models\User $user
     */
    public function create($data);

    /**
     * Create a new admin user
     * 
     * @param App\Models\User $user
     * @param array $data
     * 
     * @return App\Models\User $user
     */
    public function createAdmin($user, $data);

    /**
     * Update a given user
     * 
     * @param App\Models\User $user
     * 
     * @return void
     */
    public function markNotificationsSeen($user);
}
