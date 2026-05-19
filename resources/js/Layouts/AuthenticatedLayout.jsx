import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
    LayoutDashboard,
    ArrowLeftRight,
    Tag,
    Target,
    User,
    LogOut,
    ChevronDown,
    Wallet,
    Settings,
    HelpCircle,
    Info,
    BookOpen,
    Download,
    Menu,
    X
} from 'lucide-react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { AnimatePresence } from 'framer-motion';
import PageWrapper from '@/Components/PageWrapper';

export default function AuthenticatedLayout({ children }) {
    const { auth, flash, header, url } = usePage().props;
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const user = auth.user;

    useEffect(() => {
        if (flash.message) {
            toast.success(flash.message, {
                position: 'top-right',
                duration: 4000,
                style: {
                    background: '#10B981',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                },
            });
        }
    }, [flash.message]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative">
            {/* Backdrop for mobile drawer */}
            {isMobileSidebarOpen && (
                <div
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                />
            )}

            {/* Sidebar remains stable */}
            <aside className={`w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed top-0 bottom-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${
                isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                {/* Logo Section */}
                <div className="p-8 flex items-center gap-3">
                    <Link href={route('dashboard')} onClick={() => setIsMobileSidebarOpen(false)}>
                        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">Ledgerly</h1>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Finance Tracker</p>
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-6 space-y-2 mt-4">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        icon={LayoutDashboard}
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route('transactions.index')}
                        active={route().current('transactions.index')}
                        icon={ArrowLeftRight}
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        Transactions
                    </NavLink>
                    <NavLink
                        href={route('categories.index')}
                        active={route().current('categories.index')}
                        icon={Tag}
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        href={route('budgets.index')}
                        active={route().current('budgets.index')}
                        icon={Target}
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        Budgets
                    </NavLink>
                </nav>

                {/* Help Toggle */}
                <div className="px-6 mb-6">
                    <button
                        onClick={() => {
                            setIsHelpModalOpen(true);
                            setIsMobileSidebarOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-500/20 transition-all duration-200 group"
                    >
                        <HelpCircle className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        <span className="text-xs font-bold uppercase tracking-widest">Built-in Manual</span>
                    </button>
                </div>
            </aside>

            {/* Help Modal */}
            <Modal show={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} maxWidth="2xl">
                <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden relative">
                    <div className="absolute -right-10 -top-10 text-emerald-500/5">
                        <Wallet size={200} />
                    </div>

                    <div className="relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl text-emerald-600 dark:text-emerald-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Quick Guide</h2>
                                <p className="text-sm text-slate-500">Master your personal finances in minutes.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ArrowLeftRight className="w-4 h-4 text-emerald-500" />
                                        <h3 className="font-bold text-slate-800 dark:text-white">Transactions</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Add every income and expense. Use the <strong>Searchable Select</strong> to quickly find categories.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag className="w-4 h-4 text-emerald-500" />
                                        <h3 className="font-bold text-slate-800 dark:text-white">Categories</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Organize your money. Assign colors to categories for better visual tracking.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-emerald-500" />
                                        <h3 className="font-bold text-slate-800 dark:text-white">Budgets</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Set spending limits for expense categories and track your runway.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Download className="w-4 h-4 text-emerald-500" />
                                        <h3 className="font-bold text-slate-800 dark:text-white">Reports</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        Export professional PDF summaries of your monthly finances.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                <Info className="w-3 h-3" />
                                Data is encrypted & private
                            </div>
                            <SecondaryButton onClick={() => setIsHelpModalOpen(false)}>
                                Got it, thanks!
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Main Content Area */}
            <div className="flex-1 ml-0 lg:ml-72 flex flex-col min-h-screen relative">
                {/* Global Top Header - Fixed and Persistent */}
                <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 w-full">
                    <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between min-h-[73px]">
                        
                        {/* Mobile Layout (Visible only on < lg) */}
                        <div className="flex items-center justify-between w-full lg:hidden">
                            {/* Left: Hamburger menu & Logo aligned side-by-side */}
                            <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                    onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                                    className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 transition-all focus:outline-none"
                                    aria-label="Toggle Menu"
                                >
                                    {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                                
                                <Link href={route('dashboard')} className="flex items-center gap-2 ml-1">
                                    <div className="bg-emerald-500 p-1.5 rounded-lg shadow-md shadow-emerald-500/20">
                                        <Wallet className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-bold text-sm text-slate-800 dark:text-white leading-tight">Ledgerly</span>
                                </Link>
                            </div>

                            {/* Right: User avatar dropdown */}
                            <div>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center p-1 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                                            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-900 group-hover:ring-emerald-500 transition-all">
                                                {user.name.charAt(0)}
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="48" contentClasses="py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-2xl">
                                        <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-700">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Account Info</p>
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{user.email}</p>
                                        </div>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-2 py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group/item"
                                        >
                                            <Settings className="w-4 h-4 text-slate-400 group-hover/item:text-emerald-500 group-hover/item:rotate-45 transition-all" />
                                            <span className="font-medium text-slate-600 dark:text-slate-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white">Profile Settings</span>
                                        </Dropdown.Link>
                                        <div className="border-t border-slate-50 dark:border-slate-700"></div>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-2 py-3 px-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200 group/logout w-full"
                                        >
                                            <LogOut className="w-4 h-4 group-hover/logout:-translate-x-1 transition-transform" />
                                            <span className="font-bold">Log Out</span>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Desktop Layout (Visible only on lg and above) */}
                        <div className="hidden lg:flex items-center justify-between w-full">
                            <div id="page-header" className="flex-1" />
                            <div className="ml-6 pl-6 border-l border-slate-100 dark:border-slate-800">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                                            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-900 group-hover:ring-emerald-500 transition-all">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-0.5">{user.name}</p>
                                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-tight">Free Account</p>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="48" contentClasses="py-1 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-2xl">
                                        <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-700">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Account Info</p>
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{user.email}</p>
                                        </div>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-2 py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group/item"
                                        >
                                            <Settings className="w-4 h-4 text-slate-400 group-hover/item:text-emerald-500 group-hover/item:rotate-45 transition-all" />
                                            <span className="font-medium text-slate-600 dark:text-slate-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white">Profile Settings</span>
                                        </Dropdown.Link>
                                        <div className="border-t border-slate-50 dark:border-slate-700"></div>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-2 py-3 px-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200 group/logout w-full"
                                        >
                                            <LogOut className="w-4 h-4 group-hover/logout:-translate-x-1 transition-transform" />
                                            <span className="font-bold">Log Out</span>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    <div className="mx-auto max-w-7xl min-h-[70vh]">
                        <AnimatePresence mode="wait">
                            <PageWrapper key={usePage().component}>
                                {children}
                            </PageWrapper>
                        </AnimatePresence>
                    </div>
                </main>

                <footer className="py-6 px-8 text-center text-slate-400 text-xs mt-auto border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                    &copy; {new Date().getFullYear()} Ledgerly Finance. All rights reserved.
                </footer>
            </div>

            <Toaster />
        </div>
    );
}
