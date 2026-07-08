import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    FaListCheck,
    FaChartLine,
    FaChartPie,
    FaCoins,
    FaMagnifyingGlass,
    FaFilter,
    FaPlus,
} from "react-icons/fa6";

import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from "../services/watchlistService";

import WatchlistCard from "../components/watchlist/WatchlistCard";
import AddWatchlistModal from "../components/watchlist/AddWatchlistModal";

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [assetTypeFilter, setAssetTypeFilter] = useState("ALL");
    const [showAddModal, setShowAddModal] = useState(false);

    async function loadWatchlist() {
        try {
            const data = await getWatchlist();
            setWatchlist(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load watchlist.");
        }
    }

    useEffect(() => {
        async function fetchWatchlist() {
            await loadWatchlist();
            setLoading(false);
        }
        fetchWatchlist();
    }, []);

    async function handleSave(asset) {
        try {
            await addToWatchlist(asset);
            toast.success("Asset added successfully.");
            await loadWatchlist();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function handleDelete(asset) {
        try {
            await removeFromWatchlist(asset.id);
            toast.success("Asset removed successfully.");
            await loadWatchlist();
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Failed to remove asset."
            );
        }
    }

    const totalAssets = watchlist.length;
    const totalStocks = watchlist.filter(
        asset => asset.assetType === "STOCK"
    ).length;
    const totalEtfs = watchlist.filter(
        asset => asset.assetType === "ETF"
    ).length;
    const totalMutualFunds = watchlist.filter(
        asset => asset.assetType === "MUTUAL_FUND"
    ).length;

    const filteredWatchlist = watchlist.filter(asset => {
        const searchText = search.toLowerCase();
        const matchesSearch =
            asset.assetName.toLowerCase().includes(searchText) ||
            asset.assetSymbol.toLowerCase().includes(searchText) ||
            asset.assetType.replace("_", " ").toLowerCase().includes(searchText);

        const matchesType =
            assetTypeFilter === "ALL" ||
            asset.assetType === assetTypeFilter;

        return matchesSearch && matchesType;
    });

    if (loading) {
        return (
            <div className="space-y-8">
                <div>
                    <div className="mb-3 h-10 w-56 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-5 w-80 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse rounded-xl border bg-white p-5 shadow-sm"
                        >
                            <div className="mb-3 h-4 w-24 rounded bg-gray-200"></div>
                            <div className="h-8 w-32 rounded bg-gray-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">
                        Watchlist
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Track assets before adding them to your portfolio.
                    </p>
                </div>
            </div>

            {/* Summary */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Total Assets"
                    value={totalAssets}
                    subtitle="Currently tracked"
                    icon={<FaListCheck />}
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <SummaryCard
                    title="Stocks"
                    value={totalStocks}
                    subtitle="Individual equities"
                    icon={<FaChartLine />}
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                />
                <SummaryCard
                    title="ETFs"
                    value={totalEtfs}
                    subtitle="Exchange Traded Funds"
                    icon={<FaChartPie />}
                    iconBg="bg-indigo-100"
                    iconColor="text-indigo-600"
                />
                <SummaryCard
                    title="Mutual Funds"
                    value={totalMutualFunds}
                    subtitle="Long-term investments"
                    icon={<FaCoins />}
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                />
            </div>

            {/* Search & Filter */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-4 md:flex-row">
                        {/* Search */}
                        <div className="relative">
                            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by asset name, symbol or type..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 transition focus:border-blue-500 focus:outline-none md:w-96"
                            />
                        </div>

                        {/* Filter */}
                        <div className="relative">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={assetTypeFilter}
                                onChange={(e) => setAssetTypeFilter(e.target.value)}
                                className="rounded-xl border border-gray-300 py-3 pl-11 pr-10 transition focus:border-blue-500 focus:outline-none"
                            >
                               <option value="ALL">All Assets</option>
                                <option value="STOCK">Stocks</option>
                                <option value="ETF">ETFs</option>
                                <option value="MUTUAL_FUND">Mutual Funds</option>
                            </select>
                        </div>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        <FaPlus />
                        Add Asset
                    </button>
                </div>
            </div>

            {/* Content */}
            {watchlist.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-8 py-20 text-center shadow-sm">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                        <FaListCheck className="text-5xl text-blue-500" />
                    </div>
                    <h2 className="mt-8 text-3xl font-bold text-slate-900">
                        Your Watchlist is Empty
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-gray-500">
                        Build your investment watchlist by adding stocks, ETFs and mutual funds. Monitor them before making investment decisions.
                    </p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        <FaPlus />
                        Add First Asset
                    </button>
                </div>
            ) : filteredWatchlist.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white px-8 py-20 text-center shadow-sm">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
                        <FaMagnifyingGlass className="text-5xl text-slate-400" />
                    </div>
                    <h2 className="mt-8 text-3xl font-bold text-slate-900">
                        No Matching Assets
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-gray-500">
                        We couldn't find any assets matching your current search or filter. Try another keyword or change the selected asset type.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredWatchlist.map((asset) => (
                        <WatchlistCard
                            key={asset.id}
                            asset={asset}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            <AddWatchlistModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleSave}
            />
        </div>
    );
}

function SummaryCard({
    title,
    value,
    subtitle,
    icon,
    iconBg,
    iconColor,
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </h2>
                    <p className="mt-2 text-xs text-gray-400">
                        {subtitle}
                    </p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}>
                    <div className={`text-2xl ${iconColor}`}>
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watchlist;