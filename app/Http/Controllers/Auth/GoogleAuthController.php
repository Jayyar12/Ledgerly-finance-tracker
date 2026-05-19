<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     */
    public function redirectToGoogle(Request $request): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google and authenticate.
     */
    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            // Configure a custom Guzzle client with timeouts to prevent hangs
            $httpClient = new \GuzzleHttp\Client([
                'timeout' => 10.0,         // Limit overall response time to 10 seconds
                'connect_timeout' => 5.0,  // Limit connection handshakes to 5 seconds
            ]);

            $driver = Socialite::driver('google');
            $driver->setHttpClient($httpClient);

            $googleUser = $driver->user();

            // Find an existing user by email
            $existingUser = User::where('email', $googleUser->getEmail())->first();

            if ($existingUser) {
                // If user exists, bind their google_id and token if not already bound
                $existingUser->update([
                    'google_id' => $existingUser->google_id ?? $googleUser->getId(),
                    'google_token' => $googleUser->token,
                ]);

                if (!$existingUser->email_verified_at) {
                    $existingUser->email_verified_at = now();
                    $existingUser->save();
                }

                Auth::login($existingUser);

                // If user is not onboarded, route directly to setup onboarding
                if (!$existingUser->onboarded) {
                    return redirect()->route('setup.index');
                }
            } else {
                // Create the new user record automatically
                $newUser = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'google_token' => $googleUser->token,
                    'onboarded' => false, // enforce setup onboarding
                    // Assign a secure random password for new Google users
                    'password' => Hash::make(Str::random(24)),
                ]);

                $newUser->email_verified_at = now();
                $newUser->save();

                Auth::login($newUser);

                // Redirect straight to onboarding setup
                return redirect()->route('setup.index');
            }

            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            Log::error('Google Auth Error: ' . $e->getMessage(), [
                'exception' => $e,
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            return redirect()->route('login')->withErrors([
                'email' => 'Google Authentication failed: ' . $e->getMessage(),
            ]);
        }
    }
}
