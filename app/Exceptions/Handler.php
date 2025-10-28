<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    
    public function render($request, Throwable $exception)
    {
        // Handle Throttle (429) errors
        if ($exception instanceof ThrottleRequestsException) {
            if ($request->inertia()) {
                return Inertia::render('Errors/TooManyRequests', [
                    'message' => 'Too many attempts. Please wait before trying again.',
                ])->toResponse($request)->setStatusCode(429);
            }

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Too many requests. Please slow down.',
                ], 429);
            }
        }

        return parent::render($request, $exception);
    }
}
