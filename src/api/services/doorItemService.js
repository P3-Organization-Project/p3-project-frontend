import { apiService } from '../axiosConfig';

export const doorItemService = {
    async createDoorItem(doorItemData) {
        return await apiService.post('/doorItems', doorItemData);
    },

    async getDoorItemById(id) {
        return await apiService.get(`/doorItems/${id}`);
    },

    async updateDoorItem(id, doorItemData) {
        return await apiService.put(`/doorItems/${id}`, doorItemData);
    },

    async deleteDoorItem(id) {
        return await apiService.delete(`/doorItems/${id}`);
    }
};
