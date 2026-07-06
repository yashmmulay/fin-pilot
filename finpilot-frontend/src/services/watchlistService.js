import api from "./api";

export async function getWatchlist() {

    const response = await api.get("/watchlist");

    return response.data;

}

export async function addToWatchlist(request) {

    const response = await api.post(
        "/watchlist",
        request
    );

    return response.data;

}

export async function removeFromWatchlist(assetSymbol) {

    await api.delete(
        `/watchlist/${assetSymbol}`
    );

}