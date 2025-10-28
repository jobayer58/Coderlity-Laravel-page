<?php

use App\Http\Controllers\HomeChatController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VelzonRoutesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// public function destroy(Request $request): RedirectResponse
// {
//     $request->validate([
//         'password' => ['required', 'current_password'],
//     ]);
//     $user = $request->user();
//     Auth::logout();
//     $user->delete();
//     $request->session()->invalidate();
//     $request->session()->regenerateToken();
// }

// Route::get("/apps-ecommerce-orders", [ProfileController::class, 'index'])->name('order-list');
// Route::redirect('/', '/user/login');

// realtime message
Route::get('/home/chat', [HomeChatController::class, 'index'])->name('home.chat');
Route::post('/home/chat', [HomeChatController::class, 'store'])->name('home.store');
Route::post('/home/chat-send', [HomeChatController::class, 'chatSend'])->name('home.chat.send');
Route::post('/home/chat-close', [HomeChatController::class, 'browserClose'])->name('home.chat.close');

Route::get('/', [HomeChatController::class, 'homePage']);


// Live Project by GitHub
Route::post('/deploy-webhook', function () {
    $secret = env('GITHUB_WEBHOOK_SECRET');
    
    // Verify GitHub signature
    $signature = 'sha256=' . hash_hmac('sha256', request()->getContent(), $secret);
    
    if (!hash_equals($signature, request()->header('X-Hub-Signature-256'))) {
        abort(403, 'Invalid signature');
    }
    
    // Execute deployment script
    $output = shell_exec('cd ' . base_path() . ' && ./deploy.sh 2>&1');
    
    return response()->json(['status' => 'success', 'output' => $output]);
});


Route::middleware('auth')->group(function () {

    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile-update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile-destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // orders crud
    Route::get("/apps-ecommerce-orders", [OrderController::class, 'index'])->name('order-list');
    Route::post("order-create", [OrderController::class, 'store'])->name('order-create');
    Route::post("order-update", [OrderController::class, 'update'])->name('order-update');
    Route::post("order-delete", [OrderController::class, 'destroy'])->name('order-delete');

    Route::controller(VelzonRoutesController::class)->group(function () {

        // dashboard routes
        // Route::inertia('/', 'Dashboard')->name('index');
        Route::get("/dashboard", "index");
    });
});


require __DIR__ . '/userRoute.php';
require __DIR__ . '/adminRoute.php';
