import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { Plus, Trash2, Edit2, Tag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_COLORS = [
    '#10B981', // Emerald
    '#F43F5E', // Rose
    '#3B82F6', // Blue
    '#F59E0B', // Amber
    '#8B5CF6', // Violet
    '#06B6D4', // Cyan
    '#6366F1', // Indigo
    '#64748B', // Slate
    '#EC4899', // Pink
];

export default function Index({ categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmingDeletion, setIsConfirmingDeletion] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        type: 'expense',
        color: '#10B981',
    });

    const openCreateModal = () => {
        reset();
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditingCategory(cat);
        setData({
            name: cat.name,
            type: cat.type,
            color: cat.color || '#10B981',
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route('categories.update', editingCategory.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const confirmDeletion = (cat) => {
        setCategoryToDelete(cat);
        setIsConfirmingDeletion(true);
    };

    const deleteCategory = () => {
        destroy(route('categories.destroy', categoryToDelete.id), {
            onSuccess: () => {
                setIsConfirmingDeletion(false);
                setCategoryToDelete(null);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Categories" />

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold leading-tight text-slate-800 dark:text-slate-100">
                    Categories
                </h2>
                <PrimaryButton onClick={openCreateModal} className="flex gap-2">
                    <Plus className="w-4 h-4" /> Add Category
                </PrimaryButton>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={categories.current_page}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]"
                        >
                            {categories.data.map((cat) => (
                                <div key={cat.id} className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div 
                                            className="p-3 rounded-xl"
                                            style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                                        >
                                            <Tag className="w-5 h-5" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal(cat)} className="text-slate-400 hover:text-emerald-500 transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => confirmDeletion(cat)} className="text-slate-400 hover:text-rose-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">{cat.name}</h3>
                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">
                                        {cat.type}
                                    </p>
                                </div>
                            ))}
                            {categories.data.length === 0 && (
                                <div className="col-span-full py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                    <p className="text-slate-500">No categories found. Create one to get started!</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination */}
                    {categories.links.length > 3 && (
                        <div className="mt-12 flex justify-center gap-2">
                            {categories.links.map((link, i) => (
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
                        {editingCategory ? 'Edit Category' : 'Create Category'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="name" value="Category Name" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="mt-2 text-sm text-rose-500">{errors.name}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="type" value="Type" />
                            <select
                                id="type"
                                className="mt-1 block w-full border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                required
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                            {errors.type && <p className="mt-2 text-sm text-rose-500">{errors.type}</p>}
                        </div>

                        <div>
                            <InputLabel value="Category Color" />
                            <div className="mt-2 flex flex-wrap gap-3">
                                {PRESET_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className="w-8 h-8 rounded-full border-2 border-transparent transition-all hover:scale-110 flex items-center justify-center"
                                        style={{ backgroundColor: color }}
                                        onClick={() => setData('color', color)}
                                    >
                                        {data.color === color && (
                                            <Check className="w-4 h-4 text-white" />
                                        )}
                                    </button>
                                ))}
                                {/* Custom Color Trigger */}
                                <div className="flex items-center gap-2">
                                    <div className="relative group">
                                        <input
                                            type="color"
                                            className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 p-0 overflow-hidden cursor-pointer bg-transparent"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Custom</span>
                                </div>
                            </div>
                            {errors.color && <p className="mt-2 text-sm text-rose-500">{errors.color}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {editingCategory ? 'Save Changes' : 'Create Category'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Custom Confirmation Modal */}
            <ConfirmationModal 
                show={isConfirmingDeletion}
                onClose={() => setIsConfirmingDeletion(false)}
                onConfirm={deleteCategory}
                title="Delete Category"
                message="Are you sure you want to delete this category? All related transactions will remain but the category link will be lost."
                processing={processing}
            />
        </AuthenticatedLayout>
    );
}
