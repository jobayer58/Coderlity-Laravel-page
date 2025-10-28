<?php

namespace App\Http\Controllers\Frontend;

use App\Events\CheckMessageEvent;
use App\Http\Controllers\Controller;
use App\Mail\CustomerVerifyEmailOtp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Services\Backend\ImageService;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('UserDashboard/Dashboard');
    }

    public function emailUpdate(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric|digits:6',
        ]);

        $userId = Auth::guard('web')->id();
        $user = User::findOrFail($userId);

        if ($request->otp == $user->otp_code) {
            $user->otp_code = null;
            $user->email_verified_at = Carbon::now();
            $user->save();

            return redirect()->route('user.dashboard')->with([
                'success' => true,
                'message' => 'Login successful. Welcome back!'
            ]);
        } else {
            throw ValidationException::withMessages([
                'otp' => 'OTP not match',
            ]);
        }
    }

    public function register()
    {
        return Inertia::render('User/Auth/Register');
    }

    public function resendOtp()
    {
        $user = Auth::guard('web')->user();
        Mail::to($user)
            ->queue(new CustomerVerifyEmailOtp($user));

        return redirect()->route('verification.notice')->with([
            'success' => true,
            'message' => 'A new OTP code has been sent to the email address'
        ]);
    }

    public function verifyEmail(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->route('user.dashboard');
        } else {
            return Inertia::render('User/Auth/Authorization');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function profile()
    {
        $userId = Auth::guard('web')->id();
        $user = DB::table("users")->where('id', $userId)->select('id', 'name', "provider_token", 'email', 'photo', 'bg_photo', 'status', 'country', 'address', 'phone', 'created_at')->first();

        if (!$user) {
            return redirect()->back();
        }

        return Inertia::render('User/Auth/UserProfile', ["user" => $user]);
    }

    public function profileUpdate(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => [
                'nullable',
                'string',
                'min:5',
                'max:255',
                'regex:/^(?=.*[a-zA-Z])[a-zA-Z0-9\s,\.\-\/#]+$/',
            ],
            'phone' => [
                'nullable',
                'regex:/^[0-9]+$/',
                function ($attribute, $value, $fail) use ($request) {
                    if (!empty($value) && $request->country !== $request->phoneCountry) {
                        $fail('Invalid phone format.');
                    }
                }
            ],
        ]);

        $userId = Auth::guard('web')->id();
        $user = User::findOrFail($userId);

        event(new CheckMessageEvent("Where is my data have?_____iit__________"));
 

        $photoUrl = $user->photo;

        if ($request->hasFile('photo')) {

            $request->validate([
                'photo' => 'required|image|mimes:jpeg,jpg,png,webp,svg|max:4096'
            ], [
                'photo.mimes' => 'Your file must be png, jpg, webp, jpeg and svg.',
                'photo.max' => 'File too large. Max upload size: 4 MB.'
            ]);

            // delete image
            if ($user->photo !== "avatar.png") {
                ImageService::singleDelete('customer/user/', $user->photo);
            }

            $photoUrl =  ImageService::singleUpload($request->file('photo'), 'customer/user');
        }

        $user->update([
            "name" => strip_tags($request->name),
            'photo' =>  $photoUrl,
            'country' => strip_tags($request->country),
            'address' => strip_tags($request->address),
            'phone' => strip_tags($request->phone),
        ]);

        if ($user->id) {
            return redirect()->route('user.dashboard.profile')->with([
                'success' => true,
                'message' => 'Profile update successfully.'
            ]);
        } else {
            return redirect()->route('user.dashboard.profile')->with([
                'error' => true,
                'message' => 'There was an server-side Error.'
            ]);
        }
    }


    public function changeBackground(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bgPhoto' => 'required|image|mimes:jpeg,jpg,png,webp,svg|max:4096'
        ], [
            'bgPhoto.image' => 'The Background photo field must be an image.',
            'bgPhoto.mimes' => 'Your file must be png, jpg, webp, jpeg and svg.',
            'bgPhoto.max' => 'File too large. Max upload size: 4 MB.'
        ]);


        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first('bgPhoto');
            return redirect()->route('user.dashboard.profile')->with([
                'error' => true,
                'message' => $errorMessage
            ]);
        }

        $userId = Auth::guard('web')->id();
        $user = User::findOrFail($userId);

        // delete image
        if ($user->bg_photo !== "bg.png") {
            ImageService::singleDelete('customer/background/', $user->bg_photo);
        }

        $fileName = ImageService::singleUpload($request->file('bgPhoto'), 'customer/background');

        $user->update([
            'bg_photo' =>  $fileName,
        ]);

        if ($user->id) {
            return redirect()->route('user.dashboard.profile')->with([
                'success' => true,
                'message' => 'Background photo update successfully.'
            ]);
        } else {
            return redirect()->route('user.dashboard.profile')->with([
                'error' => true,
                'message' => 'There was an server-side Error.'
            ]);
        }
    }

    public function changePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
                'confirmed'
            ],
        ]);

        $request->user()->update([
            'password' => Hash::make(strip_tags($validated['password'])),
        ]);

        return redirect()->route('user.dashboard.profile')->with([
            'success' => true,
            'message' => 'Password update successfully.'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
