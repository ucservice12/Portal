import { customAxios } from "./customAxios";

export async function callApi(endpoint, payload = {}, options = {}) {
    const { method = "post", saveToLocalStorage = false, storageKey = "userData" } = options;

    try {
        const response = await customAxios({
            url: endpoint,
            method,
            data: payload,
        });

        const data = response.data;

        if (saveToLocalStorage) {
            localStorage.setItem(storageKey, JSON.stringify(data));
        }

        return data;
    } catch (error) {
        console.error(`API call failed: ${endpoint}`, error);
        throw error;
    }
}
