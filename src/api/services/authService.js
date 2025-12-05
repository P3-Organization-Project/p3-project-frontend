import { apiService } from '../axiosConfig';

export const authService = {
    async register(userData) {
        return await apiService.post('/users', userData);
    },

    async login(credentials) {
        const response = await apiService.post('/auth/login', credentials);

        // Response is the raw token string
        const token = typeof response === 'string' ? response : response.token;

        if (token) {
            localStorage.setItem('accessToken', token);
        }

        return { token };
    },

    logout() {
        localStorage.removeItem('accessToken');
    }
};
