import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import StatCard from '@/Components/StatCard';
import BudgetProgress from '@/Components/BudgetProgress';
import { TrendChart, DistributionChart } from '@/Components/DashboardCharts';
import { motion } from 'framer-motion';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    TrendingUp,
    Download
} from 'lucide-react';

export default function Dashboard({ stats, recentTransactions, budgets, charts }) {
    const { auth } = usePage().props;
    const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const currencySymbol = auth.user.currency === 'PHP' ? '₱' : '$';

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Header / Welcome Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-6"
            >
                <div>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-2">Personal Overview</p>
                    <h2 className="text-4xl font-black leading-tight text-slate-800 dark:text-white tracking-tight">
                        {getGreeting()}, <span className="text-emerald-500">{auth.user.name.split(' ')[0]}</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        Here's what's happening with your finances today.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md p-2 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-2 px-4 border-r border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Report Month</span>
                        <input
                            type="month"
                            className="border-none bg-transparent text-sm font-black text-slate-700 dark:text-slate-200 focus:ring-0 p-0 cursor-pointer"
                            value={reportMonth}
                            onChange={(e) => setReportMonth(e.target.value)}
                        />
                    </div>
                    <a
                        href={route('reports.export', { month: reportMonth })}
                        className="inline-flex items-center px-6 py-3 bg-slate-900 dark:bg-emerald-500 border border-transparent rounded-2xl font-black text-[10px] text-white uppercase tracking-[0.2em] hover:scale-105 active:scale-95 shadow-xl shadow-slate-500/20 dark:shadow-emerald-500/20 transition-all duration-300 gap-2"
                    >
                        <Download className="w-4 h-4" /> Export Data
                    </a>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 pb-12"
            >
                {/* Top Stats Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="will-change-transform"
                    >
                        <StatCard
                            title="Total Balance"
                            value={stats.balance}
                            icon={<Wallet />}
                            type="neutral"
                            currency={currencySymbol}
                        />
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="will-change-transform"
                    >
                        <StatCard
                            title="Monthly Income"
                            value={stats.monthlyIncome}
                            icon={<ArrowUpRight />}
                            type="positive"
                            currency={currencySymbol}
                        />
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="will-change-transform"
                    >
                        <StatCard
                            title="Monthly Expenses"
                            value={stats.monthlyExpense}
                            icon={<ArrowDownLeft />}
                            type="negative"
                            currency={currencySymbol}
                        />
                    </motion.div>
                    <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="will-change-transform"
                    >
                        <StatCard
                            title="Savings Rate"
                            value={`${stats.savingsRate}%`}
                            icon={<CreditCard />}
                            type={stats.savingsRate > 20 ? 'positive' : stats.savingsRate > 0 ? 'neutral' : 'negative'}
                        />
                    </motion.div>
                </motion.div>

                {/* Charts Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Monthly Trend Bar Chart */}
                    <div className="lg:col-span-2 p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32" />

                        <div className="flex items-center justify-between mb-8 relative">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-500/10 rounded-xl">
                                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Spending Analysis</h3>
                            </div>
                            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Income
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Expenses
                                </div>
                            </div>
                        </div>
                        <TrendChart data={charts.trendData} currency={currencySymbol} />
                    </div>

                    {/* Category Distribution Chart */}
                    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-emerald-500/10 rounded-xl">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Distribution</h3>
                        </div>
                        <DistributionChart data={charts.categoryData} currency={currencySymbol} />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Transactions */}
                    <div className="lg:col-span-2 p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Recent Activity</h3>
                            <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">View All Activity</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-4 py-4">Date</th>
                                        <th className="px-4 py-4">Description</th>
                                        <th className="px-4 py-4">Category</th>
                                        <th className="px-4 py-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                                    {recentTransactions.map((tx, idx) => (
                                        <motion.tr
                                            key={tx.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="group hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-all duration-300"
                                        >
                                            <td className="px-4 py-5 text-slate-500 dark:text-slate-400 font-medium">
                                                {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-4 py-5">
                                                <div className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">
                                                    {tx.description || 'General Transaction'}
                                                </div>
                                            </td>
                                            <td className="px-4 py-5">
                                                {tx.category ? (
                                                    <span
                                                        className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                                                        style={{ backgroundColor: `${tx.category.color}15`, color: tx.category.color }}
                                                    >
                                                        {tx.category.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-slate-400 italic">Uncategorized</span>
                                                )}
                                            </td>
                                            <td className={`px-4 py-5 text-right font-black tracking-tight ${tx.category?.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {tx.category?.type === 'income' ? '+' : '-'}{currencySymbol}{parseFloat(tx.amount).toLocaleString()}
                                            </td>
                                        </motion.tr>
                                    ))}
                                    {recentTransactions.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-12 text-center text-slate-400 italic font-medium">No activity recorded for this period</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Budget Status */}
                    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-black text-slate-800 dark:text-white tracking-tight mb-8">Monthly Budgets</h3>
                        <div className="space-y-8">
                            {budgets.map((budget, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ x: 4 }}
                                    transition={{
                                        delay: index * 0.05,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25
                                    }}
                                    className="cursor-pointer will-change-transform"
                                >
                                    <BudgetProgress
                                        category={budget.category}
                                        spent={parseFloat(budget.spent)}
                                        limit={parseFloat(budget.limit)}
                                        percentage={budget.percentage}
                                        currency={currencySymbol}
                                    />
                                </motion.div>
                            ))}
                            {budgets.length === 0 && (
                                <div className="text-center py-12 px-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-700">
                                    <p className="text-sm text-slate-400 font-medium italic">No active budgets found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AuthenticatedLayout>
    );
}
