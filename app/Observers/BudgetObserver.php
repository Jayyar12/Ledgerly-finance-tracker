<?php

namespace App\Observers;

use App\Models\Budget;
use Illuminate\Support\Facades\Cache;

class BudgetObserver
{
    /**
     * Handle the Budget "saved" event (created or updated).
     */
    public function saved(Budget $budget): void
    {
        $this->clearCache($budget);
    }

    /**
     * Handle the Budget "deleted" event.
     */
    public function deleted(Budget $budget): void
    {
        $this->clearCache($budget);
    }

    /**
     * Clear the dashboard cache for the user.
     */
    protected function clearCache(Budget $budget): void
    {
        Cache::forget("user_{$budget->user_id}_dashboard_data");
    }
}
