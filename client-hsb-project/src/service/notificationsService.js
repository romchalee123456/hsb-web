import http from '@/http-common';
export default {
    async sendReportNotification(id,customerId) {
        const res = await http.get(`/notification/sendLineReport/${id}/${customerId}`);
        return res.data;
    },
    async getAllUserLineIds() {
        const res = await http.get(`/notification/getAllUserLineIds`);
        return res.data;
    },

};
