import Card from "../common/Card";
import { formatCurrency } from "../../utils/formatters";
import { FaTrash } from "react-icons/fa6";

function WatchlistCard({
    asset,
    onDelete,
}) {

    const isMutualFund =
        asset.assetType === "MUTUAL_FUND";

    const badgeColor = {

        STOCK:
            "bg-green-100 text-green-700",

        ETF:
            "bg-blue-100 text-blue-700",

        MUTUAL_FUND:
            "bg-purple-100 text-purple-700",

    };

    const exchangeBadgeColor = {

        NSE:
            "bg-green-100 text-green-700",

        BSE:
            "bg-orange-100 text-orange-700",

        NASDAQ:
            "bg-blue-100 text-blue-700",

        NYSE:
            "bg-purple-100 text-purple-700",

    };

    return (

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0 flex-1">

                    <h2 className="break-words text-xl font-bold text-slate-900">

                        {asset.assetName}

                    </h2>

                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gray-500">

                        {asset.assetSymbol}

                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                badgeColor[asset.assetType]
                            }`}
                        >

                            {asset.assetType.replace("_", " ")}

                        </span>

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

                    </div>

                </div>

            </div>

                        {/* Price */}

            <div className="mt-8">

                <p className="text-sm text-gray-500">

                    Current Price

                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">

                    {formatCurrency(
                        asset.currentPrice,
                        asset.currency
                    )}

                </h3>

            </div>

            {/* Currency */}

            <div className="mt-6">

                <p className="text-sm text-gray-500">

                    Currency

                </p>

                <p className="mt-1 font-semibold">

                    {asset.currency}

                </p>

            </div>

            {/* Actions */}

            <div className="mt-8">

                <button
                    onClick={() => onDelete(asset)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700"
                >

                    <FaTrash />

                    Remove

                </button>

            </div>

        </Card>

    );

}

export default WatchlistCard;

