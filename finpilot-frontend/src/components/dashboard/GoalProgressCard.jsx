import {
    FaBullseye,
    FaCalendarDays,
    FaFlagCheckered,
} from "react-icons/fa6";

import { formatCompactCurrency } from "../../utils/formatters";

function GoalProgressCard({ goal }) {

    if (!goal) {

        return (

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex h-64 items-center justify-center">

                    <div className="text-center">

                        <FaBullseye className="mx-auto text-4xl text-gray-300" />

                        <h3 className="mt-3 text-lg font-semibold">

                            No Goals Yet

                        </h3>

                        <p className="mt-1 text-sm text-gray-500">

                            Create your first financial goal.

                        </p>

                    </div>

                </div>

            </div>

        );

    }

    const progress = Math.min(
        Number(goal.progressPercentage ?? 0),
        100
    );

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Header */}

            <div className="mb-5 flex items-center justify-between">

                <div>

                    <h2 className="text-lg font-bold text-slate-900">

                        Highest Priority Goal

                    </h2>

                    <p className="text-xs text-gray-500">

                        Your most important financial target

                    </p>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">

                    <FaBullseye className="text-blue-600" />

                </div>

            </div>

            {/* Goal Name */}

            <div className="mb-5">

                <h3 className="text-2xl font-bold text-slate-900">

                    {goal.goalName}

                </h3>

            </div>

            {/* Progress */}

            <div>

                <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm text-gray-600">

                        Progress

                    </span>

                    <span className="text-sm font-semibold">

                        {progress.toFixed(1)}%

                    </span>

                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">

                    <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-700"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                </div>

            </div>

            {/* Amounts */}

            <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-gray-500">

                        Current Value

                    </p>

                    <p className="mt-1 text-base font-bold">

                        {formatCompactCurrency(
                            goal.currentPortfolioValue
                        )}

                    </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-gray-500">

                        Target Amount

                    </p>

                    <p className="mt-1 text-base font-bold">

                        {formatCompactCurrency(
                            goal.targetAmount
                        )}

                    </p>

                </div>

            </div>

            {/* Remaining */}

            <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-3">

                <div className="flex items-center justify-between">

                    <span className="text-sm">

                        Remaining

                    </span>

                    <span className="font-bold text-orange-700">

                        {formatCompactCurrency(
                            goal.remainingAmount
                        )}

                    </span>

                </div>

            </div>

            {/* Footer */}

            <div className="mt-5 flex items-center justify-between border-t pt-4">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                    <FaCalendarDays />

                    <span>

                        {goal.targetDate}

                    </span>

                </div>

                <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                    <FaFlagCheckered />

                    <span>

                        {goal.status}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default GoalProgressCard;