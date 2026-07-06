import {
    getAllocationBreakdown,
    getLargestHolding,
    getLargestHoldingPercentage,
    getPortfolioSummary
} from "./calculations";

export function getRiskPreview(portfolio) {

    const alerts = [];

    if (!portfolio.length) {
        return alerts;
    }

    const summary = getPortfolioSummary(portfolio);

    const largestHolding = getLargestHolding(portfolio);

    const largestHoldingPercentage =
        getLargestHoldingPercentage(portfolio);

    const allocation =
        getAllocationBreakdown(portfolio);

    /* ======================================================
                    High Asset Concentration
       ====================================================== */

    if (largestHoldingPercentage > 30) {

        alerts.push({

            severity: "HIGH",

            title: "High Asset Concentration",

            message:
                `${largestHolding.assetSymbol} represents ${largestHoldingPercentage.toFixed(1)}% of your portfolio. Consider reducing exposure below 25%.`

        });

    }

    /* ======================================================
                    Poor Diversification
       ====================================================== */

    if (portfolio.length < 5) {

        alerts.push({

            severity: "MEDIUM",

            title: "Low Diversification",

            message:
                `You currently own only ${portfolio.length} holdings. Consider investing in more assets.`

        });

    }

    /* ======================================================
                    Single Asset Class
       ====================================================== */

    const assetTypes =
        Object.values(allocation)
            .filter(value => value > 0).length;

    if (assetTypes === 1) {

        alerts.push({

            severity: "MEDIUM",

            title: "Limited Asset Class Exposure",

            message:
                "Your investments are concentrated in a single asset class. Consider adding ETFs or Mutual Funds."

        });

    }

    /* ======================================================
                    Negative Portfolio
       ====================================================== */

    if (summary.returnPercentage < 0) {

        alerts.push({

            severity: "HIGH",

            title: "Negative Portfolio Return",

            message:
                `Your portfolio is currently down ${Math.abs(summary.returnPercentage).toFixed(2)}%. Review underperforming assets.`

        });

    }

    /* ======================================================
                    Healthy Portfolio
       ====================================================== */

    if (alerts.length === 0) {

        alerts.push({

            severity: "SUCCESS",

            title: "Healthy Portfolio",

            message:
                "Your portfolio appears well diversified with no immediate concentration risks."

        });

    }

    return alerts;

}