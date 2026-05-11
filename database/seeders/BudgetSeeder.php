<?php

namespace Database\Seeders;

use App\Models\Budget;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BudgetSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        if (!$user) return;

        $categories = $user->categories()->where('type', 'expense')->get();
        $now = Carbon::now();

        $budgets = [
            ['name' => 'Groceries', 'amount' => 500],
            ['name' => 'Entertainment', 'amount' => 200],
            ['name' => 'Transport', 'amount' => 150],
            ['name' => 'Utilities', 'amount' => 200],
        ];

        foreach ($budgets as $bData) {
            $cat = $categories->where('name', $bData['name'])->first();
            if ($cat) {
                $user->budgets()->create([
                    'category_id' => $cat->id,
                    'amount' => $bData['amount'],
                    'period' => 'monthly',
                    'start_date' => $now->copy()->startOfMonth(),
                ]);
            }
        }
    }
}
