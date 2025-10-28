<?php

namespace App\Jobs\Chat;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ReadAllMessage implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public $customer_id, public $user_id) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        DB::statement("
            UPDATE conversations
            SET message_seen = 1, user_id = ?
            WHERE customer_id = ? AND message_seen = 0
        ", [$this->user_id, $this->customer_id]);
    }
}
