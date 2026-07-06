import {
    FaArrowTrendDown,
    FaArrowTrendUp,
    FaChartPie,
    FaLayerGroup,
} from "react-icons/fa6";

import {
    getBestPerformer,
    getLargestHolding,
    getLargestHoldingPercentage,
    getWorstPerformer,
} from "../../utils/dashboard";

import { formatCompactCurrency } from "../../utils/formatters";

function PortfolioInsights({ portfolio, health }) {

    const largestHolding = getLargestHolding(portfolio);

    const largestHoldingPercentage =
        Number(getLargestHoldingPercentage(portfolio) ?? 0);

    const bestPerformer =
        getBestPerformer(portfolio);

    const worstPerformer =
        getWorstPerformer(portfolio);

    const bestReturn = bestPerformer
        ? (
            (
                Number(bestPerformer.currentPrice) -
                Number(bestPerformer.purchasePrice)
            ) /
            Number(bestPerformer.purchasePrice)
        ) * 100
        : 0;

    const worstReturn = worstPerformer
        ? (
            (
                Number(worstPerformer.currentPrice) -
                Number(worstPerformer.purchasePrice)
            ) /
            Number(worstPerformer.purchasePrice)
        ) * 100
        : 0;

    const formatAssetName = (asset) => {

        if (!asset) {
            return "-";
        }

        return asset.assetType === "MUTUAL_FUND"
            ? `${asset.assetSymbol} • Mutual Fund`
            : asset.assetSymbol;

    };

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            {/* Header */}

            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-lg font-bold text-slate-900">

                    Portfolio Insights

                </h2>

                <div
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${health.color}`}
                >

                    {health.score}/100

                </div>

            </div>

            <div className="space-y-4">

                {/* Largest Holding */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">

                            <FaLayerGroup className="text-blue-600" />

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Largest Holding

                            </p>

                            <p className="text-base font-semibold">

                                {formatAssetName(largestHolding)}

                            </p>

                        </div>

                    </div>

                    <div className="text-right">

                        <p className="text-lg font-bold">

                            {largestHoldingPercentage.toFixed(1)}%

                        </p>

                        <p className="text-xs text-gray-500">

                            {largestHolding
                                ? formatCompactCurrency(
                                    Number(largestHolding.currentPrice) *
                                    Number(largestHolding.quantity)
                                )
                                : "-"}

                        </p>

                    </div>

                </div>

                <hr />

                {/* Best Performer */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">

                            <FaArrowTrendUp className="text-green-600" />

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Best Performer (Relative)

                            </p>

                            <p className="text-base font-semibold">

                                {formatAssetName(bestPerformer)}

                            </p>

                        </div>

                    </div>

                    <span className="text-lg font-bold text-green-600">

                        {bestReturn > 0 ? "+" : ""}
                        {bestReturn.toFixed(2)}%

                    </span>

                </div>

                <hr />

                {/* Worst Performer */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">

                            <FaArrowTrendDown className="text-red-600" />

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Worst Performer (Relative)

                            </p>

                            <p className="text-base font-semibold">

                                {formatAssetName(worstPerformer)}

                            </p>

                        </div>

                    </div>

                    <span className="text-lg font-bold text-red-600">

                        {worstReturn > 0 ? "+" : ""}
                        {worstReturn.toFixed(2)}%

                    </span>

                </div>

                <hr />

                {/* Portfolio Health */}

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">

                    <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">

                            <FaChartPie className="text-blue-600" />

                        </div>

                        <div>

                            <p className="text-xs text-gray-500">

                                Portfolio Health

                            </p>

                            <p className="text-base font-semibold">

                                {health.status}

                            </p>

                        </div>

                    </div>

                    <span
                        className={`text-3xl font-bold ${health.color}`}
                    >

                        {health.score}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default PortfolioInsights;