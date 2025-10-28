<?php

namespace App\Providers;


use App\Events\BrowserCloseEvent;
use App\Events\CheckMessageEvent;
use App\Events\CustomerSendMessageEvent;
use App\Events\MessageListEvent;
use App\Events\MessageSendEvent;
use App\Events\UserIdSetEvent;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        CheckMessageEvent::class => [],
        MessageListEvent::class => [],
        UserIdSetEvent::class => [],
        BrowserCloseEvent::class => [],
        MessageSendEvent::class => [],
        CustomerSendMessageEvent::class => [],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
