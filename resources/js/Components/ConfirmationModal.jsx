import Modal from './Modal';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';

export default function ConfirmationModal({ 
    show = false, 
    title = 'Confirm Action', 
    message = 'Are you sure you want to proceed?', 
    onConfirm, 
    onClose, 
    processing = false 
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                    {title}
                </h2>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <SecondaryButton onClick={onClose} disabled={processing}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton onClick={onConfirm} disabled={processing}>
                        Confirm
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}
