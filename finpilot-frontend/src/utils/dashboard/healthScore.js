import {
    getAllocationBreakdown,
    getLargestHoldingPercentage,
    getPortfolioSummary
} from "./calculations";

export function calculatePortfolioHealth(portfolio) {

    if (!portfolio.length) {

        return {
            score: 0,
            status: "No Portfolio",
            color: "text-gray-500",
            breakdown: []
        };

    }

    let score = 0;

    const breakdown = [];

    /* ======================================================
                    1. Number of Holdings (25)
       ====================================================== */

    const holdings = portfolio.length;

    let holdingScore = 0;

    if (holdings >= 15) {

        holdingScore = 25;

    } else if (holdings >= 10) {

        holdingScore = 20;

    } else if (holdings >= 5) {

        holdingScore = 15;

    } else {

        holdingScore = 5;

    }

    score += holdingScore;

    breakdown.push({
        title: "Diversification",
        score: holdingScore,
        max: 25
    });

    /* ======================================================
                    2. Largest Holding (25)
       ====================================================== */

    const largestHolding =
        getLargestHoldingPercentage(portfolio);

    let concentrationScore = 0;

    if (largestHolding <= 20) {

        concentrationScore = 25;

    } else if (largestHolding <= 30) {

        concentrationScore = 18;

    } else if (largestHolding <= 40) {

        concentrationScore = 10;

    } else {

        concentrationScore = 5;

    }

    score += concentrationScore;

    breakdown.push({
        title: "Concentration",
        score: concentrationScore,
        max: 25
    });

    /* ======================================================
                    3. Asset Mix (25)
       ====================================================== */

    const allocation =
        getAllocationBreakdown(portfolio);

    const assetTypes =
        Object.values(allocation)
            .filter(value => value > 0).length;

    let assetMixScore = 0;

    if (assetTypes >= 3) {

        assetMixScore = 25;

    } else if (assetTypes === 2) {

        assetMixScore = 18;

    } else {

        assetMixScore = 8;

    }

    score += assetMixScore;

    breakdown.push({
        title: "Asset Mix",
        score: assetMixScore,
        max: 25
    });

    /* ======================================================
                    4. Portfolio Returns (25)
       ====================================================== */

    const summary =
        getPortfolioSummary(portfolio);

    let returnScore = 0;

    if (summary.returnPercentage >= 20) {

        returnScore = 25;

    } else if (summary.returnPercentage >= 10) {

        returnScore = 20;

    } else if (summary.returnPercentage >= 0) {

        returnScore = 15;

    } else {

        returnScore = 5;

    }

    score += returnScore;

    breakdown.push({
        title: "Returns",
        score: returnScore,
        max: 25
    });

    /* ======================================================
                    Final Result
       ====================================================== */

    let status = "";
    let color = "";

    if (score >= 85) {

        status = "Excellent";
        color = "text-green-600";

    } else if (score >= 70) {

        status = "Good";
        color = "text-blue-600";

    } else if (score >= 50) {

        status = "Average";
        color = "text-yellow-600";

    } else {

        status = "Poor";
        color = "text-red-600";

    }

    return {

        score,

        status,

        color,

        breakdown

    };

}