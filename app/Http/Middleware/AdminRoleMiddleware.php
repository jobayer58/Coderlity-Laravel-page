<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // public function handle(Request $request, Closure $next): Response
    // {
    //     return $next($request);
    // }


    public function handle(Request $request, Closure $next, ...$roles)
    {
        // return $next($request);

        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard.login');
        }

        $user = Auth::guard('admin')->user();

        // Check if user has any of the required roles
        if (!in_array($user->role, $roles)) {
            return redirect()->back();
        }

        return $next($request);
    }
}
