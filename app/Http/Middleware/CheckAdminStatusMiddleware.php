<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminStatusMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
       
        $adminStatus = Auth::guard('admin')->user()->status;
   
        if ($adminStatus === "Active") {
            return $next($request);
        } else {
            Auth::guard('admin')->logout();

            return redirect()->route('admin.dashboard.login');
        }
    }
}
