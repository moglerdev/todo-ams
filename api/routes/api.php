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

Route::get('todos', 'TodoController@getAllMainTodos');
Route::get('todos/{main_todo_id}', 'TodoController@getAllTodosFromMain');
Route::get('todos/single/{id}', 'TodoController@getTodo');
Route::post('todos', 'TodoController@createTodo');
Route::put('todos/{id}', 'TodoController@updateTodo');
Route::delete('todos/{id}', 'TodoController@deleteTodo');
