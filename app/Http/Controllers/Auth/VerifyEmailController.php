<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerifyEmailController extends Controller
{
    public function __invoke(Request $request, $id, $hash)
    {
        $userId = Auth::guard('web')->id();

        if (is_null($userId)) {
            $user = User::findOrFail($id);

            // Verify the signed URL
            if (! $request->hasValidSignature()) {
                return Inertia::render('User/Auth/PasswordReset', [
                    'status' => 'failed',
                    'message' => 'Expired verification link.',
                ]);
            }

            // Verify the hash
            if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
                return Inertia::render('User/Auth/PasswordReset', [
                    'status' => 'failed',
                    'message' => 'Invalid verification link.',
                ]);
            }

            return Inertia::render('User/Auth/PasswordReset', [
                'status' => 'verified',
                'message' => 'done',
                'id' => $user->id
            ]);
        } else {
            return redirect()->route('user.dashboard');
        }
    }
}
