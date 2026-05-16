<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\Budget;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cacheKey = "user_{$user->id}_dashboard_data";

        // We wrap the data generation in a cache remember block.
        // It will only execute the closure if the data is not in cache or was invalidated.
        $dashboardData = \Illuminate\Support\Facades\Cache::remember($cacheKey, 3600, function () use ($user) {
            \Illuminate\Support\Facades\Log::info("Generating fresh dashboard cache for user: " . $user->id);
            
            $startOfMonth = \Carbon\Carbon::now()->startOfMonth();
            $endOfMonth = \Carbon\Carbon::now()->endOfMonth();

            // 1. Total Balance
            $totalIncome = $user->transactions()
                ->whereHas('category', fn($q) => $q->where('type', 'income'))->sum('amount');
            $totalExpense = $user->transactions()
                ->whereHas('category', fn($q) => $q->where('type', 'expense'))->sum('amount');
            
            $balance = (float)$user->initial_balance + $totalIncome - $totalExpense;

            // 2. Monthly Stats
            $monthlyIncome = $user->transactions()
                ->whereHas('category', fn($q) => $q->where('type', 'income'))
                ->whereBetween('date', [$startOfMonth, $endOfMonth])->sum('amount');
            $monthlyExpense = $user->transactions()
                ->whereHas('category', fn($q) => $q->where('type', 'expense'))
                ->whereBetween('date', [$startOfMonth, $endOfMonth])->sum('amount');

            // 3. Recent Activity (Converting to array to ensure relationships are captured in cache)
            $recentTransactions = $user->transactions()->with('category')->latest('date')->take(5)->get()->toArray();

            // 4. Budgets
            $budgets = $user->budgets()
                ->whereHas('category', fn($q) => $q->where('type', 'expense'))
                ->with('category')->get()
                ->map(function ($budget) use ($user, $startOfMonth, $endOfMonth) {
                    $spent = $user->transactions()
                        ->where('category_id', $budget->category_id)
                        ->whereBetween('date', [$startOfMonth, $endOfMonth])->sum('amount');
                    return [
                        'category' => $budget->category->name,
                        'limit' => $budget->amount,
                        'spent' => $spent,
                        'remaining' => max(0, $budget->amount - $spent),
                        'percentage' => $budget->amount > 0 ? round(($spent / $budget->amount) * 100, 2) : 0,
                    ];
                })->all(); // Already an array of arrays due to map return

            // 5. Chart Data
            $expensesByCategory = $user->categories()->where('type', 'expense')->get()
                ->map(function ($category) use ($user, $startOfMonth, $endOfMonth) {
                    $value = $user->transactions()
                        ->where('category_id', $category->id)
                        ->whereBetween('date', [$startOfMonth, $endOfMonth])->sum('amount');
                    return [
                        'name' => $category->name,
                        'value' => (float)$value,
                        'color' => $category->color,
                    ];
                })->filter(fn($item) => $item['value'] > 0)->values()->all();

            $monthlyTrend = collect(range(5, 0))->map(function ($i) use ($user) {
                $month = \Carbon\Carbon::now()->subMonths($i);
                $start = (clone $month)->startOfMonth();
                $end = (clone $month)->endOfMonth();
                $income = $user->transactions()->whereHas('category', fn($q) => $q->where('type', 'income'))->whereBetween('date', [$start, $end])->sum('amount');
                $expense = $user->transactions()->whereHas('category', fn($q) => $q->where('type', 'expense'))->whereBetween('date', [$start, $end])->sum('amount');
                return [
                    'month' => $month->format('M'),
                    'income' => (float)$income,
                    'expense' => (float)$expense,
                ];
            })->all();

            return [
                'stats' => [
                    'balance' => $balance,
                    'monthlyIncome' => $monthlyIncome,
                    'monthlyExpense' => $monthlyExpense,
                    'savingsRate' => $monthlyIncome > 0 ? round((($monthlyIncome - $monthlyExpense) / $monthlyIncome) * 100, 2) : 0,
                ],
                'recentTransactions' => $recentTransactions,
                'budgets' => $budgets,
                'charts' => [
                    'categoryData' => $expensesByCategory,
                    'trendData' => $monthlyTrend,
                ]
            ];
        });

        return Inertia::render('Dashboard', $dashboardData);
    }
}
