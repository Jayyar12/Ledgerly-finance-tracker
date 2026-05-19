import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Wallet, Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { errors: pageErrors } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const emailError = errors.email || pageErrors.email;

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
                            <InputError message={emailError} className="mt-2 ml-1" />
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

                    {/* Google OAuth Divider & Button */}
                    <div className="mt-6 relative z-10">
                        <div className="relative flex justify-center text-xs uppercase my-6">
                            <span className="bg-slate-900 px-3 py-1 text-[10px] text-slate-400 font-black tracking-widest rounded-full border border-white/5">Or continue with</span>
                        </div>

                        <a
                            href={route('auth.google')}
                            className="w-full flex items-center justify-center gap-2.5 py-4 border border-white/10 rounded-2xl hover:bg-white/5 text-slate-200 font-bold transition-all duration-300 active:scale-[0.98] shadow-lg"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#EA4335"
                                    d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.58 14.99 1 12 1 7.35 1 3.37 3.68 1.39 7.56l3.89 3.02C6.22 7.57 8.89 5.04 12 5.04z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.75-4.88 3.75-8.49z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.28 14.42c-.24-.73-.38-1.51-.38-2.32s.14-1.59.38-2.32L1.39 6.76C.5 8.54 0 10.51 0 12.5s.5 3.96 1.39 5.74l3.89-3.82z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.68-2.3 1.09-4.3 1.09-3.11 0-5.78-2.53-6.72-6.02L1.39 15.34C3.37 19.32 7.35 22 12 22z"
                                />
                            </svg>
                            <span className="text-sm tracking-wide">Continue with Google</span>
                        </a>
                    </div>
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
