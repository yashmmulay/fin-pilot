import Card from "../common/Card";

import {
    formatCurrency,
} from "../../utils/formatters";

import {
    FaTrash,
} from "react-icons/fa6";

function WatchlistCard({
    asset,
    onDelete,
}) {

    const badgeColor = {

        STOCK:
            "bg-green-100 text-green-700",

        ETF:
            "bg-blue-100 text-blue-700",

        MUTUAL_FUND:
            "bg-purple-100 text-purple-700",

    };

    return (

        <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-bold text-slate-900">

                        {asset.assetName}

                    </h2>

                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gray-500">

                        {asset.assetSymbol}

                    </p>

                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        badgeColor[asset.assetType]
                    }`}
                >

                    {asset.assetType.replace("_", " ")}

                </span>

            </div>

            {/* Price */}

            <div className="mt-8">

                <p className="text-sm text-gray-500">

                    Current Price

                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">

                    {formatCurrency(asset.currentPrice, asset.currency)}

                </h3>

            </div>

            {/* Exchange */}

            <div className="mt-6 flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">

                        Exchange

                    </p>

                    <p className="mt-1 font-semibold">

                        {asset.exchange}

                    </p>

                </div>

                <div>

                    <p className="text-sm text-gray-500">

                        Currency

                    </p>

                    <p className="mt-1 font-semibold">

                        {asset.currency}

                    </p>

                </div>

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