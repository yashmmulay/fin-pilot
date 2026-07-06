import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
    FaBullseye,
    FaFlagCheckered,
    FaCircleCheck,
    FaChartLine,
    FaPlus,
    FaMagnifyingGlass,
    FaFilter,
} from "react-icons/fa6";

import {
    getGoals,
    createGoal,
    deleteGoal,
} from "../services/goalService";

import GoalList from "../components/goals/GoalList";
import GoalListSkeleton from "../components/goals/GoalListSkeleton";
import AddGoalModal from "../components/goals/AddGoalModal";
import ConfirmModal from "../components/common/ConfirmModal";

function Goals() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    const [showAddModal, setShowAddModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState(null);

    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadGoals();
    }, []);

    async function loadGoals() {
        try {
            setLoading(true);
            const data = await getGoals();
            setGoals(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load goals.");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateGoal(goal) {
        try {
            await createGoal(goal);
            toast.success("Goal created successfully.");
            setShowAddModal(false);
            await loadGoals();
        } catch (error) {
            throw error;
        }
    }

    function handleDelete(goal) {
        setGoalToDelete(goal);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        if (!goalToDelete) {
            return;
        }

        try {
            setDeleting(true);
            await deleteGoal(goalToDelete.id);
            toast.success("Goal deleted successfully.");
            setShowDeleteModal(false);
            setGoalToDelete(null);
            await loadGoals();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete goal.");
        } finally {
            setDeleting(false);
        }
    }

    const filteredGoals = goals.filter(goal => {
        const matchesSearch =
            goal.goalName
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesPriority =
            priorityFilter === "ALL" ||
            goal.priority === priorityFilter;

        return matchesSearch && matchesPriority;
    });

    const totalGoals = goals.length;

    const completedGoals = goals.filter(
        goal => Number(goal.progressPercentage) >= 100
    ).length;

    const activeGoals = goals.filter(
        goal => Number(goal.progressPercentage) < 100
    ).length;

    const averageProgress =
        totalGoals === 0
            ? 0
            : goals.reduce(
                (sum, goal) => sum + Number(goal.progressPercentage),
                0
            ) / totalGoals;

    if (loading) {
        return (
            <div className="space-y-8">
                <div>
                    <div className="mb-4 h-10 w-52 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-5 w-80 animate-pulse rounded bg-gray-200"></div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                        >
                            <div className="flex flex-row-reverse items-center justify-between">
                                <div className="h-11 w-11 rounded-lg bg-gray-200"></div>
                                <div>
                                    <div className="mb-2 h-4 w-20 rounded bg-gray-200"></div>
                                    <div className="h-8 w-16 rounded bg-gray-300"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <GoalListSkeleton />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900">Goals</h1>
                    <p className="mt-2 text-gray-500">
                        Track your financial goals and monitor your investment progress.
                    </p>
                </div>
            </div>

            {/* Summary */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-row-reverse items-center justify-between">
                        <div className="rounded-lg bg-blue-100 p-3">
                            <FaBullseye className="text-xl text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Goals</p>
                            <h2 className="text-3xl font-bold text-slate-900">
                                {totalGoals}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-row-reverse items-center justify-between">
                        <div className="rounded-lg bg-orange-100 p-3">
                            <FaFlagCheckered className="text-xl text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active</p>
                            <h2 className="text-3xl font-bold text-orange-600">
                                {activeGoals}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-row-reverse items-center justify-between">
                        <div className="rounded-lg bg-green-100 p-3">
                            <FaCircleCheck className="text-xl text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Completed</p>
                            <h2 className="text-3xl font-bold text-green-600">
                                {completedGoals}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-row-reverse items-center justify-between">
                        <div className="rounded-lg bg-purple-100 p-3">
                            <FaChartLine className="text-xl text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Avg. Progress</p>
                            <h2 className="text-3xl font-bold text-purple-600">
                                {averageProgress.toFixed(1)}%
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar - Search, Filter & Add Button Layout aligned with your layout image */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col gap-4 md:flex-row">
                        {/* Search Bar with Icon */}
                        <div className="relative">
                            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search goals..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 transition focus:border-blue-500 focus:outline-none md:w-80"
                            />
                        </div>

                        {/* Priority Selector with Icon */}
                        <div className="relative">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="rounded-xl border border-gray-300 py-3 pl-11 pr-10 transition focus:border-blue-500 focus:outline-none"
                            >
                                <option value="ALL">All Priorities</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Add Button Aligned to the Right Side */}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 whitespace-nowrap"
                    >
                        <FaPlus />
                        Add Goal
                    </button>
                </div>
            </div>

            {/* Content */}
            {goals.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white py-20 text-center">
                    <div className="text-6xl">🎯</div>
                    <h2 className="mt-6 text-3xl font-bold">No Goals Yet</h2>
                    <p className="mt-3 text-gray-500">
                        Start planning your financial future by creating your first goal.
                    </p>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        Create Your First Goal
                    </button>
                </div>
            ) : filteredGoals.length === 0 ? (
                <div className="rounded-xl border border-gray-200 bg-white py-20 text-center">
                    <div className="text-6xl">🔍</div>
                    <h2 className="mt-6 text-3xl font-bold">No Matching Goals</h2>
                    <p className="mt-3 text-gray-500">
                        Try changing your search or priority filter.
                    </p>
                </div>
            ) : (
                <GoalList
                    goals={filteredGoals}
                    onDelete={handleDelete}
                />
            )}

            {/* Add Goal Modal */}
            <AddGoalModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleCreateGoal}
            />

            {/* Delete Confirmation */}
            <ConfirmModal
                open={showDeleteModal}
                title="Delete Goal"
                message={
                    goalToDelete
                        ? `Are you sure you want to delete "${goalToDelete.goalName}"?`
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
                    setGoalToDelete(null);
                }}
            />
        </div>
    );
}

export default Goals;