<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class CategoryController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => auth()->user()->categories()
                ->latest()
                ->paginate(12)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        auth()->user()->categories()->create($request->validated());

        return redirect()->back()->with('message', 'Category created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $this->authorize('update', $category);

        $category->update($request->validated());

        return redirect()->back()->with('message', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        $category->delete();

        return redirect()->back()->with('message', 'Category deleted successfully.');
    }
}
