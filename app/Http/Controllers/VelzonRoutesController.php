<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class VelzonRoutesController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/index');
    }
 
    public function dashboard()
    {
        return Inertia::render('Dashboard/index');
    }


    public function pages_profile()
    {
        return Inertia::render('Pages/Profile/SimplePage/SimplePage');
    }

    public function pages_profile_settings()
    {
        return Inertia::render('Pages/Profile/Settings/Settings');
    }

    public function profile()
    {
        return Inertia::render('Auth/user-profile');
    }
}
