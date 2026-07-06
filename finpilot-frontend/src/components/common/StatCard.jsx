import React from "react";

function StatCard({
    title,
    value,
    subtitle,
    icon,
    valueColor = "text-slate-900",
}) {

    const positive =
        valueColor.includes("green");

    const negative =
        valueColor.includes("red");

    return (

        <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">

                        {title}

                    </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl text-white shadow-lg">

                    {icon}

                </div>

            </div>

            {/* Value */}

            <div className="mt-4">

                <h2
                    className={`text-3xl font-bold tracking-tight ${valueColor}`}
                >

                    {value}

                </h2>

            </div>

            {/* Footer */}

            <div className="mt-3 flex items-center justify-between">

                <span className="text-sm text-slate-500">

                    {subtitle}

                </span>

                {(positive || negative) && (

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            positive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >

                        {positive ? "▲ Positive" : "▼ Negative"}

                    </span>

                )}

            </div>

        </div>

    );

}

export default StatCard;