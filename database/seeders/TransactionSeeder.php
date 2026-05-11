<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        if (!$user) return;

        $categories = $user->categories()->get();
        $now = Carbon::now();

        // Income
        $salaryCat = $categories->where('name', 'Salary')->first();
        $user->transactions()->create([
            'category_id' => $salaryCat->id,
            'amount' => 5000,
            'date' => $now->copy()->startOfMonth(),
            'description' => 'Monthly Salary',
        ]);

        // Expenses
        $rentCat = $categories->where('name', 'Rent')->first();
        $user->transactions()->create([
            'category_id' => $rentCat->id,
            'amount' => 1200,
            'date' => $now->copy()->startOfMonth()->addDays(2),
            'description' => 'Apartment Rent',
        ]);

        $groceriesCat = $categories->where('name', 'Groceries')->first();
        for ($i = 0; $i < 4; $i++) {
            $user->transactions()->create([
                'category_id' => $groceriesCat->id,
                'amount' => rand(50, 150),
                'date' => $now->copy()->startOfMonth()->addWeeks($i)->addDays(rand(1, 5)),
                'description' => 'Weekly Groceries',
            ]);
        }

        $entertainmentCat = $categories->where('name', 'Entertainment')->first();
        $user->transactions()->create([
            'category_id' => $entertainmentCat->id,
            'amount' => 80,
            'date' => $now->copy()->subDays(2),
            'description' => 'Movie Night',
        ]);

        $utilitiesCat = $categories->where('name', 'Utilities')->first();
        $user->transactions()->create([
            'category_id' => $utilitiesCat->id,
            'amount' => 150,
            'date' => $now->copy()->startOfMonth()->addDays(10),
            'description' => 'Electricity & Water',
        ]);
    }
}
