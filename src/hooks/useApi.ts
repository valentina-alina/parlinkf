import axios, { AxiosInstance } from 'axios';

export function useApi() {

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            "Content-Type": "application/json"
        }
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("access_token");

        // token ? config.headers["Authorization"] = "Bearer" + token: '';
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });

    return api;
}