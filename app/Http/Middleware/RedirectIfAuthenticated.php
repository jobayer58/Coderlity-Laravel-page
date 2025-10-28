<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{

    protected static $redirectToCallback;

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        // $guards = empty($guards) ? [null] : $guards;
        // foreach ($guards as $guard) {
        //     if (Auth::guard($guard)->check()) {
        //         return redirect(RouteServiceProvider::HOME);
        //     }
        // }
        // return $next($request);

        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // If admin guard and trying to access admin login
                if ($guard === 'admin' && $request->is('auth/console/access*')) {
                    return redirect()->route('dashboard.home');
                }

                // If web guard and trying to access user login
                if ($guard === 'web' && $request->is('user/login*')) {
                    return redirect()->route('user.dashboard');
                }

                // // Default redirects
                // switch ($guard) {
                //     case 'admin':
                //         return redirect()->route('dashboard.home');
                //     case 'web':
                //         return redirect()->route('user.dashboard');
                //     default:
                //         return redirect('/'); // fallback
                // }
            }
        }

        return $next($request);
    }
}
