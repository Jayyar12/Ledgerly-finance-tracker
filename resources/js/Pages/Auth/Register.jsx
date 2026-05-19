import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Wallet, User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
    const { errors: pageErrors } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const emailError = errors.email || pageErrors.email;

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
                            <InputError message={emailError} className="mt-2 ml-1" />
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

                    {/* Google OAuth Divider & Button */}
                    <div className="mt-6 relative z-10">
                        <div className="relative flex justify-center text-xs uppercase my-6">
                            <span className="bg-slate-950 px-3 py-1 text-[10px] text-slate-400 font-black tracking-widest rounded-full border border-white/5">Or continue with</span>
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
