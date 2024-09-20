import http from '@/http-common';
export default {



    async createProject(data) {
        const res = await http.post('/notification/createNewNotification', data);
        return res.data;
    },



};
