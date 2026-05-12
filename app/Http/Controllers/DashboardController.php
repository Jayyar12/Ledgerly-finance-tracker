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
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // 1. Total Balance (All time)
        $totalIncome = $user->transactions()
            ->whereHas('category', fn($q) => $q->where('type', 'income'))
            ->sum('amount');
        
        $totalExpense = $user->transactions()
            ->whereHas('category', fn($q) => $q->where('type', 'expense'))
            ->sum('amount');
        
        $balance = (float)$user->initial_balance + $totalIncome - $totalExpense;

        // 2. Monthly Stats
        $monthlyIncome = $user->transactions()
            ->whereHas('category', fn($q) => $q->where('type', 'income'))
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        $monthlyExpense = $user->transactions()
            ->whereHas('category', fn($q) => $q->where('type', 'expense'))
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount');

        // 3. Recent Activity
        $recentTransactions = $user->transactions()
            ->with('category')
            ->latest('date')
            ->take(5)
            ->get();

        // 4. Budget Performance (Burn Rate)
        $budgets = $user->budgets()
            ->whereHas('category', fn($q) => $q->where('type', 'expense'))
            ->with('category')
            ->get()
            ->map(function ($budget) use ($user, $startOfMonth, $endOfMonth) {
                $spent = $user->transactions()
                    ->where('category_id', $budget->category_id)
                    ->whereBetween('date', [$startOfMonth, $endOfMonth])
                    ->sum('amount');
                
                return [
                    'category' => $budget->category->name,
                    'limit' => $budget->amount,
                    'spent' => $spent,
                    'remaining' => max(0, $budget->amount - $spent),
                    'percentage' => $budget->amount > 0 ? round(($spent / $budget->amount) * 100, 2) : 0,
                ];
            });

        // 5. Chart Data: Expenses by Category (Current Month)
        $expensesByCategory = $user->categories()
            ->where('type', 'expense')
            ->get()
            ->map(function ($category) use ($user, $startOfMonth, $endOfMonth) {
                $value = $user->transactions()
                    ->where('category_id', $category->id)
                    ->whereBetween('date', [$startOfMonth, $endOfMonth])
                    ->sum('amount');
                
                return [
                    'name' => $category->name,
                    'value' => (float)$value,
                    'color' => $category->color,
                ];
            })
            ->filter(fn($item) => $item['value'] > 0)
            ->values();

        // 6. Chart Data: Monthly Trend (Last 6 Months)
        $monthlyTrend = collect(range(5, 0))->map(function ($i) use ($user) {
            $month = Carbon::now()->subMonths($i);
            $start = (clone $month)->startOfMonth();
            $end = (clone $month)->endOfMonth();

            $income = $user->transactions()
                ->whereHas('category', fn($q) => $q->where('type', 'income'))
                ->whereBetween('date', [$start, $end])
                ->sum('amount');

            $expense = $user->transactions()
                ->whereHas('category', fn($q) => $q->where('type', 'expense'))
                ->whereBetween('date', [$start, $end])
                ->sum('amount');

            return [
                'month' => $month->format('M'),
                'income' => (float)$income,
                'expense' => (float)$expense,
            ];
        });

        return Inertia::render('Dashboard', [
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
        ]);
    }
}
