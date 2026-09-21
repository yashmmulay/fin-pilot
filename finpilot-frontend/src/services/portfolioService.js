import api from "./api";

export async function getPortfolio() {

    const response = await api.get("/api/portfolio");

    return response.data;
}

export async function getPortfolioSummary() {

    const response = await api.get("/api/portfolio/summary");

    return response.data;
}

export async function getPortfolioAllocation() {

    const response = await api.get("/api/portfolio/allocation");

    return response.data;
}

export async function addAsset(asset) {

    const response = await api.post("/api/portfolio", asset);

    return response.data;
}

export async function updateAsset(id, asset) {

    const response = await api.put(`/api/portfolio/${id}`, asset);

    return response.data;
}

export async function deleteAsset(id) {

    await api.delete(`/api/portfolio/${id}`);
}