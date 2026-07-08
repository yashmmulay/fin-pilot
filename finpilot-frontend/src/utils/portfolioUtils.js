export function getAssetMetadata(asset) {

    const exchange = asset.exchange?.toUpperCase() ?? "";

    if (
        exchange === "NSE" ||
        exchange === "BSE" ||
        exchange === "MF"
    ) {
        return {
            currency: "INR",
        };
    }

    return {
        currency: "USD",
    };
}