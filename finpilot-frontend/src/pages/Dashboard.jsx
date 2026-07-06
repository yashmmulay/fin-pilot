import { useEffect, useState } from "react";

import { getDashboardData } from "../services/dashboardService";
import { getPortfolio } from "../services/portfolioService";
import { getGoals } from "../services/goalService";
import { getWatchlist } from "../services/watchlistService";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import PortfolioInsights from "../components/dashboard/PortfolioInsights";
import GoalProgressCard from "../components/dashboard/GoalProgressCard";
import PortfolioAllocationChart from "../components/dashboard/PortfolioAllocationChart";
import ModernRiskAlerts from "../components/dashboard/ModernRiskAlerts";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

import {
    calculatePortfolioHealth,
    getRiskPreview,
} from "../utils/dashboard";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const [allocation, setAllocation] = useState([]);
    const [goals, setGoals] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const health = calculatePortfolioHealth(portfolio);

    useEffect(() => {

        async function fetchDashboard() {

            try {

                const [
                    dashboardData,
                    portfolioData,
                    goalsData,
                    watchlistData,
                ] = await Promise.all([

                    getDashboardData(),
                    getPortfolio(),
                    getGoals(),
                    getWatchlist(),

                ]);

                setDashboard(dashboardData.dashboard);
                setAllocation(dashboardData.allocation);
                setPortfolio(portfolioData);
                setGoals(goalsData);
                setWatchlist(watchlistData);

            } catch (error) {

                console.error(
                    "Failed to fetch dashboard:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }

        fetchDashboard();

    }, []);

    if (loading) {

        return <DashboardSkeleton />;

    }

    return (

        <div className="space-y-4">

            {/* Header */}

            <DashboardHeader
                dashboard={dashboard}
            />

            {/* KPI */}

            <DashboardStats
                dashboard={dashboard}
            />

            {/* First Row */}

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

                <PortfolioInsights
                    portfolio={portfolio}
                    health={health}
                />

                <GoalProgressCard
                    goal={dashboard.highestPriorityGoal}
                />

                <ModernRiskAlerts
                        alerts={getRiskPreview(portfolio)}
                    />         

            </div>

            {/* Second Row */}

            {/* added items-start to prevent vertical stretching */}
            
            <div className="grid grid-cols-1 gap-4 xl:col-span-2">

                {/* Portfolio Allocation */}
                <div className="xl:col-span-1 max-h-36">
                    <PortfolioAllocationChart

                        data={allocation}
                    />
                </div>
            </div>

        </div>

    );

}

export default Dashboard;