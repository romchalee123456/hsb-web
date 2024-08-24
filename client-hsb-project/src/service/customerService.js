import http from '@/http-common';
export default {
    async getAllCustomer() {
        const res = await http.get('/customer/getCustomer');
        return res.data;
    },
    async createCustomer(data) {
        const res = await http.post('/customer/customerCreate', data);
        return res.data;
    },
    async findCustomerById(id) {
        const res = await http.get(`/customer/customerFind/${id}`);
        return res.data;
    },
    async deleteCustomerId(id) {
        const res = await http.delete(`/customer/customertDelete/${id}`);
        return res.data;
    },
    async updateCustomerId(data,id) {
        const res = await http.put(`/customer/customerUpdate/${id}`, data);
        return res.data;
    },
};
