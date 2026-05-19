import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ConfirmationModal from '@/Components/ConfirmationModal';
import SearchableSelect from '@/Components/SearchableSelect';
import { 
    Plus, 
    Filter, 
    Trash2, 
    Edit2, 
    Search,
    ShoppingCart, 
    Droplets, 
    Home, 
    Car, 
    Tv, 
    Activity, 
    TrendingUp, 
    Coffee, 
    Gift, 
    HelpCircle, 
    ChevronDown, 
    Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

const getCategoryIcon = (categoryName) => {
    const name = (categoryName || '').toLowerCase();
    if (name.includes('grocer') || name.includes('food') || name.includes('shop')) return <ShoppingCart className="w-5 h-5" />;
    if (name.includes('water') || name.includes('elect') || name.includes('util') || name.includes('bill')) return <Droplets className="w-5 h-5" />;
    if (name.includes('rent') || name.includes('home') || name.includes('hous')) return <Home className="w-5 h-5" />;
    if (name.includes('car') || name.includes('travel') || name.includes('trans')) return <Car className="w-5 h-5" />;
    if (name.includes('fun') || name.includes('show') || name.includes('play') || name.includes('enter')) return <Tv className="w-5 h-5" />;
    if (name.includes('health') || name.includes('med') || name.includes('fit')) return <Activity className="w-5 h-5" />;
    if (name.includes('sal') || name.includes('inc') || name.includes('earn') || name.includes('job')) return <TrendingUp className="w-5 h-5" />;
    if (name.includes('cafe') || name.includes('coff') || name.includes('rest')) return <Coffee className="w-5 h-5" />;
    if (name.includes('gift') || name.includes('char')) return <Gift className="w-5 h-5" />;
    return <HelpCircle className="w-5 h-5" />;
};

export default function Index({ auth, transactions, categories, filters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [editingTransaction, setEditingTransaction] = useState(null);

    // Search & Filters State
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [type, setType] = useState(filters.type || '');
    const [showFilters, setShowFilters] = useState(false);

    // Group transactions by date
    const groupedTransactions = transactions.data.reduce((acc, tx) => {
        const dateStr = new Date(tx.date).toLocaleDateString(undefined, { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        if (!acc[dateStr]) {
            acc[dateStr] = {
                date: dateStr,
                items: [],
                totalSpent: 0
            };
        }
        acc[dateStr].items.push(tx);
        if (tx.category?.type === 'expense') {
            acc[dateStr].totalSpent += parseFloat(tx.amount);
        }
        return acc;
    }, {});

    const prevSearch = usePrevious(search);

    useEffect(() => {
        if (prevSearch !== search || categoryId !== filters.category_id || type !== filters.type) {
            const timeout = setTimeout(() => {
                router.get(route('transactions.index'), {
                    search,
                    category_id: categoryId,
                    type,
                }, {
                    preserveState: true,
                    replace: true
                });
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [search, categoryId, type]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        category_id: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
    });

    const openCreateModal = () => {
        reset();
        setEditingTransaction(null);
        setIsModalOpen(true);
    };

    const openEditModal = (tx) => {
        setEditingTransaction(tx);
        setData({
            category_id: tx.category_id,
            amount: tx.amount,
            date: tx.date.split('T')[0],
            description: tx.description || '',
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingTransaction) {
            put(route('transactions.update', editingTransaction.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('transactions.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const confirmDeletion = (tx) => {
        setTransactionToDelete(tx);
        setIsConfirmingDeletion(true);
    };

    const deleteTransaction = () => {
        destroy(route('transactions.destroy', transactionToDelete.id), {
            onSuccess: () => {
                setIsConfirmingDeletion(false);
                setTransactionToDelete(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Transactions" />

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold leading-tight text-slate-800 dark:text-slate-100">
                    Transactions
                </h2>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-slate-900 dark:text-slate-900 font-extrabold uppercase text-xs tracking-wider rounded-xl shadow-md shadow-slate-100 dark:shadow-none hover:bg-slate-100 transition-all border border-slate-200"
                >
                    <Plus className="w-4 h-4 text-slate-900" /> Add Transaction
                </button>
            </div>

            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Filters Bar */}
                    <div className="mb-6 flex gap-3 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                            <TextInput
                                className="pl-11 w-full bg-slate-900/40 dark:bg-slate-900/60 border-slate-800 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                                placeholder="Search all descriptions..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-3 bg-slate-900/40 dark:bg-slate-900/60 hover:bg-slate-800/40 border border-slate-800 rounded-xl text-sm font-bold text-slate-200 transition-all select-none flex-shrink-0"
                        >
                            <Filter className="w-4 h-4 text-emerald-400" />
                            <span className="hidden sm:inline">Types & Categories</span>
                            <span className="inline sm:hidden">Filters</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden mb-6"
                            >
                                <div className="p-4 bg-slate-900/40 dark:bg-slate-900/80 border border-slate-800 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Transaction Type</label>
                                        <select
                                            className="w-full border-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl shadow-sm text-sm"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <option value="">All Types</option>
                                            <option value="income">Income</option>
                                            <option value="expense">Expense</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Category</label>
                                        <select
                                            className="w-full border-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl shadow-sm text-sm"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="bg-transparent sm:bg-white dark:sm:bg-slate-800 shadow-none sm:shadow-sm sm:rounded-2xl border-0 sm:border border-slate-100 dark:border-slate-700">
                        <div className="p-0 sm:p-6">
                            {/* Desktop Table View */}
                            <div className="overflow-x-auto min-h-[450px] lg:min-h-[550px] hidden md:block">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4 text-right">Amount</th>
                                            <th className="px-6 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <AnimatePresence mode="wait">
                                        <motion.tbody
                                            key={transactions.current_page}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="divide-y divide-slate-100 dark:divide-slate-700"
                                        >
                                            {transactions.data.map((tx) => (
                                                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                                        {new Date(tx.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">
                                                        {tx.description || <span className="italic opacity-50">No description</span>}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                                                            style={{ backgroundColor: `${tx.category.color}20`, color: tx.category.color }}
                                                        >
                                                            {tx.category.name}
                                                        </span>
                                                    </td>
                                                    <td className={`px-6 py-4 text-right font-bold ${tx.category.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        {tx.category.type === 'income' ? '+' : '-'}{auth.user.currency === 'PHP' ? 'P' : '$'}{parseFloat(tx.amount).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                onClick={() => openEditModal(tx)}
                                                                className="p-1 text-slate-400 hover:text-emerald-500 transition-colors"
                                                            >
                                                                 <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => confirmDeletion(tx)}
                                                                className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {transactions.data.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                        No transactions found.
                                                    </td>
                                                </tr>
                                            )}
                                        </motion.tbody>
                                    </AnimatePresence>
                                </table>
                            </div>

                            {/* Mobile Card List View */}
                            <div className="block md:hidden space-y-6 min-h-[350px]">
                                {Object.values(groupedTransactions).map((group) => (
                                    <div key={group.date} className="space-y-3">
                                        {/* Date Group Header */}
                                        <div className="flex items-center justify-between px-1">
                                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                                                {group.date}
                                            </span>
                                        </div>

                                        {/* Group Transaction Cards */}
                                        <div className="space-y-3">
                                            {group.items.map((tx) => (
                                                <motion.div
                                                    key={tx.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-slate-900/40 dark:bg-slate-900/60 rounded-[1.5rem] border border-slate-800/80 dark:border-slate-800/40 flex flex-col gap-3"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            {/* Category Icon */}
                                                            <div
                                                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                                                style={{ backgroundColor: `${tx.category?.color || '#94a3b8'}15`, color: tx.category?.color || '#94a3b8' }}
                                                            >
                                                                {getCategoryIcon(tx.category?.name)}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <div className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                                                                    {tx.description || <span className="italic opacity-50 font-normal">No description</span>}
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    {tx.category ? (
                                                                        <span
                                                                            className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider"
                                                                            style={{ backgroundColor: `${tx.category.color}20`, color: tx.category.color }}
                                                                        >
                                                                            {tx.category.name}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-[9px] text-slate-400 italic">Uncategorized</span>
                                                                    )}
                                                                    <span className="text-[10px] text-slate-400 font-medium">
                                                                        • {new Date(tx.date).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end flex-shrink-0">
                                                            <div className={`font-black text-sm tracking-tight ${tx.category?.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                                {tx.category?.type === 'income' ? '+' : '-'}{auth.user.currency === 'PHP' ? 'P' : '$'}{parseFloat(tx.amount).toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Card Bottom Row with Daily spent summary and action buttons */}
                                                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-slate-800/40">
                                                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                                            {group.totalSpent > 0 && (
                                                                <span className="text-rose-500/90 font-black">
                                                                    -{auth.user.currency === 'PHP' ? 'P' : '$'}{group.totalSpent.toLocaleString()} <span className="text-slate-400 font-bold">Total Spent</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => openEditModal(tx)}
                                                                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-200 transition-colors flex items-center justify-center"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={() => confirmDeletion(tx)}
                                                                className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {transactions.data.length === 0 && (
                                    <div className="py-12 text-center text-slate-500 italic">
                                        No transactions found.
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {transactions.links.length > 3 && (
                                <div className="mt-6 flex justify-center gap-2">
                                    {transactions.links.map((link, i) => (
                                        <button
                                            key={i}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            onClick={() => router.get(link.url, { search, category_id: categoryId, type }, { preserveState: true })}
                                            disabled={!link.url || link.active}
                                            className={`px-3 py-1 rounded-md text-sm ${link.active ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <form onSubmit={submit} className="p-6 space-y-6">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                        {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="amount" value="Amount" />
                            <TextInput
                                id="amount"
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                required
                            />
                            {errors.amount && <p className="mt-2 text-sm text-rose-500">{errors.amount}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="category" value="Category" />
                            <SearchableSelect
                                options={categories}
                                value={data.category_id}
                                onChange={(val) => setData('category_id', val)}
                                placeholder="Search for a category..."
                                error={errors.category_id}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="date" value="Date" />
                            <TextInput
                                id="date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                required
                            />
                            {errors.date && <p className="mt-2 text-sm text-rose-500">{errors.date}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                className="mt-1 block w-full border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="3"
                            />
                            {errors.description && <p className="mt-2 text-sm text-rose-500">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingTransaction ? 'Save Changes' : 'Create Transaction'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Custom Confirmation Modal */}
            <ConfirmationModal
                show={isConfirmingDeletion}
                onClose={() => setIsConfirmingDeletion(false)}
                onConfirm={deleteTransaction}
                title="Delete Transaction"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
                processing={processing}
            />
        </AuthenticatedLayout>
    );
}
