<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBudgetRequest;
use App\Http\Requests\UpdateBudgetRequest;
use App\Models\Budget;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class BudgetController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Budgets/Index', [
            'budgets' => auth()->user()->budgets()
                ->with('category')
                ->latest()
                ->paginate(10),
            'categories' => auth()->user()->categories()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBudgetRequest $request)
    {
        auth()->user()->budgets()->create($request->validated());

        return redirect()->back()->with('message', 'Budget set successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBudgetRequest $request, Budget $budget)
    {
        $this->authorize('update', $budget);

        $budget->update($request->validated());

        return redirect()->back()->with('message', 'Budget updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Budget $budget)
    {
        $this->authorize('delete', $budget);

        $budget->delete();

        return redirect()->back()->with('message', 'Budget removed successfully.');
    }
}
