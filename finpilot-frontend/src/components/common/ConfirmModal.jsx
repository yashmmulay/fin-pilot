function ConfirmModal({
    open,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
}) {

    if (!open) {
        return null;
    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">

                <h2 className="text-2xl font-bold">
                    {title}
                </h2>

                <p className="mt-4 text-gray-600">
                    {message}
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:bg-red-400"
                    >
                        {loading
                            ? "Deleting..."
                            : confirmText}
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ConfirmModal;