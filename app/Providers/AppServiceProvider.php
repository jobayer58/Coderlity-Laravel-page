<?php

namespace App\Providers;

use App\Services\Backend\ImageService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Singleton - Same instance throughout request
        $this->app->singleton(ImageService::class, function ($app) {
            return new ImageService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
