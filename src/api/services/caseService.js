import { apiService } from '../axiosConfig';

export const caseService = {
    async createCase(caseData) {
        return await apiService.post('/cases', caseData);
    },

    async getAllCases() {
        return await apiService.get('/cases');
    },

    async getCaseById(id) {
        return await apiService.get(`/cases/${id}`);
    },

    async updateCase(id, caseData) {
        return await apiService.put(`/cases/${id}`, caseData);
    },

    async deleteCase(id) {
        return await apiService.delete(`/cases/${id}`);
    },

    async downloadPDF(id) {
        const blob = await apiService.download(`/cases/${id}/pdf`);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `case-${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
    }
};
