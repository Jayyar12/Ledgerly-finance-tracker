import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Wallet, User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 selection:text-emerald-400 font-sans antialiased flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Create Your Account | Ledgerly" />

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Branding & Return to Home */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 group" title="Return to Home">
                        <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">Ledgerly</span>
                    </Link>
                    <h2 className="mt-8 text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-slate-400 mt-2 text-sm">Start your journey to financial freedom.</p>
                </div>

                {/* Glassmorphic Registration Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700" />
                    
                    <form onSubmit={submit} className="space-y-5 relative z-10">
                        <div>
                            <InputLabel htmlFor="name" value="Full Name" className="text-slate-300 ml-1 mb-2 font-bold text-xs uppercase tracking-widest" />
                            <div className="relative group/input">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full pl-12 bg-slate-900/50 border-white/10 text-white focus:border-emerald-500 focus:ring-emerald-500/20 rounded-2xl transition-all"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <InputError message={errors.name} className="mt-2 ml-1" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email Address" className="text-slate-300 ml-1 mb-2 font-bold text-xs uppercase tracking-widest" />
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full pl-12 bg-slate-900/50 border-white/10 text-white focus:border-emerald-500 focus:ring-emerald-500/20 rounded-2xl transition-all"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2 ml-1" />
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <InputLabel htmlFor="password" value="Password" className="text-slate-300 ml-1 mb-2 font-bold text-xs uppercase tracking-widest" />
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full pl-12 bg-slate-900/50 border-white/10 text-white focus:border-emerald-500 focus:ring-emerald-500/20 rounded-2xl transition-all"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <InputError message={errors.password} className="mt-2 ml-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-slate-300 ml-1 mb-2 font-bold text-xs uppercase tracking-widest" />
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="block w-full pl-12 bg-slate-900/50 border-white/10 text-white focus:border-emerald-500 focus:ring-emerald-500/20 rounded-2xl transition-all"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-2 ml-1" />
                            </div>
                        </div>

                        <PrimaryButton 
                            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl flex justify-center items-center gap-2 text-lg shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] mt-4" 
                            disabled={processing}
                        >
                            Create Account
                            <ArrowRight className="w-5 h-5" />
                        </PrimaryButton>
                    </form>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                        >
                            Sign In instead
                        </Link>
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </div>
    );
}
