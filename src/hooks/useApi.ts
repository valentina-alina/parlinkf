/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

export function useApi() {

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            "Content-Type": "application/json"
        }
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (response:any) => response,
        async (error:any) => {
            if(error.response && error.response.status === 401) {
                const originalRequest = error.config;

                if(!originalRequest._retry) {
                    originalRequest._retry = true;
                }

                const refreshToken = localStorage.getItem("refreshToken");

                if(refreshToken) {
                    try {
                        const result = await refreshAuthToken(refreshToken);

                        localStorage.setItem("accessToken", result.data.tokens.accessToken);
                        localStorage.setItem("refreshToken", result.data.tokens.refreshToken);

                        originalRequest.headers['Authorization'] = 'Bearer' + result.data.tokens.accesToken;

                        return axios(originalRequest);
                    } catch(error) {
                        location.href = "/"
                    }
                } else {
                    location.href = "/"
                }
            }

            if(error.response && error.response.status === 500) {
                location.href = "/"
            }

            return Promise.reject(error);
        }
    )

    return api;
}

async function refreshAuthToken(refreshToken: string) {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh_token`, {
        refreshToken: refreshToken
    });
    return response;
}