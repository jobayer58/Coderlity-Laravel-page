<?php

use App\Http\Controllers\Backend\Admin\ChatController;
use App\Http\Controllers\Backend\Admin\DashboardController;
use App\Http\Controllers\Backend\CustomerManageController;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\NewPasswordController;
use App\Http\Controllers\Admin\Auth\VerifyEmailController;
use App\Http\Controllers\Backend\Admin\ContactController;
use App\Http\Controllers\Backend\UserManageController;
use Illuminate\Support\Facades\Route;


Route::group(["prefix" => "auth/console/access", "middleware" => "guest:admin"], function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('admin.dashboard.login');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('admin.dashboard.login.store');

    Route::get('/forgot-password/{id}/{hash}', VerifyEmailController::class)->name('admin.dashboard.verification');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('admin.dashboard.password.store');
});


Route::group(["prefix" => "auth/console",  "middleware" => ["auth:admin", "adminStatusCheck"]], function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.home');

    Route::group(["as" => "admin."], function () {
        // customers
        Route::group(["prefix" => "customer"], function () {
            Route::get('/', [CustomerManageController::class, 'index'])->name('customer.index');
            Route::put('/{id}/update', [CustomerManageController::class, 'statusUpdate'])->name('customer.statusUpdate');
            Route::delete('/{id}/{pageNumber}/{search}/delete', [CustomerManageController::class, 'destroy'])->name('customer.destroy');
            Route::get('/error', [CustomerManageController::class, 'serverError'])->name('customer.error');
        });

        // users
        Route::group(["prefix" => "user"], function () {
            // Admin only
            Route::middleware('role:Admin')->group(function () {
                Route::get('/create', [UserManageController::class, 'create'])->name('user.create');
                Route::post('/create', [UserManageController::class, 'store'])->name('user.store');
                Route::post('/forgot-password', [UserManageController::class, 'forgotPassword'])->name('user.forgotPassword');
                Route::delete('/{id}/{pageNumber}/{search}/delete', [UserManageController::class, 'destroy'])->name('user.destroy');
            });

            // Admin, Moderator
            Route::middleware('role:Admin,Moderator')->group(function () {
                Route::get('/edit/{id}', [UserManageController::class, 'edit'])->name('user.edit');
                Route::post('/update', [UserManageController::class, 'update'])->name('user.update');
                Route::put('/{id}/update', [UserManageController::class, 'statusUpdate'])->name('user.statusUpdate');
            });

            // Admin, Moderator, Editor, User
            Route::middleware('role:Admin,Moderator,Editor,User')->group(function () {
                Route::get('/', [UserManageController::class, 'index'])->name('user.index');
                Route::get('/view/{id}', [UserManageController::class, 'show'])->name('user.show');
                Route::get('/profile', [UserManageController::class, 'profile'])->name('user.profile');
                Route::post('/profile', [UserManageController::class, 'profileUpdate'])->name('user.profileUpdate');
                Route::put('/change-password', [UserManageController::class, 'changePassword'])->name('user.changePassword');
                Route::post('/change-background', [UserManageController::class, 'changeBackground'])->name('user.changeBackground');
                Route::get('/error', [UserManageController::class, 'serverError'])->name('user.error');
            });
        });


        // contact
        Route::group(["prefix" => "contact"], function () {
            // Admin only
            Route::middleware('role:Admin')->group(function () {
                Route::get('/', [ContactController::class, 'index'])->name('contact.index');
                Route::get('/create', [ContactController::class, 'create'])->name('contact.create'); // delete this
                Route::post('/create', [ContactController::class, 'store'])->name('contact.store'); // delete this
                Route::get('/view/{id}', [ContactController::class, 'show'])->name('contact.view');
                Route::delete('/{id}/{pageNumber}/{search}/delete', [ContactController::class, 'destroy'])->name('contact.destroy');
            });
        });

  
        // chat
        Route::group(["prefix" => "chat"], function () {
            // Admin only
            Route::middleware('role:Admin')->group(function () {
                Route::get('/', [ChatController::class, 'index'])->name('chat.index');
                Route::post('/chat-message', [ChatController::class, 'messages'])->name('chat.message');
                Route::post('/chat-message-store', [ChatController::class, 'messageStore'])->name('chat.message.store');
                Route::post('/send-message', [ChatController::class, 'sendMessage'])->name('chat.send.message');
            });
        });
    });

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('admin.logout');
});
