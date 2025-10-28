<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\Auth\Customer\ProcessEmailResetLink;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create()
    {
        $userId = Auth::guard('web')->id();

        if (is_null($userId)) {
            return Inertia::render('User/Auth/ForgotPassword');
        } else {
            return redirect()->route('user.dashboard');
        }
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email:rfc,dns', 'min:15', 'max:50'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (is_null($user)) {
            throw ValidationException::withMessages([
                'email' => "We can't find a user with that email address.",
            ]);
        } elseif (is_null($user->email_verified_at)) {
            throw ValidationException::withMessages([
                'email' => "Email not verified. Verify to continue.",
            ]);
        } elseif (!is_null($user->provider_id)) {
            throw ValidationException::withMessages([
                'email' => "Password reset not available. Sign in with Google.",
            ]);
        } else {
            ProcessEmailResetLink::dispatch($user);
            return back()->with([
                'success' => true,
                'message' => 'We have emailed your password reset link.'
            ]);
        }
    }
}
