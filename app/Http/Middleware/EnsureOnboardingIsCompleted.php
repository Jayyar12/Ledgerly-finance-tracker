<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboardingIsCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && !auth()->user()->onboarded) {
            // Avoid infinite loops by allowing the setup and logout routes
            if (!$request->routeIs('setup.*') && !$request->routeIs('logout')) {
                return redirect()->route('setup.index');
            }
        }

        return $next($request);
    }
}
