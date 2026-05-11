import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Wallet, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 selection:text-emerald-400 font-sans antialiased flex items-center justify-center p-6 relative overflow-hidden">
            <Head title="Welcome Back | Ledgerly" />

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Branding */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight">Ledgerly</span>
                    </Link>
                    <h2 className="mt-8 text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-slate-400 mt-2 text-sm">Please enter your details to sign in.</p>
                </div>

                {/* Glassmorphic Login Card */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    {/* Subtle Internal Glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700" />
                    
                    {status && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-sm font-bold text-emerald-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6 relative z-10">
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
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="your@email.com"
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2 ml-1" />
                        </div>

                        <div>
                            <div className="flex justify-between items-center ml-1 mb-2">
                                <InputLabel htmlFor="password" value="Password" className="text-slate-300 font-bold text-xs uppercase tracking-widest" />
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[10px] font-bold text-slate-500 hover:text-emerald-400 uppercase tracking-wider transition-colors"
                                    >
                                        Forgot?
                                    </Link>
                                )}
                            </div>
                            <div className="relative group/input">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-emerald-500 transition-colors" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full pl-12 bg-slate-900/50 border-white/10 text-white focus:border-emerald-500 focus:ring-emerald-500/20 rounded-2xl transition-all"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                            <InputError message={errors.password} className="mt-2 ml-1" />
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center cursor-pointer group/check">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded-lg border-white/10 bg-slate-900 text-emerald-500 focus:ring-emerald-500/20"
                                />
                                <span className="ms-2 text-sm text-slate-400 group-hover/check:text-slate-200 transition-colors">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <PrimaryButton 
                            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl flex justify-center items-center gap-2 text-lg shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]" 
                            disabled={processing}
                        >
                            Log In
                            <ArrowRight className="w-5 h-5" />
                        </PrimaryButton>
                    </form>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 text-sm">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                        >
                            Create one for free
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
