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
    
    
};
