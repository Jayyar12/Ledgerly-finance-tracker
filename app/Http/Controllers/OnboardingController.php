<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class OnboardingController extends Controller
{
    public function index()
    {
        return Inertia::render('Setup');
    }

    public function update(Request $request)
    {
        $request->validate([
            'currency' => 'required|string|in:USD,PHP',
            'initial_balance' => 'nullable|numeric|min:0',
            'categories' => 'nullable|array',
        ]);

        $user = $request->user();

        DB::transaction(function () use ($user, $request) {
            $user->update([
                'currency' => $request->currency,
                'initial_balance' => $request->initial_balance ?? 0,
                'onboarded' => true,
            ]);

            // Seed default categories if provided
            if ($request->has('categories') && !empty($request->categories)) {
                foreach ($request->categories as $category) {
                    Category::create([
                        'user_id' => $user->id,
                        'name' => $category['name'],
                        'type' => $category['type'],
                        'color' => $category['color'],
                    ]);
                }
            }
        });

        return redirect()->route('dashboard')->with('message', 'Account setup completed successfully!');
    }
}
