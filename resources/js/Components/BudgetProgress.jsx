import React from 'react';

export default function BudgetProgress({ category, spent, limit, percentage }) {
    const isOver = spent > limit;
    const barColor = isOver ? 'bg-rose-500' : percentage > 80 ? 'bg-amber-500' : 'bg-emerald-500';

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">{category}</h4>
                    <p className="text-xs text-slate-500">
                        ${spent.toLocaleString()} / ${limit.toLocaleString()}
                    </p>
                </div>
                <span className={`text-xs font-bold ${isOver ? 'text-rose-500' : 'text-slate-500'}`}>
                    {percentage}%
                </span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${barColor} transition-all duration-500`} 
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
            {isOver && (
                <p className="text-[10px] text-rose-500 font-medium">Over budget by ${(spent - limit).toLocaleString()}</p>
            )}
        </div>
    );
}
