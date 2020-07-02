<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group([
    'prefix' => 'todos',
    'middleware' => 'auth:api'
], function () {
    Route::get('', 'TodoController@getAllMainTodos');
    Route::get('{id}', 'TodoController@getAllTodosFromMain');
    Route::get('single/{id}', 'TodoController@getTodo');
    Route::post('','TodoController@createTodo');
    Route::put('{id}', 'TodoController@updateTodo');
    Route::delete('{id}', 'TodoController@deleteTodo');  
});

Route::group([
    'prefix' => 'oauth'
], function () {
    Route::post("login", "AuthController@login");
    Route::post("register", "AuthController@register");
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get("user", function (Request $request) {
            return $request->user();
            });
    });
});