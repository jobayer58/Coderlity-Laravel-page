<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Carbon\Carbon;

class UserSocialiteController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(string $provider)
    {
        $userId = Auth::guard('web')->id();

        if (is_null($userId)) {
            $validURL = ['google', 'github', 'facebook'];

            if (in_array($provider, $validURL)) {
                return Socialite::driver($provider)->redirect();
            } else {
                return redirect()->route('user.dashboard.register');
            }
        } else {
            return redirect()->route('user.dashboard');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $provider)
    {
        if (Auth::guard('web')->check()) {
            return redirect()->route('user.dashboard');
        }

        $validProviders = ['google', 'github', 'facebook'];

        if (!in_array($provider, $validProviders)) {
            return redirect()->route('user.dashboard.register');
        }


        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {

            return redirect()->route('user.dashboard.login')->with([
                'success' => true,
                'message' => 'Authorization failed. Please try again.'
            ]);
        }

        if ($provider === 'facebook' && is_null($socialUser->getEmail())) {
            return redirect()->route('user.dashboard.login')->with([
                'success' => true,
                'message' => "Your account isn’t linked with Gmail. Add one and retry."
            ]);
        }

        $user = User::updateOrCreate(
            ['provider_id' => $socialUser->getId()],
            [
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
                'email_verified_at' => Carbon::now(),
                'provider_token' => $socialUser->token ?? null,
                'provider_refresh_token' => $socialUser->refreshToken ?? null,
            ]
        );

        Auth::guard('web')->login($user);

        return redirect()->route('user.dashboard')->with([
            'success' => true,
            'message' => 'Login successful. Welcome back!'
        ]);
    }
}
