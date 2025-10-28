<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserStatusMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Auth::guard('admin')->logout();
        // 
        // $userId = Auth::guard('web')->id();
        $userStatus = Auth::guard('web')->user()->status;
        // $adminStatus = Auth::guard('admin')->user()->status;

        if ($userStatus === "Active") {
            return $next($request);
        } else {
            Auth::guard('web')->logout();

            return redirect()->route('user.dashboard.login');
        }
    }
}
