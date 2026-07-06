import { convertToINR } from "../currencyConverter";

/*
|--------------------------------------------------------------------------
| Basic Asset Calculations
|--------------------------------------------------------------------------
*/

export function getInvestment(asset) {

    const investment =
        Number(asset.purchasePrice) *
        Number(asset.quantity);

    return convertToINR(
        investment,
        asset.currency
    );

}

export function getCurrentValue(asset) {

    const currentValue =
        Number(asset.currentPrice) *
        Number(asset.quantity);

    return convertToINR(
        currentValue,
        asset.currency
    );

}

export function getProfit(asset) {

    return getCurrentValue(asset) - getInvestment(asset);

}

export function getReturnPercentage(asset) {

    const investment = getInvestment(asset);

    if (investment === 0) {

        return 0;

    }

    return (getProfit(asset) / investment) * 100;

}

/*
|--------------------------------------------------------------------------
| Portfolio Summary
|--------------------------------------------------------------------------
*/

export function getPortfolioSummary(portfolio) {

    let totalInvestment = 0;

    let currentValue = 0;

    portfolio.forEach(asset => {

        totalInvestment += getInvestment(asset);

        currentValue += getCurrentValue(asset);

    });

    const totalProfit =
        currentValue - totalInvestment;

    const returnPercentage =
        totalInvestment === 0
            ? 0
            : (totalProfit / totalInvestment) * 100;

    return {

        totalInvestment,

        currentValue,

        totalProfit,

        returnPercentage,

    };

}

/*
|--------------------------------------------------------------------------
| Largest Holding
|--------------------------------------------------------------------------
*/

export function getLargestHolding(portfolio) {

    if (!portfolio.length) {

        return null;

    }

    return portfolio.reduce((largest, asset) =>

        getCurrentValue(asset) >
        getCurrentValue(largest)

            ? asset

            : largest

    );

}

/*
|--------------------------------------------------------------------------
| Largest Holding Percentage
|--------------------------------------------------------------------------
*/

export function getLargestHoldingPercentage(portfolio) {

    if (!portfolio.length) {

        return 0;

    }

    const summary =
        getPortfolioSummary(portfolio);

    const largest =
        getLargestHolding(portfolio);

    if (summary.currentValue === 0) {

        return 0;

    }

    return (

        getCurrentValue(largest)

        /

        summary.currentValue

    ) * 100;

}

/*
|--------------------------------------------------------------------------
| Best Performer
|--------------------------------------------------------------------------
*/

export function getBestPerformer(portfolio) {

    if (!portfolio.length) {

        return null;

    }

    return portfolio.reduce((best, asset) =>

        getReturnPercentage(asset) >

        getReturnPercentage(best)

            ? asset

            : best

    );

}

/*
|--------------------------------------------------------------------------
| Worst Performer
|--------------------------------------------------------------------------
*/

export function getWorstPerformer(portfolio) {

    if (!portfolio.length) {

        return null;

    }

    return portfolio.reduce((worst, asset) =>

        getReturnPercentage(asset) <

        getReturnPercentage(worst)

            ? asset

            : worst

    );

}

/*
|--------------------------------------------------------------------------
| Asset Allocation Breakdown
|--------------------------------------------------------------------------
*/

export function getAllocationBreakdown(portfolio) {

    const breakdown = {

        STOCK: 0,

        ETF: 0,

        MUTUAL_FUND: 0,

    };

    portfolio.forEach(asset => {

        breakdown[asset.assetType] +=

            getCurrentValue(asset);

    });

    return breakdown;

}