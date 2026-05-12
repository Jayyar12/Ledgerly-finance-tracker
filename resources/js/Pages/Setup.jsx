import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Wallet, 
    Globe, 
    CheckCircle2, 
    ArrowRight, 
    ArrowLeft,
    Check,
    Briefcase,
    ShoppingCart,
    Home,
    Utensils,
    Car,
    Smartphone,
    HeartPulse,
    Music,
    Coins
} from 'lucide-react';

const DEFAULT_CATEGORIES = [
    { name: 'Salary', type: 'income', color: '#10B981', icon: Briefcase },
    { name: 'Freelance', type: 'income', color: '#3B82F6', icon: Globe },
    { name: 'Food & Drinks', type: 'expense', color: '#EF4444', icon: Utensils },
    { name: 'Groceries', type: 'expense', color: '#F59E0B', icon: ShoppingCart },
    { name: 'Rent & Bills', type: 'expense', color: '#6366F1', icon: Home },
    { name: 'Transport', type: 'expense', color: '#8B5CF6', icon: Car },
    { name: 'Shopping', type: 'expense', color: '#EC4899', icon: Smartphone },
    { name: 'Entertainment', type: 'expense', color: '#F43F5E', icon: Music },
    { name: 'Healthcare', type: 'expense', color: '#06B6D4', icon: HeartPulse },
    { name: 'Other', type: 'expense', color: '#64748B', icon: Coins },
];

export default function Setup() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing } = useForm({
        currency: 'USD',
        initial_balance: '',
        categories: DEFAULT_CATEGORIES,
    });

    const toggleCategory = (cat) => {
        const isSelected = data.categories.some(c => c.name === cat.name);
        if (isSelected) {
            setData('categories', data.categories.filter(c => c.name !== cat.name));
        } else {
            setData('categories', [...data.categories, cat]);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const submit = (e) => {
        e.preventDefault();
        post(route('setup.update'));
    };

    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 selection:bg-emerald-500/30 overflow-hidden relative">
            <Head title="Account Setup" />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-2xl relative">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-12">
                    {[1, 2, 3].map((s) => (
                        <div 
                            key={s} 
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                s <= step ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-800'
                            }`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            <div className="text-center space-y-3">
                                <motion.div 
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20"
                                >
                                    <Globe className="w-8 h-8 text-emerald-500" />
                                </motion.div>
                                <h1 className="text-4xl font-black text-white tracking-tight">Choose your Currency</h1>
                                <p className="text-slate-400 max-w-md mx-auto">This will be the base currency for all your transactions and financial reports.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { id: 'USD', label: 'US Dollar', symbol: '$', desc: 'Global standard for international transactions' },
                                    { id: 'PHP', label: 'Philippine Peso', symbol: '₱', desc: 'Ideal for local tracking in the Philippines' }
                                ].map((curr) => (
                                    <button
                                        key={curr.id}
                                        onClick={() => setData('currency', curr.id)}
                                        className={`p-8 rounded-[2.5rem] border-2 text-left transition-all duration-300 group relative overflow-hidden ${
                                            data.currency === curr.id 
                                                ? 'border-emerald-500 bg-emerald-500/10' 
                                                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="relative z-10">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                                                data.currency === curr.id ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                                            }`}>
                                                <span className="text-xl font-bold">{curr.symbol}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{curr.label}</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed">{curr.desc}</p>
                                        </div>
                                        {data.currency === curr.id && (
                                            <motion.div 
                                                layoutId="active-curr"
                                                className="absolute top-6 right-6 text-emerald-500"
                                            >
                                                <CheckCircle2 className="w-6 h-6" />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-6">
                                <button 
                                    onClick={nextStep}
                                    className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    Next Step <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            <div className="text-center space-y-3">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                                    <Wallet className="w-8 h-8 text-blue-500" />
                                </div>
                                <h1 className="text-4xl font-black text-white tracking-tight">Set Starting Balance</h1>
                                <p className="text-slate-400 max-w-md mx-auto">How much money do you currently have? We'll use this to calibrate your accounts.</p>
                            </div>

                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-600 group-focus-within:text-emerald-500 transition-colors">
                                    {data.currency === 'PHP' ? '₱' : '$'}
                                </div>
                                <input 
                                    autoFocus
                                    type="number"
                                    placeholder="0.00"
                                    value={data.initial_balance}
                                    onChange={(e) => setData('initial_balance', e.target.value)}
                                    className="w-full bg-slate-900 border-2 border-slate-800 rounded-3xl p-8 pl-14 text-4xl font-black text-white focus:border-emerald-500 focus:ring-0 transition-all placeholder:text-slate-800"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={prevStep}
                                    className="py-4 bg-slate-900 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:text-white border border-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button 
                                    onClick={nextStep}
                                    className="py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 group"
                                >
                                    Continue <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                            
                            <button 
                                onClick={() => { setData('initial_balance', '0'); nextStep(); }}
                                className="w-full text-sm text-slate-500 font-bold hover:text-slate-300 transition-colors text-center"
                            >
                                I'll set this up later
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="space-y-8"
                        >
                            <div className="text-center space-y-3">
                                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
                                    <Briefcase className="w-8 h-8 text-purple-500" />
                                </div>
                                <h1 className="text-4xl font-black text-white tracking-tight">Quick Categories</h1>
                                <p className="text-slate-400 max-w-md mx-auto">Select the categories you want to start with. Most people find these essential.</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {DEFAULT_CATEGORIES.map((cat) => {
                                    const isSelected = data.categories.some(c => c.name === cat.name);
                                    const Icon = cat.icon;
                                    return (
                                        <button
                                            key={cat.name}
                                            onClick={() => toggleCategory(cat)}
                                            className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-3 relative ${
                                                isSelected 
                                                    ? 'bg-slate-800/80 border-emerald-500/50' 
                                                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                                            }`}
                                        >
                                            <div 
                                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                                                {cat.name}
                                            </span>
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={prevStep}
                                    className="py-4 bg-slate-900 text-slate-400 rounded-2xl font-black uppercase tracking-widest hover:text-white border border-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button 
                                    onClick={submit}
                                    disabled={processing}
                                    className="py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Finish Setup'} <Check className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Ledgerly Finance &bull; Secure Setup</p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e293b;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #334155;
                }
            `}} />
        </div>
    );
}
