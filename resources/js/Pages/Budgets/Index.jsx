import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ConfirmationModal from '@/Components/ConfirmationModal';
import SearchableSelect from '@/Components/SearchableSelect';
import { Plus, Trash2, Edit2, Target } from 'lucide-react';

export default function Index({ auth, budgets, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false);
    const [budgetToDelete, setBudgetToDelete] = useState(null);
    const [editingBudget, setEditingBudget] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        category_id: '',
        amount: '',
        period: 'monthly',
        start_date: new Date().toISOString().split('T')[0],
    });

    const openCreateModal = () => {
        reset();
        setEditingBudget(null);
        setIsModalOpen(true);
    };

    const openEditModal = (budget) => {
        setEditingBudget(budget);
        setData({
            category_id: budget.category_id,
            amount: budget.amount,
            period: budget.period,
            start_date: budget.start_date.split('T')[0],
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingBudget) {
            put(route('budgets.update', editingBudget.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('budgets.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const confirmDeletion = (budget) => {
        setBudgetToDelete(budget);
        setIsConfirmingDeletion(true);
    };

    const deleteBudget = () => {
        destroy(route('budgets.destroy', budgetToDelete.id), {
            onSuccess: () => {
                setIsConfirmingDeletion(false);
                setBudgetToDelete(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Budgets" />

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold leading-tight text-slate-800 dark:text-slate-100">
                    Budgets
                </h2>
                <PrimaryButton onClick={openCreateModal} className="flex gap-2">
                    <Plus className="w-4 h-4" /> Set Budget
                </PrimaryButton>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {budgets.data.map((budget) => (
                            <div key={budget.id} className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
                                <div>
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3 sm:mb-4">
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                            <div 
                                                className="p-2 sm:p-3 rounded-xl flex-shrink-0"
                                                style={{ backgroundColor: `${budget.category.color}20`, color: budget.category.color }}
                                            >
                                                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-sm sm:text-lg font-bold text-slate-800 dark:text-white truncate">{budget.category.name}</h3>
                                                <p className="text-[9px] sm:text-xs text-slate-500 uppercase tracking-widest leading-none mt-0.5">{budget.period}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                                            <button onClick={() => openEditModal(budget)} className="text-slate-400 hover:text-emerald-500 transition-colors p-1">
                                                <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            </button>
                                            <button onClick={() => confirmDeletion(budget)} className="text-slate-400 hover:text-rose-500 transition-colors p-1">
                                                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:mt-4">
                                        <p className="text-[10px] sm:text-sm text-slate-500">Target Amount</p>
                                        <p className="text-base sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5 sm:mt-1">{auth.user.currency === 'PHP' ? '₱' : '$'}{parseFloat(budget.amount).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 sm:pt-4 border-t border-slate-50 dark:border-slate-700/50 flex justify-between text-[9px] sm:text-xs text-slate-500">
                                    <span>Starts: {new Date(budget.start_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                        {budgets.data.length === 0 && (
                            <div className="col-span-full py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-slate-500">No budgets set. Define targets to track your spending!</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {budgets.links.length > 3 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {budgets.links.map((link, i) => (
                                <button
                                    key={i}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    onClick={() => router.get(link.url, {}, { preserveState: true })}
                                    disabled={!link.url || link.active}
                                    className={`px-3 py-1 rounded-md text-sm ${link.active ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <form onSubmit={submit} className="p-6 space-y-6">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                        {editingBudget ? 'Edit Budget' : 'Set Budget'}
                    </h2>

                    <div className="space-y-4">
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
                            <InputLabel htmlFor="amount" value="Target Amount" />
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
                            <InputLabel htmlFor="period" value="Period" />
                            <select
                                id="period"
                                className="mt-1 block w-full border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                value={data.period}
                                onChange={(e) => setData('period', e.target.value)}
                                required
                            >
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                            {errors.period && <p className="mt-2 text-sm text-rose-500">{errors.period}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="start_date" value="Start Date" />
                            <TextInput
                                id="start_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                required
                            />
                            {errors.start_date && <p className="mt-2 text-sm text-rose-500">{errors.start_date}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingBudget ? 'Save Changes' : 'Set Budget'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Custom Confirmation Modal */}
            <ConfirmationModal 
                show={isConfirmingDeletion}
                onClose={() => setIsConfirmingDeletion(false)}
                onConfirm={deleteBudget}
                title="Remove Budget"
                message="Are you sure you want to remove this budget? Your transaction history will not be affected."
                processing={processing}
            />
        </AuthenticatedLayout>
    );
}
