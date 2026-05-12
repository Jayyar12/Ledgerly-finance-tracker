import React from 'react';

export default function StatCard({ title, value, icon, trend, type = 'neutral', currency = '$' }) {
    const typeStyles = {
        positive: {
            text: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-500/10',
            border: 'border-emerald-100 dark:border-emerald-500/20',
            icon: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
        },
        negative: {
            text: 'text-rose-600 dark:text-rose-400',
            bg: 'bg-rose-50 dark:bg-rose-500/10',
            border: 'border-rose-100 dark:border-rose-500/20',
            icon: 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
        },
        neutral: {
            text: 'text-slate-600 dark:text-slate-400',
            bg: 'bg-slate-50 dark:bg-slate-800/50',
            border: 'border-slate-100 dark:border-slate-700',
            icon: 'bg-slate-600 dark:bg-slate-700 text-white shadow-lg shadow-slate-500/20'
        },
    };

    const style = typeStyles[type];

    return (
        <div className={`p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border ${style.border} transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 group overflow-hidden relative`}>
            {/* Background Decorative Gradient */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${style.bg} blur-3xl group-hover:scale-150 transition-transform duration-700`} />
            
            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {(!isNaN(parseFloat(value)) && String(value).indexOf('%') === -1) 
                            ? `${currency}${parseFloat(value).toLocaleString()}` 
                            : value}
                    </h3>
                </div>
                <div className={`p-3.5 rounded-2xl ${style.icon} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    {React.cloneElement(icon, { className: 'w-6 h-6' })}
                </div>
            </div>
            
            {trend && (
                <div className="mt-6 flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">vs last month</span>
                </div>
            )}
        </div>
    );
}
