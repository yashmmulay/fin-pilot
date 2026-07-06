import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function AddGoalModal({
    open,
    onClose,
    onSave,
}) {

    const initialForm = {
        goalName: "",
        targetAmount: "",
        targetDate: "",
        priority: "MEDIUM",
    };

    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            setFormData(initialForm);

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

        if (!formData.goalName.trim()) {

            toast.error("Goal name is required.");

            return;

        }

        if (!formData.targetAmount || Number(formData.targetAmount) <= 0) {

            toast.error("Target amount must be greater than zero.");

            return;

        }

        if (!formData.targetDate) {

            toast.error("Target date is required.");

            return;

        }

        if (new Date(formData.targetDate) <= new Date()) {

            toast.error("Target date must be in the future.");

            return;

        }

        setLoading(true);

        try {

            await onSave({

                goalName: formData.goalName.trim(),

                targetAmount: Number(formData.targetAmount),

                targetDate: formData.targetDate,

                priority: formData.priority,

            });

            onClose();

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                "Failed to create goal.";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    }

    if (!open) {

        return null;

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="border-b px-6 py-5">

                    <h2 className="text-2xl font-bold">

                        Create Goal

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Set a financial goal and track your investment progress.

                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label className="mb-2 block font-medium">

                            Goal Name

                        </label>

                        <input
                            type="text"
                            name="goalName"
                            value={formData.goalName}
                            onChange={handleChange}
                            placeholder="Dream House"
                            disabled={loading}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Target Amount

                        </label>

                        <input
                            type="number"
                            name="targetAmount"
                            value={formData.targetAmount}
                            onChange={handleChange}
                            disabled={loading}
                            placeholder="1000000"
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Target Date

                        </label>

                        <input
                            type="date"
                            name="targetDate"
                            value={formData.targetDate}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">

                            Priority

                        </label>

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            disabled={loading}
                            className="w-full rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >

                            <option value="HIGH">

                                High

                            </option>

                            <option value="MEDIUM">

                                Medium

                            </option>

                            <option value="LOW">

                                Low

                            </option>

                        </select>

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 border-t pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg border px-5 py-2 font-medium hover:bg-gray-100"
                        >

                            Cancel

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:bg-blue-400"
                        >

                            {loading
                                ? "Creating..."
                                : "Create Goal"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddGoalModal;