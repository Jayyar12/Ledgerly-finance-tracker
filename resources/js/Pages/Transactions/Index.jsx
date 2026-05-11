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
import { Plus, Filter, Trash2, Edit2, Search } from 'lucide-react';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export default function Index({ auth, transactions, categories, filters }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const [editingTransaction, setEditingTransaction] = useState(null);

    // Search & Filters State
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [type, setType] = useState(filters.type || '');

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
                <PrimaryButton onClick={openCreateModal} className="flex gap-2">
                    <Plus className="w-4 h-4" /> Add Transaction
                </PrimaryButton>
            </div>
            <Head title="Transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Filters Bar */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <TextInput 
                                className="pl-10 w-full" 
                                placeholder="Search descriptions..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div>
                            <select
                                className="w-full border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div>
                            <select
                                className="w-full border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
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

                    <div className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm sm:rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="p-6">
                            {/* Table */}
                            <div className="overflow-x-auto">
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
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
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
                                                    {tx.category.type === 'income' ? '+' : '-'}{auth.user.currency === 'PHP' ? '₱' : '$'}{parseFloat(tx.amount).toLocaleString()}
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
                                    </tbody>
                                </table>
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
