<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\RegisterNewUserRequest;
use App\Http\Requests\Auth\RegisterVerifyUserRequest;
use App\Http\Requests\Auth\ResendVerificationCodeRequest;
use App\Http\Requests\User\LoginRequest;
use App\Services\UserService;
use Illuminate\Support\Facades\Request;

class AuthController extends Controller
{
    public function loginWithGoogle(){
        return UserService::loginWithGoogle();
    } 

    public function googleCallback(){
        return UserService::googleCallback();
    } 

    public function login(LoginRequest $request){
        extract($request->all("username", "password"));
        return UserService::login($username, $password);
    }

    public function register(RegisterNewUserRequest $request){
        return UserService::registerNewUser($request);
    } 

    public function registerVerify(RegisterVerifyUserRequest $request){
        
        return UserService::registerNewUserVerify($request);
    }

    public function resendVerificationCode(ResendVerificationCodeRequest $request){
        return UserService::resendVerificationCodeUser($request);
    }
}
 