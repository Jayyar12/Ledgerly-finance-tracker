import React from 'react';

export default function ChartSkeleton() {
    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-pulse">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-5 bg-slate-100 dark:bg-slate-700 rounded-md"></div>
                <div className="h-5 bg-slate-100 dark:bg-slate-700 rounded w-32"></div>
            </div>
            
            <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-1 flex items-end gap-1 h-full">
                        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-t-sm" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                        <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-t-sm" style={{ height: `${Math.random() * 40 + 10}%` }}></div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-100 dark:bg-slate-700" />
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-16"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-100 dark:bg-slate-700" />
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
}
