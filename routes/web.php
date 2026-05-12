<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\OnboardingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/setup', [OnboardingController::class, 'index'])->name('setup.index');
    Route::post('/setup', [OnboardingController::class, 'update'])->name('setup.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::middleware('throttle:finance-ops')->group(function () {
        Route::resource('categories', CategoryController::class)->except(['create', 'edit', 'show']);
        Route::resource('transactions', TransactionController::class)->except(['create', 'edit', 'show']);
        Route::resource('budgets', BudgetController::class)->except(['create', 'edit', 'show']);
    });

    Route::get('/export-report', [ReportController::class, 'exportMonthly'])->name('reports.export');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/currency', [ProfileController::class, 'updateCurrency'])->name('profile.currency.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
