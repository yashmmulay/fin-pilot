import Card from "../common/Card";
import {
    formatCompactCurrency,
    formatCurrency,
    formatPercentage,
} from "../../utils/formatters";
import { getAssetMetadata } from "../../utils/portfolioUtils";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

function PortfolioCard({ asset, totalPortfolioValue, onEdit, onDelete }) {
    const metadata = getAssetMetadata(asset);
    const isMutualFund = asset.assetType === "MUTUAL_FUND";
    const purchasePrice = Number(asset.purchasePrice);

    const gain =
        purchasePrice > 0
            ? ((Number(asset.currentPrice) - purchasePrice) / purchasePrice) * 100
            : 0;

    const investedValue = purchasePrice * Number(asset.quantity);
    const currentValue = Number(asset.currentPrice) * Number(asset.quantity);
    const profitLoss = currentValue - investedValue;

    const portfolioWeight =
        totalPortfolioValue > 0 ? (currentValue / totalPortfolioValue) * 100 : 0;

    const badgeColor = {
        STOCK: "bg-green-100 text-green-700",
        ETF: "bg-blue-100 text-blue-700",
        MUTUAL_FUND: "bg-purple-100 text-purple-700",
    };

    const exchangeBadgeColor = {
        NSE: "bg-green-100 text-green-700",
        BSE: "bg-orange-100 text-orange-700",
        NASDAQ: "bg-blue-100 text-blue-700",
        NYSE: "bg-purple-100 text-purple-700",
    };

    return (
        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Top Row: Name, Badges, and Gain */}
            <div className="flex items-start justify-between gap-4">
                {/* Left */}
                <div className="min-w-0 flex-1">
                    <h2 className="break-words text-xl font-bold text-slate-900">
                        {asset.assetName}
                    </h2>
                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gray-500">
                        {asset.assetSymbol}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {/* Asset Type */}
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                badgeColor[asset.assetType]
                            }`}
                        >
                            {asset.assetType.replace("_", " ")}
                        </span>

                        {/* Exchange (hide for Mutual Funds) */}
                        {!isMutualFund && (
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    exchangeBadgeColor[asset.exchange] ??
                                    "bg-slate-100 text-slate-700"
                                }`}
                            >
                                {asset.exchange}
                            </span>
                        )}

                        {/* Portfolio Weight */}
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                            {formatPercentage(portfolioWeight)} Weight
                        </span>
                    </div>
                </div>

                {/* Right */}
                <div
                    className={`shrink-0 text-right text-xl font-bold ${
                        gain >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {formatPercentage(gain)}
                </div>
            </div>

            {/* Grid Metrics */}
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="mt-1 font-semibold">{asset.quantity}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        {isMutualFund ? "Buy NAV" : "Buy Price"}
                    </p>
                    <p className="mt-1 font-semibold">
                        {formatCurrency(asset.purchasePrice, metadata.currency)}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">
                        {isMutualFund ? "Current NAV" : "Current Price"}
                    </p>
                    <p className="mt-1 font-semibold">
                        {formatCurrency(asset.currentPrice, metadata.currency)}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Invested Value</p>
                    <p className="mt-1 font-semibold">
                        {formatCompactCurrency(investedValue, metadata.currency)}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Current Value</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatCompactCurrency(currentValue, metadata.currency)}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Profit / Loss</p>
                    <p
                        className={`mt-1 text-lg font-bold ${
                            profitLoss >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {profitLoss >= 0 ? "+" : ""}
                        {formatCompactCurrency(profitLoss, metadata.currency)}
                    </p>
                    <p
                        className={`text-sm font-medium ${
                            gain >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {formatPercentage(gain)}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
                <button
                    onClick={() => onEdit(asset)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                    <FaPenToSquare />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(asset)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700"
                >
                    <FaTrash />
                    Delete
                </button>
            </div>
        </Card>
    );
}

export default PortfolioCard;