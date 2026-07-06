import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { formatCompactCurrency } from "../../utils/formatters";

const COLORS = [
    "#2563EB",
    "#10B981",
    "#F59E0B",
];

function PortfolioAllocationChart({ data }) {

    const totalValue = data.reduce(

        (sum, item) => sum + Number(item.currentValue),

        0

    );

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div className="mb-8">

                <h2 className="text-xl font-bold">

                    Portfolio Allocation

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Distribution across asset classes

                </p>

            </div>

            <div className="grid items-center gap-8 lg:grid-cols-2">

                {/* Donut Chart */}

                <div className="relative h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="percentage"
                                innerRadius={75}
                                outerRadius={110}
                                paddingAngle={4}
                                cornerRadius={8}
                                stroke="none"
                            >

                                {data.map((entry, index) => (

                                    <Cell
                                        key={entry.assetType}
                                        fill={
                                            COLORS[
                                                index % COLORS.length
                                            ]
                                        }
                                    />

                                ))}

                            </Pie>

                            <Tooltip
                                formatter={(value) => [
                                    `${Number(value).toFixed(2)} %`,
                                    "Allocation"
                                ]}
                            />

                        </PieChart>

                    </ResponsiveContainer>

                    {/* Center */}

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                        <p className="text-sm text-gray-500">

                            Total Value

                        </p>

                        <h3 className="mt-1 text-2xl font-bold text-slate-900">

                            {formatCompactCurrency(totalValue)}

                        </h3>

                    </div>

                </div>

                {/* Legend */}

                <div className="space-y-5">

                    {data.map((item, index) => (

                        <div
                            key={item.assetType}
                            className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="h-4 w-4 rounded-full"
                                    style={{
                                        backgroundColor:
                                            COLORS[index % COLORS.length]
                                    }}
                                />

                                <div>

                                    <p className="font-semibold">

                                        {item.assetType.replace("_", " ")}

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {formatCompactCurrency(
                                            item.currentValue
                                        )}

                                    </p>

                                </div>

                            </div>

                            <div className="text-right">

                                <p className="text-lg font-bold">

                                    {item.percentage.toFixed(1)}%

                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default PortfolioAllocationChart;