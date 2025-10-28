<?php

namespace App\Jobs\Auth\Admin;

use App\Mail\AdminPasswordResetLink;
use App\Models\Admin;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessEmailResetLink implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Admin $user)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $expires = now()->addMinutes(60);
        $hash = sha1($this->user->getEmailForVerification());

        $signedUrl = URL::temporarySignedRoute(
            'admin.dashboard.verification',
            $expires,
            [
                'id' => $this->user->id,
                'hash' => $hash,
            ]
        );

        Mail::to($this->user->email)->send(new AdminPasswordResetLink($signedUrl));
    }
}
