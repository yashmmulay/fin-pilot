import api from "./api";

export async function checkServerHealth() {

    const response = await api.get("/health");

    return response.data;

}