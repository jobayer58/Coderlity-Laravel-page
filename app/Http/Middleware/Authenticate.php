<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // return $request->expectsJson() ? null : route('admin.dashboard.login'); 
        // dd("sumon ssd");

        if ($request->expectsJson()) {
            return null;
        }

        // Check which guard is being used based on the route
        if ($request->is('auth/console*')) {
            return route('admin.dashboard.login');
        }

        // Default redirect for web guard
        return route('user.dashboard.login');
    }
}
