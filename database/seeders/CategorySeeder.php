<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        if (!$user) return;

        $categories = [
            ['name' => 'Salary', 'type' => 'income', 'color' => '#10B981'],
            ['name' => 'Freelance', 'type' => 'income', 'color' => '#34D399'],
            ['name' => 'Investments', 'type' => 'income', 'color' => '#059669'],
            
            ['name' => 'Rent', 'type' => 'expense', 'color' => '#F43F5E'],
            ['name' => 'Groceries', 'type' => 'expense', 'color' => '#FB923C'],
            ['name' => 'Utilities', 'type' => 'expense', 'color' => '#60A5FA'],
            ['name' => 'Entertainment', 'type' => 'expense', 'color' => '#A78BFA'],
            ['name' => 'Transport', 'type' => 'expense', 'color' => '#94A3B8'],
            ['name' => 'Health', 'type' => 'expense', 'color' => '#F87171'],
        ];

        foreach ($categories as $category) {
            $user->categories()->create($category);
        }
    }
}
