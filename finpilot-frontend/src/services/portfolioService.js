import api from "./api";

export async function getPortfolio() {

    const response = await api.get("/portfolio");

    return response.data;
}

export async function getPortfolioSummary() {

    const response = await api.get("/portfolio/summary");

    return response.data;
}

export async function getPortfolioAllocation() {

    const response = await api.get("/portfolio/allocation");

    return response.data;
}

export async function addAsset(asset) {

    const response = await api.post("/portfolio", asset);

    return response.data;
}

export async function updateAsset(id, asset) {

    const response = await api.put(`/portfolio/${id}`, asset);

    return response.data;
}

export async function deleteAsset(id) {

    await api.delete(`/portfolio/${id}`);
}