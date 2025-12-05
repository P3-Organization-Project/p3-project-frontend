import { apiService } from '../axiosConfig';

export const healthCheckService = {
    async getHealth() {
        return await apiService.get('/actuator/health');
    }
};
