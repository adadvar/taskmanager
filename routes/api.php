<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\tagController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UpdateTodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
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

Route::get('auth/google', [
    AuthController::class, 'loginWithGoogle',
])->name('auth.login.with.google ');

Route::get('auth/google/callback', [
    AuthController::class, 'googleCallback',
])->name('auth.google.callback ');

Route::group([], function ($router) {
    // Route::group(['namespace' => '\Laravel\Passport\Http\Controllers'], function ($router) {
    // $router->post('login', [
    //     'middleware' => ['throttle'],
    //     AccessTokenController::class, 'issueToken',
    // ])->name('auth.login ');
    // });


    $router->post('login', [
        AuthController::class, 'login',
    ])->name('auth.login ');

    $router->post('register', [
        AuthController::class, 'register'
    ])->name('auth.register');

    $router->post('register-verify', [
        AuthController::class, 'registerVerify'
    ])->name('auth.register.verify');

    $router->post('resend-verification-code', [
        AuthController::class, 'resendVerificationCode'
    ])->name('auth.register.resend.verification.code');
});

Route::group(['middleware' => ['auth:api']], function ($router) {

    // $router->post('login', [
    //     'middleware' => ['throttle'],
    //     AccessTokenController::class, 'issueToken',
    // ])->name('auth.login ');

    $router->post('change-email', [
        UserController::class, 'changeEmail'
    ])->name('change.email');

    $router->post('change-email-submit', [
        UserController::class, 'changeEmailSubmit'
    ])->name('change.email.submit');

    $router->match(['post', 'put'], 'change-password', [
        UserController::class, 'changePassword'
    ])->name('change.password');

    $router->post('logout', [
        UserController::class, 'logout'
    ])->name('auth.logout ');

    Route::group(['prefix' => 'user'], function ($router) {

        // $router->match(['post', 'get'],'/{channel}/follow' ,[
        //     UserController::class, 'follow'
        // ])->name('user.follow');

        // $router->match(['post', 'get'],'/{channel}/unfollow' ,[
        //     UserController::class, 'unfollow'
        // ])->name('user.unfollow');

        // $router->get('/followings' ,[
        //     UserController::class, 'followings'
        // ])->name('user.followings');

        // $router->get('/followers' ,[
        //     UserController::class, 'followers'
        // ])->name('user.followers');

        $router->delete('/me', [
            UserController::class, 'unregister'
        ])->name('user.unregister');

        $router->delete('/{user}', [
            UserController::class, 'delete'
        ])->name('user.delete');

        $router->get('/me', [
            UserController::class, 'me'
        ])->name('user.me');

        $router->get('/list', [
            UserController::class, 'list'
        ])->name('user.list');

        $router->put('/{user}', [
            UserController::class, 'update'
        ])->name('user.update');

        $router->put('/{user}/reset-password', [
            UserController::class, 'resetPassword'
        ])->name('user.reset-password');
    });
});

Route::group(['middleware' => ['auth:api'], 'prefix' => '/dashboard'], function ($router) {
    $router->get('/', [
        DashboardController::class, 'index'
    ])->name('dashboard.index');
});

Route::get('/update-todo/{todo}', [UpdateTodoController::class, 'index'])->middleware(['auth:api'])->name('update-todo.index');

Route::group(['middleware' => ['auth:api'], 'prefix' => '/todo'], function ($router) {
    // $router->get('/', [
    //     TodoController::class, 'list'
    // ])->name('todo.list');

    $router->get('/{todo}', [
        TodoController::class, 'show'
    ])->name('todo.show');

    $router->post('/', [
        TodoController::class, 'add'
    ])->name('todo.add');

    $router->put('/{todo}', [
        TodoController::class, 'update'
    ])->name('todo.update');

    $router->delete('/{todo}', [
        TodoController::class, 'delete'
    ])->name('todo.delete');
});

Route::group(['middleware' => ['auth:api'], 'prefix' => '/category'], function ($router) {
    // $router->get('/', [
    //     CategoryController::class, 'list'
    // ])->name('category.list');

    $router->post('/', [
        CategoryController::class, 'add'
    ])->name('category.add');

    $router->put('/{category}', [
        CategoryController::class, 'update'
    ])->name('category.update');

    $router->delete('/{category}', [
        CategoryController::class, 'delete'
    ])->name('category.delete');
});



Route::group(['middleware' => ['auth:api'], 'prefix' => '/tag'], function ($router) {
    $router->get('/', [
        tagController::class, 'list'
    ])->name('tag.list');

    $router->post('/', [
        tagController::class, 'add'
    ])->name('tag.add');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
