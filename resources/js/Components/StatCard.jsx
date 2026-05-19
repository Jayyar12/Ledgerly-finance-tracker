import React from 'react';

export default function StatCard({ title, value, icon, trend, type = 'neutral', currency = '$' }) {
    if (type === 'positive') {
        return (
            <div className="p-4 bg-emerald-500 dark:bg-emerald-600 rounded-[1.5rem] shadow-lg border border-emerald-400/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative flex items-center justify-between">
                    <div>
                        <p className="text-[9px] font-black text-emerald-100 uppercase tracking-[0.2em] mb-1">{title}</p>
                        <h3 className="text-xl font-black text-white tracking-tight">
                            {(!isNaN(parseFloat(value)) && String(value).indexOf('%') === -1) 
                                ? `${currency}${parseFloat(value).toLocaleString()}` 
                                : value}
                        </h3>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/20 text-white shadow-inner flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        {React.cloneElement(icon, { className: 'w-5 h-5' })}
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'negative') {
        return (
            <div className="p-4 bg-rose-500 dark:bg-rose-600 rounded-[1.5rem] shadow-lg border border-rose-400/20 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative flex items-center justify-between">
                    <div>
                        <p className="text-[9px] font-black text-rose-100 uppercase tracking-[0.2em] mb-1">{title}</p>
                        <h3 className="text-xl font-black text-white tracking-tight">
                            {(!isNaN(parseFloat(value)) && String(value).indexOf('%') === -1) 
                                ? `${currency}${parseFloat(value).toLocaleString()}` 
                                : value}
                        </h3>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/20 text-white shadow-inner flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        {React.cloneElement(icon, { className: 'w-5 h-5' })}
                    </div>
                </div>
            </div>
        );
    }

    // Neutral Card (Total Balance & Savings Rate)
    return (
        <div className="p-4 bg-slate-900/50 dark:bg-slate-900/80 rounded-[1.5rem] shadow-md border border-slate-800 dark:border-slate-800/80 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-slate-800/20 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative flex items-center justify-between">
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
                    <h3 className="text-xl font-black text-white tracking-tight">
                        {(!isNaN(parseFloat(value)) && String(value).indexOf('%') === -1) 
                            ? `${currency}${parseFloat(value).toLocaleString()}` 
                            : value}
                    </h3>
                </div>
                <div className={`p-2.5 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    title.toLowerCase().includes('savings')
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                    {React.cloneElement(icon, { className: 'w-5 h-5' })}
                </div>
            </div>
        </div>
    );
}
