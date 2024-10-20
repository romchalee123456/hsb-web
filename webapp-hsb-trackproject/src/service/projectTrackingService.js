import http from '@/http-common';
export default {
    async getProject() {
        var res = await http.get('/projectTracking/getProject');
        return res.data;
    },
    async getPeriodName() {
        var res = await http.get('/projectTracking/getPeriodName');
        return res.data;
    },
    async findProjectById(id) {
        const res = await http.get(`/projectTracking/findProjectById/${id}`);
        return res.data;
    },
    async findProjectByIdSearchPeriod(id,data) {
        const res = await http.get(`/projectTracking/findProjectByIdSearchPeriod/${id}?periodName=${data}`);
        return res.data;
    },
    async searchProjectByCode(data) {
        const res = await http.get(`/projectTracking/searchAllProject?projectCode=${data}`);
        return res.data;
    },

};
