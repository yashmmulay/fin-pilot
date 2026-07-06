export function getAssetMetadata(asset) {

    const symbol = asset.assetSymbol?.toUpperCase() ?? "";

    // Mutual Funds are Indian

    if (asset.assetType === "MUTUAL_FUND") {
        return {
            country: "India",
            currency: "INR",
        };
    }

    // Indian Stocks / ETFs

    if (
        symbol.endsWith(".NSE") ||
        symbol.endsWith(".BSE")
    ) {
        return {
            country: "India",
            currency: "INR",
        };
    }

    // Default: International

    return {
        country: "United States",
        currency: "USD",
    };
}