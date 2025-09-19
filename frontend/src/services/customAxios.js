import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:5000/api";

export const customAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true, // only needed if backend sets cookies
});

// Add token to Authorization header automatically
customAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("cognitoIdentity");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
