import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function AddWatchlistModal({
    open,
    onClose,
    onSave,
}) {

    const initialForm = {
        assetSymbol: "",
        assetName: "",
        assetType: "STOCK",
        exchange: "NASDAQ",
    };

    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            setFormData(initialForm);
            setLoading(false);

        }

    }, [open]);

    if (!open) {
        return null;
    }

    function handleChange(e) {

        const { name, value } = e.target;

        if (name === "assetType") {

            setFormData(prev => ({

                ...prev,

                assetType: value,

                exchange:
                    value === "MUTUAL_FUND"
                        ? "MF"
                        : "NASDAQ",

            }));

            return;

        }

        setFormData(prev => ({

            ...prev,

            [name]: value,

        }));

    }

    const exchangeOptions = [
        "NASDAQ",
        "NYSE",
        "NSE",
        "BSE",
    ];

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

                ...formData,

                assetSymbol:
                    formData.assetSymbol
                        .trim()
                        .toUpperCase(),

                assetName:
                    formData.assetName
                        .trim(),

                exchange:
                    formData.assetType === "MUTUAL_FUND"
                        ? "MF"
                        : formData.exchange,

            });

            toast.success(
                "Asset added to watchlist."
            );

            onClose();

        } catch (error) {

            const fieldErrors =
                error?.response?.data?.fieldErrors;

            if (fieldErrors) {

                toast.error(
                    Object.values(fieldErrors)[0]
                );

            } else {

                toast.error(

                    error?.response?.data?.message ||

                    "Failed to add asset."

                );

            }

        } finally {

            setLoading(false);

        }

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
                            placeholder="e.g. TCS or AAPL"
                            disabled={loading}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
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
                            placeholder="e.g. Apple Inc."
                            disabled={loading}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
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
                            disabled={loading}
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

                    {formData.assetType !== "MUTUAL_FUND" && (

                        <div>

                            <label className="mb-2 block text-sm font-medium">

                                Exchange

                            </label>

                            <select
                                name="exchange"
                                value={formData.exchange}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                            >

                                {exchangeOptions.map(exchange => (

                                    <option
                                        key={exchange}
                                        value={exchange}
                                    >

                                        {exchange}

                                    </option>

                                ))}

                            </select>

                        </div>

                    )}

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
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
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