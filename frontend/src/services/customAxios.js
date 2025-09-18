import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:5000/api";

console.log("API_URL ----", API_URL);

export const customAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
