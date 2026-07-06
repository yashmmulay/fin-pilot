import api from "./api";

export async function getDashboard() {

    const response = await api.get("/dashboard");

    return response.data;
}

export async function getDashboardData() {

    const [
        dashboardResponse,
        allocationResponse,
        riskResponse,
    ] = await Promise.all([

        api.get("/dashboard"),

        api.get("/portfolio/allocation"),

        api.get("/risk"),

    ]);

    return {
        dashboard: dashboardResponse.data,
        allocation: allocationResponse.data,
        risks: riskResponse.data,
    };
}