<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Category;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function exportMonthly(Request $request)
    {
        $user = auth()->user();
        $date = $request->has('month') ? Carbon::parse($request->month) : Carbon::now();
        $startOfMonth = $date->copy()->startOfMonth();
        $endOfMonth = $date->copy()->endOfMonth();

        $transactions = $user->transactions()
            ->with('category')
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->latest('date')
            ->get();

        $summary = [
            'income' => $transactions->where('category.type', 'income')->sum('amount'),
            'expense' => $transactions->where('category.type', 'expense')->sum('amount'),
            'month_name' => $date->format('F Y'),
            'generated_at' => Carbon::now()->format('Y-m-d H:i'),
        ];

        $budgets = $user->budgets()
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
                    'status' => $spent > $budget->amount ? 'Over Budget' : 'On Track',
                ];
            });

        $pdf = Pdf::loadView('reports.monthly', compact('transactions', 'summary', 'budgets', 'user'));

        return $pdf->download("Finance_Report_{$date->format('M_Y')}.pdf");
    }
}
