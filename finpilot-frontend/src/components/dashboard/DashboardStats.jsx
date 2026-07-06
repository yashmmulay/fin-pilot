import {
    FaWallet,
    FaChartLine,
    FaArrowTrendUp,
    FaPercent,
} from "react-icons/fa6";

import StatCard from "../common/StatCard";

import {
    formatCompactCurrency,
    formatPercentage,
} from "../../utils/formatters";

function DashboardStats({ dashboard }) {

    return (

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 ">

            <StatCard
                title="Total Investment"
                value={formatCompactCurrency(
                    dashboard.totalInvestment
                )}
                subtitle="Amount Invested"
                icon={<FaWallet />}
            />

            <StatCard
                title="Current Value"
                value={formatCompactCurrency(
                    dashboard.currentValue
                )}
                subtitle="Live Portfolio Value"
                icon={<FaChartLine />}
            />

            <StatCard
                title="Profit / Loss"
                value={formatCompactCurrency(
                    dashboard.totalProfitLoss
                )}
                subtitle="Overall Gain"
                icon={<FaArrowTrendUp />}
                valueColor={
                    Number(dashboard.totalProfitLoss) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                }
            />

            <StatCard
                title="Returns"
                value={formatPercentage(
                    dashboard.returnPercentage
                )}
                subtitle="Portfolio Return"
                icon={<FaPercent />}
                valueColor={
                    Number(dashboard.returnPercentage) >= 0
                        ? "text-green-600"
                        : "text-red-600"
                }
            />

        </div>

    );

}

export default DashboardStats;