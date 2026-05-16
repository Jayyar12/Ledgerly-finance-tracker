<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Custom Rate Limiter for Financial Operations
        \Illuminate\Support\Facades\RateLimiter::for('finance-ops', function (\Illuminate\Http\Request $request) {
            return \Illuminate\Cache\RateLimiting\Limit::perMinute(30)->by($request->user()?->id ?: $request->ip());
        });

        // Register Model Observers for Cache Invalidation
        \App\Models\Transaction::observe(\App\Observers\TransactionObserver::class);
        \App\Models\Budget::observe(\App\Observers\BudgetObserver::class);
        \App\Models\Category::observe(\App\Observers\CategoryObserver::class);
    }
}
