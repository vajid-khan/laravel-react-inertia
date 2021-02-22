<?php

namespace App\Providers;

use Inertia\Inertia;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrap();

        Inertia::share('appName', config('app.name'));

        Inertia::share('error', function(){
            return [
                'message' => session()->get('error'),
            ];
        });

        Inertia::share('success', function(){
            return [
                'message' => session()->get('success'),
            ];
        });

        Inertia::share('user', function(){
            return auth()->check() ? request()->user() : null;
        });

    }
}
