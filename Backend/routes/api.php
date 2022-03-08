<?php

use App\Http\Controllers\Authcontroller;
use App\Http\Controllers\ProductallController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/products',[ProductController::class, 'index']);
// Route::post('/products',[ProductController::class, 'store']);
// Route::post('/products',[ProductController::class, 'show']);


Route::get('all',[ProductallController::class, 'index']);
Route::resource('products', ProductController::class);
// Route::post('reg', [Authcontroller::class, 'get']);
Route::post('log', [Authcontroller::class, 'login']);