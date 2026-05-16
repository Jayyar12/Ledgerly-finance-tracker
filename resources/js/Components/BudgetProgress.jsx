import React from 'react';

export default function BudgetProgress({ category, spent, limit, percentage, currency = '$' }) {
    const isOver = spent > limit;
    const barColor = isOver ? 'bg-rose-500' : percentage > 80 ? 'bg-amber-500' : 'bg-emerald-500';

    return (
        <div className="space-y-3 group transition-transform duration-300">
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-500 transition-colors duration-300">{category}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        {currency}{spent.toLocaleString()} <span className="text-slate-300 dark:text-slate-600">/</span> {currency}{limit.toLocaleString()}
                    </p>
                </div>
                <div className="text-right">
                    <span className={`text-sm font-black ${isOver ? 'text-rose-500' : 'text-slate-600 dark:text-slate-400'}`}>
                        {percentage}%
                    </span>
                </div>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-900/50 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                <div 
                    className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out shadow-sm`} 
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
            {isOver && (
                <div className="flex items-center gap-1.5 animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <p className="text-[10px] text-rose-500 font-black uppercase tracking-tighter">Over budget by {currency}{(spent - limit).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}
