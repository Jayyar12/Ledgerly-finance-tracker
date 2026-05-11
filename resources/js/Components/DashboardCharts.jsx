import React from 'react';

export function TrendChart({ data }) {
    if (!data) return null;

    const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense, 1)));

    return (
        <div className="h-[300px] w-full flex items-end justify-between gap-2 pt-10">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group relative h-full">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-xl border border-slate-700">
                        <div className="text-emerald-400 font-bold">Income: ${d.income}</div>
                        <div className="text-rose-400 font-bold">Expense: ${d.expense}</div>
                    </div>

                    {/* Bars Container */}
                    <div className="w-full flex items-end justify-center gap-1 h-full pb-8">
                        <div 
                            className="w-3 bg-emerald-500/80 rounded-t-sm transition-all duration-500 hover:bg-emerald-400"
                            style={{ height: `${(d.income / maxVal) * 100}%` }}
                        />
                        <div 
                            className="w-3 bg-rose-500/80 rounded-t-sm transition-all duration-500 hover:bg-rose-400"
                            style={{ height: `${(d.expense / maxVal) * 100}%` }}
                        />
                    </div>
                    
                    {/* Label */}
                    <span className="absolute bottom-0 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {d.month}
                    </span>
                </div>
            ))}
        </div>
    );
}

export function DistributionChart({ data, currency = '$' }) {
    if (!data) return null;

    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="h-[300px] w-full flex flex-col justify-center space-y-4">
            <div className="w-full flex h-8 rounded-full overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-900/50">
                {data.map((d, i) => (
                    <div 
                        key={i}
                        className="h-full transition-all duration-700 hover:opacity-80 relative group"
                        style={{ 
                            width: `${(d.value / total) * 100}%`,
                            backgroundColor: d.color
                        }}
                    >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {d.name}: {currency}{d.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {data.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{d.name}</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                {((d.value / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
