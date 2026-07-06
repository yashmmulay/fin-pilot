import { FaTrash } from "react-icons/fa6";

import { formatCompactCurrency } from "../../utils/formatters";

function GoalCard({
    goal,
    onDelete,
}) {

    const progress = Math.min(
        Number(goal.progressPercentage ?? 0),
        100
    );

    const priorityColors = {

        HIGH: "bg-red-100 text-red-700",

        MEDIUM: "bg-yellow-100 text-yellow-700",

        LOW: "bg-green-100 text-green-700",

    };

    const statusColors = {

        ACTIVE: "bg-blue-100 text-blue-700",

        ACHIEVED: "bg-green-100 text-green-700",

        CANCELLED: "bg-gray-100 text-gray-700",

    };

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-bold">

                        {goal.goalName}

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Target Date

                    </p>

                    <p className="font-medium">

                        {goal.targetDate}

                    </p>

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColors[goal.priority]}`}
                >

                    {goal.priority}

                </span>

            </div>

            {/* Progress */}

            <div className="mt-6">

                <div className="mb-2 flex justify-between">

                    <span className="text-gray-600">

                        Progress

                    </span>

                    <span className="font-semibold">

                        {progress.toFixed(1)}%

                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-200">

                    <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                </div>

                <p className="mt-2 text-sm text-gray-500">

                    {formatCompactCurrency(goal.currentPortfolioValue)}

                    {" / "}

                    {formatCompactCurrency(goal.targetAmount)}

                </p>

            </div>

            {/* Details */}

            <div className="mt-6 space-y-3">

                <div className="flex justify-between">

                    <span className="text-gray-500">

                        Portfolio Value

                    </span>

                    <span className="font-semibold">

                        {formatCompactCurrency(goal.currentPortfolioValue)}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-gray-500">

                        Target Amount

                    </span>

                    <span className="font-semibold">

                        {formatCompactCurrency(goal.targetAmount)}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-gray-500">

                        Remaining

                    </span>

                    <span className="font-semibold text-red-600">

                        {formatCompactCurrency(goal.remainingAmount)}

                    </span>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-6 flex items-center justify-between border-t pt-5">

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[goal.status]}`}
                >

                    {goal.status}

                </span>

                <button
                    onClick={() => onDelete(goal)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >

                    <FaTrash />

                    Delete

                </button>

            </div>

        </div>

    );

}

export default GoalCard;