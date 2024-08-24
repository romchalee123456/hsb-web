import http from '@/http-common';
export default {
    async getAllUser() {
        var res = await http.get('/auth/getUser');
        return res.data;
    },
    async getDefult() {
        var res = await http.get('/auth/getUserDufult');
        return res.data;
    },
    async insertUser(data) {
        var res = await http.post('/auth/signup', data);
        return res.data;
    },
    async getUserId(id) {
        var res = await http.get(`/auth/getUser/${id}`);
        return res.data;
    },
    async DeleteUserId(id) {
        var res = await http.delete(`/auth/deleteUser/${id}`);
        return res.data;
    },
    async UpdateUser(data,id) {
        var res = await http.post(`/auth/update/${id}`, data);
        return res.data;
    },
};
