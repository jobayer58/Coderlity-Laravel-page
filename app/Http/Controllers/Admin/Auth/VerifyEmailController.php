<?php

namespace App\Http\Controllers\Admin\Auth;


use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request, $id, $hash)
    {
        $userId = Auth::guard('admin')->id();

        if (is_null($userId)) {
            $user = Admin::findOrFail($id);

            // Verify the signed URL
            if (! $request->hasValidSignature()) {
                return Inertia::render('Admin/Auth/PasswordReset', [
                    'status' => 'failed',
                    'message' => 'Expired verification link.',
                ]);
            }

            // Verify the hash
            if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
                return Inertia::render('Admin/Auth/PasswordReset', [
                    'status' => 'failed',
                    'message' => 'Invalid verification link.',
                ]);
            }

            return Inertia::render('Admin/Auth/PasswordReset', [
                'status' => 'verified',
                'message' => 'done',
                'id' => $user->id
            ]);
        } else {
            return redirect()->route('dashboard.home');
        }
    }
}
