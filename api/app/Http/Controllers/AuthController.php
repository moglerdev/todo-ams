<?php
// php artisan passport:client --personal    
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Laravel\Passport\Http\Controllers\AccessTokenController;


class AuthController extends Controller
{
    /*+
    login api *
    @return \Illuminate\Http\Response */
    public function login(Request $request){ 
        if(Auth::attempt(["email" => request("email"), "password" => request("password")]))
        { 
            $user = Auth::user(); 
            $success["token"] = $user->createToken("todo-ams")-> accessToken;
            return response()->json($success, 200);
        } 
        else{ 
            return response()->json(["error"=>"Unauthorised"], 401);
        } 
    } 
    /*+
    Register api *
    @return \Illuminate\Http\Response */ 
    public function register(Request $request) { 
        $validator = Validator::make($request->all(), 
            [ "name" => "required", "email" => "required|email", "password" => "required", "confirm_password" => "required|same:password", ]); 
        if ($validator->fails()) { 
            return response()->json(["error"=>$validator->errors()], 401);
        } 
        $input = $request->all(); 
        $input["password"] = bcrypt($input["password"]); 
        $user = User::create($input); 
        $success["token"] = $user->createToken("todo-ams")-> accessToken; 
        $success["name"] = $user->name; 
        return response()->json($success, 200);
    }
    
    /*+
    Register api *
    @return \Illuminate\Http\Response */ 
    public function logOut() { 
        if (Auth::check()) {
           Auth::user()->AauthAcessToken()->delete();
        }
        return response()->json(["message"=>"logout was successfuly"], 200);
    }

    /*+
     *
    @return \Illuminate\Http\Response */ 
    public function getUsers() { 
        return response()->json(User::all(), 200);
    }
}
