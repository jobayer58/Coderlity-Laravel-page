<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\CustomerVerifyEmailOtp;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
 
class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create()
    {
        $userInfo = Auth::guard('web')->user();

        if (is_null($userInfo)) {
            return Inertia::render('User/Auth/Register');
        } else {
            return redirect()->route('verification.notice');
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email:rfc,dns',
                'min:13',
                'max:50',
                'unique:' . User::class,
            ],
            'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Mail::to($user)
            ->queue(new CustomerVerifyEmailOtp($user));

        // Auth::login($user); 
        Auth::guard('web')->login($user); 

        return redirect()->route('verification.notice')->with([
            'success' => true,
            'message' => 'Registration doen. Check your mail'
        ]);
    }
}
