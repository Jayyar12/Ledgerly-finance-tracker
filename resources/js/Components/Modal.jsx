import { Dialog, DialogPanel } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <AnimatePresence>
            {show && (
                <Dialog
                    static
                    open={show}
                    as="div"
                    id="modal"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0"
                    onClose={close}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm"
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ 
                            type: 'spring',
                            damping: 30,
                            stiffness: 500,
                            mass: 0.8
                        }}
                        className={`relative z-10 mb-6 w-full transform overflow-hidden rounded-[2rem] bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 sm:mx-auto will-change-transform will-change-opacity ${maxWidthClass}`}
                    >
                        <DialogPanel>
                            {children}
                        </DialogPanel>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
