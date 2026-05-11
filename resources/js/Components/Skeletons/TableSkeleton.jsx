import React from 'react';

export default function TableSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden animate-pulse">
            <div className="p-6 border-b border-slate-50 dark:border-slate-700/50">
                <div className="h-5 bg-slate-100 dark:bg-slate-700 rounded w-48"></div>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    {/* Header Row */}
                    <div className="grid grid-cols-4 gap-4 pb-4 border-b border-slate-50 dark:border-slate-700/50">
                        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-16"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-32"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-24"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-20 ml-auto"></div>
                    </div>
                    
                    {/* Data Rows */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 py-2">
                            <div className="h-4 bg-slate-50 dark:bg-slate-900/50 rounded w-20"></div>
                            <div className="h-4 bg-slate-50 dark:bg-slate-900/50 rounded w-40"></div>
                            <div className="h-4 bg-slate-50 dark:bg-slate-900/50 rounded w-28"></div>
                            <div className="h-4 bg-slate-50 dark:bg-slate-900/50 rounded w-16 ml-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
