<?php

namespace App\Http\Controllers;

use App\Exceptions\InternalErrorException;
use App\Interfaces\IUsersService;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Log;

class UsersController extends Controller
{
    private $users_service;

    public function __construct(IUsersService $users_service)
    {
        $this->users_service = $users_service;
    }

    /**
     * Get all users.
     *
     * @param Illuminate\Http\Request
     * 
     * @throws InternalErrorException
     * @return Collection $users
     */
    public function index(Request $request)
    {
        try {
            return $this->users_service->getAllUsers($request->user());
        } catch (Exception $e) {
            Log::error('Get users, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    /**
     * Get user by the id.
     *
     * @param int $id
     * @param Illuminate\Http\Request
     * 
     * @throws InternalErrorException
     * @return App\Models\User $user
     */
    public function show(Request $request, $id)
    {
        try {
            return $this->users_service->getUser($request->user(), $id);
        } catch (Exception $e) {
            Log::error('Get user by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    /**
     * Update the current user
     * 
     * @param Illuminate\Http\Request
     * 
     * @throws InternalErrorException 
     * @return App\Models\User $user
     */
    public function updateCurrentUser(Request $request)
    {
        try {
            $payload = $request->only([
                'max_bid_amount',
                'autobid_notify_percent',
                'email'
            ]);

            $this->users_service->update($request->user(), $payload);

            return $request->user();
        } catch (Exception $e) {
            Log::error('Update current user, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    /**
     * Get the current user.
     *
     * @param Illuminate\Http\Request
     * 
     * @throws InternalErrorException
     * @return App\Models\User $user
     */
    public function getCurrentUser(Request $request)
    {
        try {
            return $this->users_service->getUser($request->user()->id);

        } catch (Exception $e) {
            Log::error('Get current user, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    /**
     * Mark notifications as seen.
     *
     * @param Illuminate\Http\Request
     * 
     * @throws InternalErrorException 
     * @return true
     */
    public function markNotificationsSeen(Request $request)
    {
        try {
            $this->users_service->markNotificationsSeen($request->user());
            return true;

        } catch (Exception $e) {
            Log::error('Mark notifications seen, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

}
