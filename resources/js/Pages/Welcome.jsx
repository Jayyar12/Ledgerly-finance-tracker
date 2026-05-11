import { Head, Link } from '@inertiajs/react';
import { useRef } from 'react';
import {
    Wallet,
    ArrowUpRight,
    Target,
    Tag,
    FileText,
    ChevronRight,
    ChevronLeft,
    ArrowRight
} from 'lucide-react';

export default function Welcome({ auth }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = current.offsetWidth * 0.8; // Scroll by 80% of container width
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 selection:text-emerald-400 font-sans antialiased">
            <Head title="Master Your Finances" />

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-[100px]" />
                <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[150px]" />
            </div>

            {/* Navbar - Now Sticky */}
            <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                    <button 
                        onClick={scrollToTop}
                        className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
                    >
                        <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Ledgerly</span>
                    </button>

                    <div className="flex items-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-5 py-2.5 bg-white text-slate-950 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10">
                <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            NOW WITH REAL-TIME ANALYTICS
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                            Master Your Finances <br />
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                with Ledgerly.
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-400 mb-12 leading-relaxed">
                            The simple, secure way to track expenses and manage your budget.
                            Take control of your money with our professional-grade tracker.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="group px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2"
                            >
                                {auth.user ? 'Go to Dashboard' : 'Get Started Free'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#features"
                                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                            >
                                See Features
                            </a>
                        </div>

                        {/* Hero Image / Dashboard Preview */}
                        <div className="mt-20 relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full -z-10" />
                            <div className="rounded-[2.5rem] p-2 bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group">
                                <img
                                    src="/images/dashboard-page.png"
                                    alt="Ledgerly Dashboard"
                                    className="rounded-[2rem] w-full shadow-2xl group-hover:scale-[1.01] transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-6 bg-slate-900/50 relative overflow-hidden">
                    {/* Background Decorative Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none">
                        LEDGERLY
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">Built for Financial Excellence</h2>
                            <p className="text-slate-400">Everything you need to stay on top of your money.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard
                                icon={<ArrowUpRight className="w-6 h-6" />}
                                title="Smart Tracking"
                                description="Log every income and expense with our intuitive interface. Search categories in real-time."
                                color="emerald"
                                image="/images/transaction-page.png"
                            />
                            <FeatureCard
                                icon={<Target className="w-6 h-6" />}
                                title="Budget Control"
                                description="Set monthly spending limits and track your progress with beautiful visual indicators."
                                color="blue"
                                image="/images/budget-page.png"
                            />
                            <FeatureCard
                                icon={<Tag className="w-6 h-6" />}
                                title="Custom Categories"
                                description="Organize your finances exactly how you want with custom labels, types, and vibrant colors."
                                color="purple"
                                image="/images/category-page.png"
                            />
                            <FeatureCard
                                icon={<FileText className="w-6 h-6" />}
                                title="PDF Reporting"
                                description="Export professional monthly summaries of your financial health in just one click."
                                color="rose"
                                image="/images/finance-report.png"
                            />
                        </div>
                    </div>
                </section>

                {/* Interface Showcase - Horizontal Scroll Gallery */}
                <section className="py-24 border-t border-white/5 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Experience the <span className="text-emerald-500">Interface.</span></h2>
                            <p className="text-slate-400">Glide through the seamless Ledgerly experience.</p>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            Shift + Scroll to explore
                        </div>
                    </div>

                    {/* Horizontal Scroll Gallery Wrapper */}
                    <div className="relative group/gallery max-w-7xl mx-auto px-6">
                        {/* Navigation Buttons - Floating on Sides */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 -ml-4 lg:-ml-12">
                            <button 
                                onClick={() => scroll('left')}
                                className="p-5 bg-slate-900/80 border border-white/10 rounded-full hover:bg-emerald-500 hover:border-emerald-400 transition-all shadow-2xl backdrop-blur-xl group/btn"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                            </button>
                        </div>

                        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 -mr-4 lg:-mr-12">
                            <button 
                                onClick={() => scroll('right')}
                                className="p-5 bg-slate-900/80 border border-white/10 rounded-full hover:bg-emerald-500 hover:border-emerald-400 transition-all shadow-2xl backdrop-blur-xl group/btn"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Horizontal Scroll Container */}
                        <div 
                            ref={scrollRef}
                            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 pb-12 scroll-smooth"
                        >
                            <GalleryCard 
                                image="/images/dashboard-page.png" 
                                title="Command Center" 
                                subtitle="Dashboard" 
                            />
                            <GalleryCard 
                                image="/images/transaction-page.png" 
                                title="Fluid Ledger" 
                                subtitle="Transactions" 
                            />
                            <GalleryCard 
                                image="/images/category-page.png" 
                                title="Smart Organization" 
                                subtitle="Categories" 
                            />
                            <GalleryCard 
                                image="/images/budget-page.png" 
                                title="Visual Control" 
                                subtitle="Budgets" 
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="bg-emerald-500/20 p-1.5 rounded-lg">
                            <Wallet className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="font-bold">Ledgerly</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">&copy; {new Date().getFullYear()} Ledgerly Finance. Built for UI/UX Excellence.</p>
                    <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-600">
                        <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
                        <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
}

function GalleryCard({ image, title, subtitle }) {
    return (
        <div className="snap-center shrink-0 w-[85vw] lg:w-[800px] group">
            <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">{subtitle}</span>
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <div className="rounded-[2rem] p-2 bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl transition-all duration-700 group-hover:scale-[1.01] group-hover:border-white/20">
                <img src={image} alt={title} className="rounded-[1.5rem] w-full" />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description, color, image }) {
    const colors = {
        emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5',
        blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5',
        purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
        rose: 'text-rose-500 bg-rose-500/10 border-rose-500/20 shadow-rose-500/5',
    };

    return (
        <div className="group relative">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 h-full flex flex-col">
                <div className={`p-4 rounded-2xl inline-flex mb-6 border shadow-xl ${colors[color]} group-hover:scale-110 transition-transform duration-500`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {description}
                </p>

                {image && (
                    <div className="mt-auto pt-4 relative">
                        <div className="rounded-xl overflow-hidden border border-white/5 shadow-2xl group-hover:border-white/20 transition-colors">
                            <img
                                src={image}
                                alt={title}
                                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
