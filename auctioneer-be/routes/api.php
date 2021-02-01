<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/products', [ProductsController::class, 'getAvailableProducts']);
    Route::get('/products/{id}', [ProductsController::class, 'show']);
    Route::get('/products/sort/{col}/{direction}', [ProductsController::class, 'getSortedAvailableProducts']);
    Route::post('/products', [ProductsController::class, 'create']);
    Route::post('/products/{id}/bids', [ProductsController::class, 'createBid']);
    Route::put('/products/{id}', [ProductsController::class, 'update']);
    Route::delete('/products/{id}', [ProductsController::class, 'delete']);
    Route::post('/products/{id}/autobid/enable', [ProductsController::class, 'enableAutobidding']);
    Route::post('/products/{id}/autobid/disable', [ProductsController::class, 'disableAutobidding']);
    Route::get('/users', [UsersController::class, 'index']);
    Route::get('/users/current', [UsersController::class, 'getCurrentUser']);
    Route::put('/users/current', [UsersController::class, 'updateCurrentUser']);
    Route::get('/users/{id}', [UsersController::class, 'show']);
});