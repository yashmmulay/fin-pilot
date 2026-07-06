import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function AddWatchlistModal({
    open,
    onClose,
    onSave,
}) {

    const [formData, setFormData] = useState({
        assetSymbol: "",
        assetName: "",
        assetType: "STOCK",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            setFormData({
                assetSymbol: "",
                assetName: "",
                assetType: "STOCK",
            });

        }

    }, [open]);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!formData.assetSymbol.trim()) {
            toast.error("Asset symbol is required.");
            return;
        }

        if (!formData.assetName.trim()) {
            toast.error("Asset name is required.");
            return;
        }

        setLoading(true);

        try {

            await onSave({
                assetSymbol: formData.assetSymbol.trim().toUpperCase(),
                assetName: formData.assetName.trim(),
                assetType: formData.assetType,
            });

            toast.success("Asset added to watchlist.");

            onClose();

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                "Failed to add asset.";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    }

    if (!open) {
        return null;
    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="border-b px-6 py-4">

                    <h2 className="text-2xl font-bold">

                        Add Asset to Watchlist

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Track an investment without adding it to your portfolio.

                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Asset Symbol

                        </label>

                        <input
                            type="text"
                            name="assetSymbol"
                            value={formData.assetSymbol}
                            onChange={handleChange}
                            placeholder="e.g. TCS"
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Asset Name

                        </label>

                        <input
                            type="text"
                            name="assetName"
                            value={formData.assetName}
                            onChange={handleChange}
                            placeholder="e.g. Tata Consultancy Services"
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium">

                            Asset Type

                        </label>

                        <select
                            name="assetType"
                            value={formData.assetType}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >

                            <option value="STOCK">
                                Stock
                            </option>

                            <option value="ETF">
                                ETF
                            </option>

                            <option value="MUTUAL_FUND">
                                Mutual Fund
                            </option>

                        </select>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg border px-5 py-2.5 font-medium hover:bg-gray-100"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >

                            {loading
                                ? "Adding..."
                                : "Add Asset"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddWatchlistModal;