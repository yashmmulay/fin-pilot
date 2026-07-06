import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    getPortfolio,
    addAsset,
    updateAsset,
    deleteAsset,
} from "../services/portfolioService";

import { formatCompactCurrency } from "../utils/formatters";
import { getDashboard } from "../services/dashboardService";

import PortfolioList from "../components/portfolio/PortfolioList";
import AddAssetModal from "../components/portfolio/AddAssetModal";
import ConfirmModal from "../components/common/ConfirmModal";
import PortfolioListSkeleton from "../components/portfolio/PortfolioListSkeleton";
import { 
    FaMagnifyingGlass, 
    FaFilter, 
    FaListCheck, 
    FaWallet, 
    FaChartLine, 
    FaScaleBalanced 
} from "react-icons/fa6";

function Portfolio() {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState(null);

    const [search, setSearch] = useState("");
    const [assetTypeFilter, setAssetTypeFilter] = useState("ALL");

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);

    async function loadPortfolio() {
        try {
            const [portfolioData, summaryData] = await Promise.all([
                getPortfolio(),
                getDashboard(),
            ]);

            setPortfolio(portfolioData);
            setSummary(summaryData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchPortfolio() {
            await loadPortfolio();
            setLoading(false);
        }
        fetchPortfolio();
    }, []);

    async function handleSaveAsset(asset) {
        try {
            if (selectedAsset) {
                await updateAsset(selectedAsset.id, asset);
            } else {
                await addAsset(asset);
            }
            await loadPortfolio();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    function handleEdit(asset) {
        setSelectedAsset(asset);
        setShowAddModal(true);
    }

    function handleDelete(asset) {
        setAssetToDelete(asset);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        if (!assetToDelete) {
            return;
        }

        setDeleting(true);

        try {
            await deleteAsset(assetToDelete.id);
            toast.success("Asset deleted successfully.");
            await loadPortfolio();
            setShowDeleteModal(false);
            setAssetToDelete(null);
        } catch (error) {
            console.error(error);
            const message =
                error?.response?.data?.message ||
                "Failed to delete asset.";
            toast.error(message);
        } finally {
            setDeleting(false);
        }
    }

    const totalAssets = portfolio.length;

    const filteredPortfolio = portfolio.filter((asset) => {
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

                <PortfolioListSkeleton />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-slate-900">Portfolio</h1>
                <p className="mt-2 text-gray-500">
                    Manage all your investments.
                </p>
            </div>

            {/* Portfolio Summary Card Layout */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {/* Total Assets */}
                <div className="flex h-36 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Total Assets</p>
                            <h2 className="text-3xl font-bold text-slate-900">{totalAssets}</h2>
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                            <FaListCheck className="text-xl text-blue-600" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Unique items</p>
                </div>

                {/* Total Investment */}
                <div className="flex h-36 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Total Investment</p>
                            <h2 className="text-3xl font-bold text-slate-900">
                                {summary && formatCompactCurrency(summary.totalInvestment)}
                            </h2>
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                            <FaWallet className="text-xl text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Principal cost</p>
                </div>

                {/* Current Value */}
                <div className="flex h-36 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Current Value</p>
                            <h2 className="text-3xl font-bold text-slate-900">
                                {summary && formatCompactCurrency(summary.currentValue)}
                            </h2>
                        </div>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                            <FaChartLine className="text-xl text-indigo-600" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Market valuation</p>
                </div>

                {/* Profit / Loss */}
                <div className="flex h-36 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Profit / Loss</p>
                            <h2
                                className={`text-3xl font-bold ${
                                    Number(summary?.totalProfitLoss) >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {summary && formatCompactCurrency(summary.totalProfitLoss)}
                            </h2>
                        </div>
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            Number(summary?.totalProfitLoss) >= 0 ? "bg-green-100" : "bg-red-100"
                        }`}>
                            <FaScaleBalanced className={`text-xl ${
                                Number(summary?.totalProfitLoss) >= 0 ? "text-green-600" : "text-red-600"
                            }`} />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400">Net returns</p>
                </div>
            </div>

            {/* Search, Filter & Add Button Controls */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-4 md:flex-row">
                        {/* Search Bar with Icon */}
                        <div className="relative">
                            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 transition focus:border-blue-500 focus:outline-none md:w-96"
                            />
                        </div>

                        {/* Filter Selector with Icon */}
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

                    <button
                        onClick={() => {
                            setSelectedAsset(null);
                            setShowAddModal(true);
                        }}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 whitespace-nowrap"
                    >
                        + Add Asset
                    </button>
                </div>
            </div>

            {/* Portfolio List */}
            {portfolio.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center">
                    <div className="text-6xl">📁</div>
                    <h2 className="mt-6 text-2xl font-bold">No Assets Yet</h2>
                    <p className="mt-3 text-gray-500">
                        Start building your portfolio by adding your first investment.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedAsset(null);
                            setShowAddModal(true);
                        }}
                        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        + Add Your First Asset
                    </button>
                </div>
            ) : filteredPortfolio.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white p-16 text-center">
                    <div className="text-6xl">🔍</div>
                    <h2 className="mt-6 text-2xl font-bold">No Matching Assets</h2>
                    <p className="mt-3 text-gray-500">
                        Try changing your search keyword or asset type filter.
                    </p>
                </div>
            ) : (
                <PortfolioList
                    portfolio={filteredPortfolio}
                    totalPortfolioValue={Number(summary?.currentValue ?? 0)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Add / Edit Modal */}
            <AddAssetModal
                open={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                    setSelectedAsset(null);
                }}
                onSave={handleSaveAsset}
                asset={selectedAsset}
            />

            {/* Delete Confirmation */}
            <ConfirmModal
                open={showDeleteModal}
                title="Delete Asset"
                message={
                    assetToDelete
                        ? `Are you sure you want to delete "${assetToDelete.assetName}" (${assetToDelete.assetSymbol})?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                loading={deleting}
                onConfirm={confirmDelete}
                onCancel={() => {
                    if (deleting) {
                        return;
                    }
                    setShowDeleteModal(false);
                    setAssetToDelete(null);
                }}
            />
        </div>
    );
}

export default Portfolio;