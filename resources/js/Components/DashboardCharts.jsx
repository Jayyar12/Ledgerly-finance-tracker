import React from 'react';

export function TrendChart({ data, currency = '$' }) {
    if (!data) return null;

    const maxVal = Math.max(...data.map(d => Math.max(d.income, d.expense, 1)));

    return (
        <div className="h-[300px] w-full flex items-end justify-between gap-4 pt-10">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group/col relative h-full">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[10px] p-3 rounded-2xl opacity-0 group-hover/col:opacity-100 transition-all duration-300 pointer-events-none z-20 whitespace-nowrap shadow-2xl border border-slate-700/50 scale-95 group-hover/col:scale-100">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-slate-400">Income:</span>
                            <span className="font-black text-emerald-400">{currency}{parseFloat(d.income).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="text-slate-400">Expense:</span>
                            <span className="font-black text-rose-400">{currency}{parseFloat(d.expense).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Bars Container */}
                    <div className="w-full flex items-end justify-center gap-1.5 h-full pb-10">
                        <div 
                            className="w-4 bg-gradient-to-t from-emerald-600/80 to-emerald-400/80 rounded-t-lg transition-all duration-700 hover:from-emerald-500 hover:to-emerald-300 relative group/bar shadow-lg shadow-emerald-500/10"
                            style={{ height: `${(d.income / maxVal) * 100}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-lg" />
                        </div>
                        <div 
                            className="w-4 bg-gradient-to-t from-rose-600/80 to-rose-400/80 rounded-t-lg transition-all duration-700 hover:from-rose-500 hover:to-rose-300 relative group/bar shadow-lg shadow-rose-500/10"
                            style={{ height: `${(d.expense / maxVal) * 100}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-t-lg" />
                        </div>
                    </div>
                    
                    {/* Label */}
                    <span className="absolute bottom-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-2 py-0.5 rounded-full">
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
        <div className="h-[300px] w-full flex flex-col justify-center space-y-8">
            <div className="w-full flex h-10 rounded-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-900/50 p-1">
                {data.map((d, i) => (
                    <div 
                        key={i}
                        className="h-full transition-all duration-700 hover:scale-[1.02] hover:z-10 relative group first:rounded-l-xl last:rounded-r-xl"
                        style={{ 
                            width: `${(d.value / total) * 100}%`,
                            backgroundColor: d.color
                        }}
                    >
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-20 shadow-xl border border-slate-700/50">
                            <span className="font-bold">{d.name}</span>: {currency}{parseFloat(d.value).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-2">
                {data.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                        <div className="w-3 h-3 rounded-full shadow-sm transition-transform group-hover:scale-125" style={{ backgroundColor: d.color }} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{d.name}</span>
                            <span className="text-sm font-black text-slate-700 dark:text-slate-100">
                                {((d.value / total) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
