<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Transaction;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class TransactionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = auth()->user()->transactions()->with('category');

        // Search by description
        if (request('search')) {
            $query->where('description', 'like', '%' . request('search') . '%');
        }

        // Filter by category
        if (request('category_id')) {
            $query->where('category_id', request('category_id'));
        }

        // Filter by type (income/expense)
        if (request('type')) {
            $query->whereHas('category', fn($q) => $q->where('type', request('type')));
        }

        return Inertia::render('Transactions/Index', [
            'transactions' => $query->latest('date')
                ->paginate(10)
                ->withQueryString(),
            'categories' => auth()->user()->categories()->get(),
            'filters' => request()->only(['search', 'category_id', 'type']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        auth()->user()->transactions()->create($request->validated());

        return redirect()->back()->with('message', 'Transaction added successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $this->authorize('update', $transaction);

        $transaction->update($request->validated());

        return redirect()->back()->with('message', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $this->authorize('delete', $transaction);

        $transaction->delete();

        return redirect()->back()->with('message', 'Transaction deleted successfully.');
    }
}
