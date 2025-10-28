<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Services\Backend\ImageService;
use Carbon\Carbon;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Mail\UserDashboardLoginEmail;
use App\Jobs\Auth\Admin\ProcessEmailResetLink;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserManageController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $search = strip_tags($search);
        $customPage = intval($request->get('page'));

        $userId = auth()->guard('admin')->id();
        $query = DB::table('admins')->where('id', '!=', $userId)->orderBy('id', 'desc');

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('country', 'LIKE', "%{$search}%")
                    ->orWhere('role', 'LIKE', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();
        $pages = $users->onEachSide(2)->toArray()['links'];

        if ($customPage === 1 && !empty($search)) {
            return Inertia::render('Admin/User/Manage', [
                "users" => $users,
                "pages" => $pages,
                "filters" => [
                    'page' => 1,
                    'search' => $search,
                ],
            ]);
        } else if ($customPage >= 2 && !empty($search)) {
            return Inertia::render('Admin/User/Manage', [
                "users" => $users,
                "pages" => $pages,
                "filters" => [
                    'page' => $customPage,
                    'search' => $search,
                ],
            ]);
        } else {
            return Inertia::render('Admin/User/Manage', ["users" => $users, "pages" => $pages]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/User/UserCreate');
    }

    public function profile()
    {
        $userId = Auth::guard('admin')->id();
        $user = DB::table("admins")->where('id', $userId)->select('id', 'name', 'email', 'photo', 'bg_photo', 'status', 'country', 'phone', 'role', 'created_at')->first();

        if (!$user) {
            return redirect()->back();
        }

        return Inertia::render('Admin/User/UserProfile', ["user" => $user]);
    }

    public function profileUpdate(Request $request)
    {
        $request->validate([
            'uname' => 'required|string|max:255',
            "phone" =>  'required',
        ]);

        $userId = Auth::guard('admin')->id();
        $user = Admin::findOrFail($userId);

        $phones = explode(",", $user['phone']);
        $requestPhones = explode(" ", $request->phone);

        if (count($phones) !== 2 || count($requestPhones) !== 2) {
            throw ValidationException::withMessages([
                'phone' => "Invalid phone format.",
            ]);
        }

        $phoneNumber = $phones[0] . ',' . $requestPhones[1];
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
                ImageService::singleDelete('admin/user/', $user->photo);
            }

            $photoUrl =  ImageService::singleUpload($request->file('photo'), 'admin/user');
        }

        $user->update([
            "name" => strip_tags($request->uname),
            'phone' => $phoneNumber,
            'photo' => $photoUrl,
        ]);

        if ($user->id) {
            return redirect()->route('admin.user.profile')->with([
                'success' => true,
                'message' => 'Profile update successfully.'
            ]);
        } else {
            throw ValidationException::withMessages([
                'phone' => "There was an server-side Error.",
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
            return redirect()->route('admin.user.profile')->with([
                'error' => true,
                'message' => $errorMessage
            ]);
        }

        $userId = Auth::guard('admin')->id();
        $user = Admin::findOrFail($userId);

        // delete image
        if ($user->bg_photo !== "bg.png") {
            ImageService::singleDelete('admin/background/', $user->bg_photo);
        }

        $fileName = ImageService::singleUpload($request->file('bgPhoto'), 'admin/background');

        $user->update([
            'bg_photo' =>  $fileName,
        ]);

        if ($user->id) {
            return redirect()->route('admin.user.profile')->with([
                'success' => true,
                'message' => 'Background photo update successfully.'
            ]);
        } else {
            return redirect()->route('admin.user.profile')->with([
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

        return redirect()->route('admin.user.profile')->with([
            'success' => true,
            'message' => 'Password update successfully.'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'uname' => 'required|string|max:255',
            'email' => [
                'required',
                'email:rfc,dns',
                'min:13',
                'max:50',
                'unique:' . Admin::class,
            ],
            "phone" =>  ['required', 'regex:/^[0-9]+$/'],
            'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            "country" =>  'required',
            "status" =>  'required|in:Active,Disabled',
            "role" =>  'required|in:Admin,Moderator,Editor,User',
        ]);

        $phoneNumber = strip_tags($request->countryCode) . ',' . strip_tags($request->phone);

        $adminUser = Admin::create([
            'name' => strip_tags($request->uname),
            'email' => strip_tags($request->email),
            'status' => strip_tags($request->status),
            'country' => strip_tags($request->country),
            'phone' => strip_tags($phoneNumber),
            'role' => strip_tags($request->role),
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make(strip_tags($request->password)),
        ]);


        Mail::to($adminUser)
            ->queue(new UserDashboardLoginEmail([$request->email, $request->password]));

        return redirect()->back()->with([
            'success' => true,
            'message' => 'Registration completed successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = DB::table("admins")->where('id', $id)->select('id', 'name', 'email', 'photo', 'status', 'country', 'phone', 'role', 'created_at')->first();

        if (!$user) {
            return redirect()->route('admin.user.index');
        }

        return Inertia::render('Admin/User/UserView', ["user" => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = DB::table("admins")->where('id', $id)->first();

        if (!$user) {
            return redirect()->route('admin.user.index');
        }

        return Inertia::render('Admin/User/UserEdit', ["user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'uname' => 'required|string|max:255',
            "phone" =>  ['required', 'regex:/^[0-9]+$/'],
            "country" =>  'required',
            "status" =>  'required|in:Active,Disabled',
            "role" =>  'required|in:Admin,Moderator,Editor,User',
        ]);

        $phoneNumber = strip_tags($request->countryCode) . ',' . strip_tags($request->phone);
        $user = Admin::findOrFail($request->id);

        $user->update([
            "name" => strip_tags($request->uname),
            'status' =>  strip_tags($request->status),
            'country' => strip_tags($request->country),
            'phone' => $phoneNumber,
            'role' =>  strip_tags($request->role),
        ]);

        if ($user->id) {
            return redirect()->back()->with([
                'success' => true,
                'title' => 'Success',
                'message' => 'User info updated successfully!'
            ]);
        } else {
            return redirect()->route('admin.user.index');
        }
    }

    public function forgotPassword(Request $request)
    {
        $user = Admin::findOrFail($request->id);
        ProcessEmailResetLink::dispatch($user);

        return redirect()->back()->with([
            'success' => true,
            'title'   => 'Success',
            'message' => 'Reset email delivered successfully to the user.',
        ]);
    }

    public function serverError()
    {
        return Inertia::render('Errors/404');
    }

    public function statusUpdate(string $id)
    {
        $user = Admin::find($id);

        if (!$user) {
            return to_route('admin.user.error');
        }

        $user->update([
            "status" => $user->status === "Active" ? "Disabled" : "Active",
        ]);

        return redirect()->back()->with([
            'success' => true,
            'title'   => 'Success',
            'message' => 'User status changed successfully!',
        ]);
    }

    public function destroy(string $id, int $pageNumber, string $search)
    {
        $deleted = DB::table('admins')
            ->where('id', $id)
            ->delete();

        if ($deleted === 0) {
            return to_route('admin.user.error');
        } else {
            $baseQuery = DB::table('admins');

            $userId = auth()->guard('admin')->id();
            $baseQuery->where('id', '!=', $userId);

            if (!empty($search) && $search !== "__BLANK__") {
                $baseQuery->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%")
                        ->orWhere('country', 'LIKE', "%{$search}%")
                        ->orWhere('role', 'LIKE', "%{$search}%");
                });
            }

            $totalUsers = $baseQuery->count();
            $activeUsers = $totalUsers / 10;

            if (is_float($activeUsers)) {
                return redirect()->back()->with([
                    'success' => true,
                    'title' => 'Success',
                    'message' => 'User delete successfully!'
                ]);
            } else {
                $activePage = intval($activeUsers);
                $customPage = ($activePage >= $pageNumber) ? $pageNumber : $pageNumber - 1;

                if ($search === "__BLANK__") {
                    return redirect()->route('admin.user.index', ['page' => $customPage])->with([
                        'success' => true,
                        'title' => 'Success',
                        'message' => 'User delete successfully!'
                    ]);
                }

                return redirect()->route('admin.user.index', ['page' => $customPage, 'search' => $search])->with([
                    'success' => true,
                    'title' => 'Success',
                    'message' => 'User delete successfully!'
                ]);
            }
        }
    }
}
