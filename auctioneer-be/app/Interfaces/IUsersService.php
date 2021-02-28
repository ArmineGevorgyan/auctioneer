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

    /**
     * Get user by username.
     *
     * @param string $username
     *
     * @return App\Models\User $user
     */
    public function getUserByUsername($username);

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
