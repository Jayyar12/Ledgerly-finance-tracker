import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, Home, Timer, RefreshCw } from 'lucide-react';

export default function Error({ status, message, description, retryAfter }) {
    const [secondsLeft, setSecondsLeft] = useState(retryAfter || 0);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [secondsLeft]);

    const getIcon = () => {
        if (status === 429) return <Timer className="w-12 h-12 text-emerald-500" />;
        return <AlertOctagon className="w-12 h-12 text-rose-500" />;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">
            {/* Artistic Backdrop Gradients */}
            <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-emerald-500/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-emerald-500/5 blur-[120px] translate-x-1/3 translate-y-1/3 rounded-full animate-pulse" />

            <Head title={`${status} - ${message}`} />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none text-center relative z-10"
            >
                {/* Visual Status Indicator */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={status === 429 && secondsLeft > 0 ? { rotate: 360 } : {}}
                        transition={status === 429 && secondsLeft > 0 ? { repeat: Infinity, duration: 15, ease: "linear" } : {}}
                        className="p-5 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20"
                    >
                        {getIcon()}
                    </motion.div>
                </div>

                {/* Error Status Code & Header */}
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-3 block">
                    HTTP Error {status}
                </span>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-4">
                    {message}
                </h1>
                
                {/* Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed mb-8">
                    {description}
                </p>

                {/* Custom 429 Rate Limiting Countdown Card */}
                {status === 429 && secondsLeft > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-3xl border border-emerald-500/10 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                            Rate Limit Lockout Active
                        </span>
                        <div className="text-3xl font-black text-emerald-500 tracking-tight">
                            {secondsLeft}s
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                            <motion.div
                                className="bg-emerald-500 h-full rounded-full"
                                initial={{ width: "100%" }}
                                animate={{ width: `${(secondsLeft / (retryAfter || 60)) * 100}%` }}
                                transition={{ ease: "linear", duration: 1 }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {status === 429 && secondsLeft > 0 ? (
                        <button
                            disabled
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] cursor-not-allowed gap-2"
                        >
                            <RefreshCw className="w-4 h-4 animate-spin" /> Wait to Retry
                        </button>
                    ) : (
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20 active:scale-95 transition-all duration-300 gap-2 cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4" /> Retry Now
                        </button>
                    )}

                    <Link
                        href={route('dashboard')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 bg-slate-900 dark:bg-slate-850 hover:scale-105 active:scale-95 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 gap-2"
                    >
                        <Home className="w-4 h-4" /> Dashboard
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
