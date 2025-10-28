<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            "id" => 'required',
            "hashUrl" => 'required',
            "password" => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
                'same:cpassword',
            ],
            "cpassword" => 'required',
        ], [
            'password.same' => 'The password field must match confirm password.',
            'cpassword.required' => ' The confirm password field is required.',
        ]);

        $user = Admin::findOrFail($request->id);

        if (hash_equals($request->hashUrl, sha1($user->getEmailForVerification()))) {
            $user->password = Hash::make($request->password);
            $isUpdatePassword = $user->save();

            if ($isUpdatePassword) {
                return redirect()->back()->with([
                    'success' => true,
                    'message' => 'Password changed successfully!',
                ]);
            } else {
                throw ValidationException::withMessages([
                    'password' => "We can't find a user with this url",
                ]);
            }
        } else {
            return redirect()->route('admin.dashboard.login');
        }
    }
}
