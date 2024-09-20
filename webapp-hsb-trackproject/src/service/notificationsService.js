import http from '@/http-common';
export default {

    async createNewNotification(data) {
        const res = await http.post('/notification/createNewNotification', data);
        return res.data;
    },
    async findAllNotification() {
        const res = await http.get(`/notification/findAllNotification`);
        return res.data;
    },
    async findNotificationById(id) {
        const res = await http.get(`/notification/findNotificationById/${id}`);
        return res.data;
    },
    async approveNotification(id,data) {
        const res = await http.post(`/notification/approveNotification/${id}`,data);
        return res.data;
    },
    async sendBackNotification(id,data) {
        const res = await http.post(`/notification/sendBackNotification/${id}`,data);
        return res.data;
    },
    async findAllNotificationHistory(id) {
        const res = await http.get(`/notification/findAllNotificationHistory/${id}`);
        return res.data;
    },


};
