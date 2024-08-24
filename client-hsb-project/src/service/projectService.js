import http from '@/http-common';
export default {

    async getAllProject() {
        var res = await http.get('/project/getProject');
        return res.data;
    },

    async createProject(data) {
        var res = await http.post('/project/projectCreate', data);
        return res.data;
    },
    async findProjectById(id) {
        var res = await http.get(`/project/projectFind/${id}`);
        return res.data;
    },
    async deleteProjectId(id) {
        var res = await http.delete(`/project/projectDelete/${id}`);
        return res.data;
    },
    async updateProjectId(data,id) {
        var res = await http.put(`/project/projectUpdate/${id}`, data);
        return res.data;
    },


};
