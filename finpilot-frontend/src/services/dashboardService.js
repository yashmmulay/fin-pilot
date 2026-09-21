import api from "./api";

export async function getDashboard() {

    const response = await api.get("/api/dashboard");

    return response.data;
}

export async function getDashboardData() {

    const [
        dashboardResponse,
        allocationResponse,
        riskResponse,
    ] = await Promise.all([

        api.get("/api/dashboard"),

        api.get("/api/portfolio/allocation"),

        api.get("/api/risk"),

    ]);

    return {
        dashboard: dashboardResponse.data,
        allocation: allocationResponse.data,
        risks: riskResponse.data,
    };
}