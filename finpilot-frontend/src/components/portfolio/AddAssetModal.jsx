import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function AddAssetModal({
    open,
    onClose,
    onSave,
    asset,
}) {

    const initialFormData = {
        assetSymbol: "",
        assetName: "",
        assetType: "STOCK",
        quantity: "",
        purchasePrice: "",
        purchaseDate: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        if (!open) {
            return;
        }

        setSaving(false);

        if (asset) {

            setFormData({
                assetSymbol: asset.assetSymbol,
                assetName: asset.assetName,
                assetType: asset.assetType,
                quantity: asset.quantity,
                purchasePrice: asset.purchasePrice,
                purchaseDate: asset.purchaseDate,
            });

        } else {

            setFormData(initialFormData);

        }

    }, [open, asset]);

    if (!open) {
        return null;
    }

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setSaving(true);

        try {

            await onSave(formData);

            toast.success(
                asset
                    ? "Asset updated successfully."
                    : "Asset added successfully."
            );

            setFormData(initialFormData);

            onClose();

        } catch (error) {

            console.error(error);

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to save asset.";

            toast.error(message);

        } finally {

            setSaving(false);

        }

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold">
                        {asset ? "Edit Asset" : "Add Asset"}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="text-2xl font-bold text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="assetSymbol"
                        placeholder="Asset Symbol"
                        value={formData.assetSymbol}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full rounded-lg border p-3 disabled:bg-gray-100"
                        required
                    />

                    <input
                        type="text"
                        name="assetName"
                        placeholder="Asset Name"
                        value={formData.assetName}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full rounded-lg border p-3 disabled:bg-gray-100"
                        required
                    />

                    <select
                        name="assetType"
                        value={formData.assetType}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full rounded-lg border p-3 disabled:bg-gray-100"
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

                    <input
                        type="number"
                        step="0.0001"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full rounded-lg border p-3 disabled:bg-gray-100"
                        required
                    />

                    <input
                        type="number"
                        step="0.0001"
                        name="purchasePrice"
                        placeholder="Purchase Price"
                        value={formData.purchasePrice}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full rounded-lg border p-3 disabled:bg-gray-100"
                        required
                    />

                    <input
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        disabled={saving}
                        className="w-full rounded-lg border p-3 disabled:bg-gray-100"
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {saving
                                ? (asset ? "Updating Asset..." : "Saving Asset...")
                                : (asset ? "Update Asset" : "Save Asset")}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default AddAssetModal;