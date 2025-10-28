<?php

use App\Http\Controllers\Frontend\UserController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Frontend\UserSocialiteController;
use Illuminate\Support\Facades\Route;

 
Route::group(["prefix" => "user", "as" => "user.",  "middleware" => ["auth:web", "verified", "userStatusCheck"]], function () {

    Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');

    // Profile
    Route::prefix('dashboard/profile')->as('dashboard.')->group(function () {
        Route::get('/', [UserController::class, 'profile'])->name('profile');
        Route::post('/', [UserController::class, 'profileUpdate'])->name('profileUpdate');
        Route::post('change-background', [UserController::class, 'changeBackground'])->name('profile.changeBg');
        Route::put('change-password', [UserController::class, 'changePassword'])->name('profile.changePassword');
    });
});
 
Route::group(["prefix" => "user", "middleware" => "guest:web"], function () {

    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('user.dashboard.login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('user.dashboard.login.store');

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('user.dashboard.register');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('user.dashboard.register.store');
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)->middleware('throttle:6,1')->name('verification.verify');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('password.store');

    Route::get('/auth/{provider}/redirect', [UserSocialiteController::class, 'create'])->name('user.auth.redirect');
    Route::get('/auth/{provider}/callback', [UserSocialiteController::class, 'store'])->name('user.auth.callback');
});

 
Route::group(["prefix" => "user", "middleware" => "auth:web"], function () {
    Route::get('/verify-email', [UserController::class, 'verifyEmail'])->name('verification.notice');
    Route::post('/verify-email', [UserController::class, 'emailUpdate'])->name('verification.confirm');
    Route::post('/resend-otp', [UserController::class, 'resendOtp'])->name('user.resend.otp');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
