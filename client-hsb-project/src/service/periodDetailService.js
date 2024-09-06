import http from '@/http-common';
export default {
    async createPeriodDetail(data) {
        const res = await http.post('/periodDetail/periodDetailCreate', data);
        return res.data;
    },
    async findPeriodDetailById(id) {
        const res = await http.get(`/periodDetail/periodDetailFind/${id}`);
        return res.data;
    },
    async deletePeriodDetailId(id) {
        const res = await http.delete(`/periodDetail/periodDetailDelete/${id}`);
        return res.data;
    },
    async updatePeriodDetailId(data,id) {
        const res = await http.put(`/periodDetail/periodDetailUpdate/${id}`, data);
        return res.data;
    },
    async findAllPeriodName() {
        const res = await http.get('/periodDetail/getPeriodName');
        return res.data;
    },
};
