import http from '@/http-common';
export default {
    async getAllUser() {
        const res = await http.get('/auth/getUser');
        return res.data;
    },
    async insertUser(data) {
        const res = await http.post('/auth/signup', data);
        return res.data;
    },
    async getUserId(id) {
        const res = await http.get(`/auth/getUser/${id}`);
        return res.data;
    },
    async DeleteUserId(id) {
        const res = await http.delete(`/auth/deleteUser/${id}`);
        return res.data;
    },
    async UpdateUser(data,id) {
        const res = await http.post(`/auth/update/${id}`, data);
        return res.data;
    },
    async searchUserByFirstname(data) {
        const res = await http.get(`/auth/searchUserByFirstname?firstname=${data}`);
        return res.data;
    },
};
