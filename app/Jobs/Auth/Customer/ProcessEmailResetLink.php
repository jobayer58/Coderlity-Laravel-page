<?php

namespace App\Jobs\Auth\Customer;

use App\Mail\UserPasswordResetLink;
use App\Models\User;
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
    public function __construct(public User $user)
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
            'verification.verify',
            $expires,
            [
                'id' => $this->user->id,
                'hash' => $hash,
            ]
        );

        // Send the mail
        Mail::to($this->user->email)->send(new UserPasswordResetLink($signedUrl));
    }
}
