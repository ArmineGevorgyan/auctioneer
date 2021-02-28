<?php

namespace App\Http\Controllers;

use Exception;
use App\Exceptions\InternalErrorException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Log;
use Auth;

class LoginController extends Controller
{
    /**
     * Log the user in.
     *
     * @param Request $request
     *
     * @throws InternalErrorException 
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        $credentials = $request->only(['username', 'password']);
        Log::info('User trying login.', ['username' => $credentials['username']]);

        try{
            if(Auth::guard()->attempt($credentials)) {
                $user = User::where('username', '=', $credentials['username'])->first();

                return response()
                    ->json([
                        'status' => 'ok',
                        'user' => $user,
                        'token' => $user->api_token,
                    ]);
            }

            return response()->json([ 'status' => 'invalid', 'error' => 'Invalid credentials']);         
        }
        catch (Exception $e) {
            Log::warning('User login failed. Cannot provide token.', ['username' => $credentials['username'], ' error' => $e->getMessage()]);
            throw new InternalErrorException($e);
        }

    }
}
