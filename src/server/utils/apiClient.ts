import {config} from "dotenv";
import axios, {AxiosError} from 'axios';

config({})

export const apiClient = axios.create({
    baseURL: process.env.SERVER_URL,
    timeout: 29000,
    headers: {
        'Content-Type': 'application/json',
        // 'X-Proxy-Source': 'next-express-gateway'
    }
});

// Global request interceptor
apiClient.interceptors.request.use((config) => {
    // Add mandatory headers to EVERY request
    // config.headers['x-api-key'] = process.env.BACKEND_API_KEY!;
    // config.headers['x-forwarded-for'] = config.headers['x-forwarded-for'] || 'unknown';
    return config;
});

// Global error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.code === 'ECONNABORTED') {
            return Promise.reject({code: 'TIMEOUT', message: 'Backend request timed out'});
        }
        return Promise.reject(error);
    }
);
