import http from '@/http-common';
export default {
    async sendReportNotification(id,customerId) {
        const res = await http.get(`/notification/sendLineReport/${id}/${customerId}`);
        return res.data;
    },

};
