<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Exceptions\InternalErrorException;
use App\Interfaces\IUsersService;
use App\Models\User;
use Log;

class RegistrationController extends Controller
{
    private $users_service;

    public function __construct(IUsersService $users_service)
    {
        $this->users_service = $users_service;
    }

    /**
     * Register a new user.
     *
     * @param RegistrationRequest $request
     *
     * @throws InternalErrorException
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegistrationRequest $request){
        $payload = $request->only(['username', 'password', 'email']);
        Log::info('User trying to register.');
        
        try{
            if(!$this->validUsername($payload['username'])) {
                return response()->json(['status' => 'invalid', 'error' => 'Username already taken']);
            }

            $user = $this->users_service->create($payload);
            return response()->json(['status' => 'ok','user' => $user,'token' => $user->api_token]);
        }
        catch (Exception $e) {
            Log::warning('User registration failed.', [' error' => $e->getMessage()]);
            throw new InternalErrorException($e);
        }
    }

    /**
     * Register a new user.
     *
     * @param RegistrationRequest $request
     *
     * @throws InternalErrorException
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerAdmin(RegistrationRequest $request){
        $payload = $request->only(['username', 'password', 'email']);
        Log::info('Registering an admin user');

        try{
            if(!$this->validUsername($payload['username'])) {
                return response()->json(['status' => 'invalid', 'error' => 'Username already taken']);
            }

            $user = $this->users_service->createAdmin($request->user(), $payload);
            return $user;
        }
        catch (Exception $e) {
            Log::warning('User registration failed.', [' error' => $e->getMessage()]);
            throw new InternalErrorException($e);
        }
    }

    private function validUsername($username)
    {
        $user = $this->users_service->getUserByUsername($username);
        
        if($user) {
            Log::warning('Username already taken');
            return false;
        }

        return true;
    }
}
