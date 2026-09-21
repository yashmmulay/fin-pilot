import api from "./api";

export async function checkServerHealth() {

    const response = await api.get("/api/health");

    return response.data;

}
