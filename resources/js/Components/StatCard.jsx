import React from 'react';

export default function StatCard({ title, value, icon, trend, type = 'neutral', currency = '$' }) {
    const colors = {
        positive: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
        negative: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20',
        neutral: 'text-slate-600 bg-slate-50 dark:bg-slate-900/20 dark:text-slate-400',
    };

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
                    <h3 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                        {(!isNaN(parseFloat(value)) && String(value).indexOf('%') === -1) 
                            ? `${currency}${parseFloat(value).toLocaleString()}` 
                            : value}
                    </h3>
                </div>
                <div className={`p-3 rounded-xl ${colors[type]}`}>
                    {icon}
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-1 text-sm font-medium">
                    <span className={trend > 0 ? 'text-emerald-500' : 'text-rose-500'}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                    <span className="text-slate-400">vs last month</span>
                </div>
            )}
        </div>
    );
}
