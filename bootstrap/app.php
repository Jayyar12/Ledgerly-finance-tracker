<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\EnsureOnboardingIsCompleted::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (\Symfony\Component\HttpFoundation\Response $response, \Throwable $exception, \Illuminate\Http\Request $request) {
            if (in_array($response->getStatusCode(), [403, 404, 429, 500, 503])) {
                // Intercept Inertia requests to provide a rich component experience instead of a blank page
                if ($request->header('X-Inertia') || $request->wantsJson()) {
                    return \Inertia\Inertia::render('Error', [
                        'status' => $response->getStatusCode(),
                        'message' => match ($response->getStatusCode()) {
                            429 => 'Too Many Requests',
                            403 => 'Access Forbidden',
                            404 => 'Page Not Found',
                            503 => 'Service Unavailable',
                            default => 'Server Error',
                        },
                        'description' => match ($response->getStatusCode()) {
                            429 => 'You are saving financial operations too quickly. Please pause, let the countdown finish, and try again.',
                            403 => 'You do not have authorization to perform this operation.',
                            404 => 'The financial ledger page or resource could not be found.',
                            503 => 'System is temporarily under load or maintenance. Please retry in a bit.',
                            default => 'An unexpected internal ledger error occurred. We are working to resolve it.',
                        },
                        'retryAfter' => $response->headers->get('Retry-After') ? (int) $response->headers->get('Retry-After') : null,
                    ])->toResponse($request)->setStatusCode($response->getStatusCode());
                }
            }
            return $response;
        });
    })->create();
