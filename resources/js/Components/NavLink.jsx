import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    icon: Icon,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out ' +
                (active
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200') +
                ' ' + className
            }
        >
            {Icon && (
                <Icon
                    className={`w-5 h-5 mr-3 transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                        }`}
                />
            )}
            {children}
        </Link>
    );
}
