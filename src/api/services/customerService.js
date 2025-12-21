import { apiService } from '../axiosConfig';


export const customerService = {

    async getAllCustomers() {
        return await apiService.get('/customers');
    },


    async createCustomer(customerData) {
        return await apiService.post('/customers', customerData);
    },


    async updateCustomer(id, customerData) {
        return await apiService.put(`/customers/${id}`, customerData);
    },


    async getCustomerById(id) {
        return await apiService.get(`/customers/${id}`);
    },


    async deleteCustomer(id) {
        return await apiService.delete(`/customers/${id}`);
    }
};
