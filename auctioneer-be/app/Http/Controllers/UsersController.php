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

    public function index(Request $request)
    {
        try {
            return $this->users_service->getAllUsers();
        } catch (Exception $e) {
            Log::error('Get users, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

    public function show(Request $request, $id)
    {
        try {
            return $this->users_service->getUser($id);
        } catch (Exception $e) {
            Log::error('Get user by id, Exception', ['error' => $e->getMessage()]);

            throw new InternalErrorException();
        }
    }

}