/*
|--------------------------------------------------------------------------
| Currency Formatter
|--------------------------------------------------------------------------
*/

const currencyConfig = {

    INR: {
        locale: "en-IN",
        currency: "INR",
        symbol: "₹",
    },

    USD: {
        locale: "en-US",
        currency: "USD",
        symbol: "$",
    },

    EUR: {
        locale: "de-DE",
        currency: "EUR",
        symbol: "€",
    },

    GBP: {
        locale: "en-GB",
        currency: "GBP",
        symbol: "£",
    },

    JPY: {
        locale: "ja-JP",
        currency: "JPY",
        symbol: "¥",
    },

};

export function formatCurrency(
    amount,
    currency = "INR"
) {

    const config =
        currencyConfig[currency] ??
        currencyConfig.INR;

    if (amount === null || amount === undefined) {

        amount = 0;

    }

    return new Intl.NumberFormat(
        config.locale,
        {
            style: "currency",
            currency: config.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    ).format(Number(amount));

}

/*
|--------------------------------------------------------------------------
| Compact Currency Formatter
|--------------------------------------------------------------------------
*/

export function formatCompactCurrency(
    amount,
    currency = "INR"
) {

    const config =
        currencyConfig[currency] ??
        currencyConfig.INR;

    if (amount === null || amount === undefined) {

        return formatCurrency(0, currency);

    }

    const value = Number(amount);

    /*
    |--------------------------------------------------------------------------
    | Indian Number System
    |--------------------------------------------------------------------------
    */

    if (currency === "INR") {

        if (value >= 10000000) {

            return `${config.symbol}${(
                value / 10000000
            ).toFixed(2)} Cr`;

        }

        if (value >= 100000) {

            return `${config.symbol}${(
                value / 100000
            ).toFixed(2)} L`;

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Common Formatter (USD, EUR, GBP, JPY...)
    |--------------------------------------------------------------------------
    */

    if (value >= 1000000) {

        return `${config.symbol}${(
            value / 1000000
        ).toFixed(2)} M`;

    }

    if (value >= 1000) {

        return `${config.symbol}${(
            value / 1000
        ).toFixed(2)} K`;

    }

    return formatCurrency(value, currency);

}

/*
|--------------------------------------------------------------------------
| Percentage Formatter
|--------------------------------------------------------------------------
*/

export function formatPercentage(value) {

    if (value === null || value === undefined) {

        return "0.00%";

    }

    return `${Number(value).toFixed(2)}%`;

}

/*
|--------------------------------------------------------------------------
| Date Formatter
|--------------------------------------------------------------------------
*/

export function formatDate(date) {

    if (!date) {

        return "-";

    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );

}