import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Generic API service methods facade
export const apiService = {
    async get(url, config = {}) {
        const response = await api.get(url, config);
        return response.data;
    },

    async post(url, data, config = {}) {
        const response = await api.post(url, data, config);
        return response.data;
    },

    async put(url, data, config = {}) {
        const response = await api.put(url, data, config);
        return response.data;
    },

    async delete(url, config = {}) {
        const response = await api.delete(url, config);
        return response.data;
    },

    async download(url, config = {}) {
        const response = await api.get(url, {
            ...config,
            responseType: 'blob'
        });
        return response.data;
    }
};

export default api;
