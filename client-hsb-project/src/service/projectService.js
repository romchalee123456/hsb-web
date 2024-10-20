import http from '@/http-common';
export default {

    async getAllProject() {
        const res = await http.get('/project/getProject');
        return res.data;
    },

    async searchProjectByCode(data) {
        const res = await http.get(`/project/searchProjectByCode?projectCode=${data}`);
        return res.data;
    },

    async createProject(data) {
        const res = await http.post('/project/projectCreate', data);
        return res.data;
    },
    async findProjectById(id) {
        const res = await http.get(`/project/projectFind/${id}`);
        return res.data;
    },
    async deleteProjectId(id) {
        const res = await http.delete(`/project/projectDelete/${id}`);
        return res.data;
    },
    async updateProjectId(data,id) {
        const res = await http.put(`/project/projectUpdate/${id}`, data);
        return res.data;
    },
    
    async getPeriodDetail(id) {
        const res = await http.get(`/project/getPeriodDetail/${id}`);
        return res.data;
    },
    async updateProjectLocation(data,id) {
        const res = await http.put(`/project/updateProjectLocation/${id}`, data);
        return res.data;
    },


};
