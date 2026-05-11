import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import StatCard from '@/Components/StatCard';
import BudgetProgress from '@/Components/BudgetProgress';
import { TrendChart, DistributionChart } from '@/Components/DashboardCharts';
import StatCardSkeleton from '@/Components/Skeletons/StatCardSkeleton';
import ChartSkeleton from '@/Components/Skeletons/ChartSkeleton';
import TableSkeleton from '@/Components/Skeletons/TableSkeleton';
import { 
    CreditCard, 
    ArrowUpRight, 
    ArrowDownLeft, 
    Wallet, 
    Download, 
    TrendingUp 
} from 'lucide-react';

export default function Dashboard({ stats, recentTransactions, budgets, charts }) {
    const { auth } = usePage().props;
    const [reportMonth, setReportMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const [loading, setLoading] = useState(true);
    const currencySymbol = auth.user.currency === 'PHP' ? '₱' : '$';

    useEffect(() => {
        // Simulate initial loading for skeletons
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold leading-tight text-slate-800 dark:text-slate-100">
                    Financial Overview
                </h2>
                
                <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-2 px-3 border-r border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Report Month:</span>
                        <input 
                            type="month" 
                            className="border-none bg-transparent text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-0 p-0 cursor-pointer"
                            value={reportMonth}
                            onChange={(e) => setReportMonth(e.target.value)}
                        />
                    </div>
                    <a 
                        href={route('reports.export', { month: reportMonth })} 
                        className="inline-flex items-center px-4 py-2 bg-emerald-500 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition ease-in-out duration-150 gap-2"
                    >
                        <Download className="w-4 h-4" /> Export Report
                    </a>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            [...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)
                        ) : (
                            <>
                                <StatCard 
                                    title="Total Balance" 
                                    value={stats.balance} 
                                    icon={<Wallet className="w-6 h-6" />}
                                    type="neutral"
                                    currency={currencySymbol}
                                />
                                <StatCard 
                                    title="Monthly Income" 
                                    value={stats.monthlyIncome} 
                                    icon={<ArrowUpRight className="w-6 h-6" />}
                                    type="positive"
                                    currency={currencySymbol}
                                />
                                <StatCard 
                                    title="Monthly Expenses" 
                                    value={stats.monthlyExpense} 
                                    icon={<ArrowDownLeft className="w-6 h-6" />}
                                    type="negative"
                                    currency={currencySymbol}
                                />
                                <StatCard 
                                    title="Savings Rate" 
                                    value={`${stats.savingsRate}%`} 
                                    icon={<CreditCard className="w-6 h-6" />}
                                    type={stats.savingsRate > 0 ? 'positive' : 'negative'}
                                />
                            </>
                        )}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <>
                                <div className="lg:col-span-2"><ChartSkeleton /></div>
                                <ChartSkeleton />
                            </>
                        ) : (
                            <>
                                {/* Monthly Trend Bar Chart (Custom CSS) */}
                                <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2 mb-6">
                                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">6-Month Trend</h3>
                                    </div>
                                    <TrendChart data={charts.trendData} currency={currencySymbol} />
                                    
                                    <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500" /> Income
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-rose-500" /> Expenses
                                        </div>
                                    </div>
                                </div>

                                {/* Category Distribution Chart (Custom CSS) */}
                                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2 mb-6">
                                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Distribution</h3>
                                    </div>
                                    <DistributionChart data={charts.categoryData} currency={currencySymbol} />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Transactions */}
                        {loading ? (
                            <div className="lg:col-span-2">
                                <TableSkeleton />
                            </div>
                        ) : (
                            <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 text-emerald-500">Recent Transactions</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400">
                                            <tr>
                                                <th className="px-4 py-3">Date</th>
                                                <th className="px-4 py-3">Description</th>
                                                <th className="px-4 py-3">Category</th>
                                                <th className="px-4 py-3 text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                            {recentTransactions.map((tx) => (
                                                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                                                        {new Date(tx.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                                                        {tx.description || 'No description'}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span 
                                                            className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                                                            style={{ backgroundColor: `${tx.category.color}20`, color: tx.category.color }}
                                                        >
                                                            {tx.category.name}
                                                        </span>
                                                    </td>
                                                    <td className={`px-4 py-3 text-right font-bold ${tx.category.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {tx.category.type === 'income' ? '+' : '-'}{currencySymbol}{parseFloat(tx.amount).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                            {recentTransactions.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="px-4 py-8 text-center text-slate-500">No recent transactions</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Budget Status */}
                        {loading ? (
                            <TableSkeleton />
                        ) : (
                            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Budget Tracking</h3>
                                <div className="space-y-6">
                                    {budgets.map((budget, index) => (
                                        <BudgetProgress 
                                            key={index}
                                            category={budget.category}
                                            spent={parseFloat(budget.spent)}
                                            limit={parseFloat(budget.limit)}
                                            percentage={budget.percentage}
                                        />
                                    ))}
                                    {budgets.length === 0 && (
                                        <p className="text-center py-8 text-slate-500 italic">No budgets set for this month.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
