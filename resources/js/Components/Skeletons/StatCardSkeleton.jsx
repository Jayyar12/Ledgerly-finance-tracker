import React from 'react';

export default function StatCardSkeleton() {
    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-24"></div>
                    <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded w-32"></div>
                </div>
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
            </div>
            <div className="mt-4 flex items-center gap-2">
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-16"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-20"></div>
            </div>
        </div>
    );
}
