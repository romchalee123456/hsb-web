import http from '@/http-common-report';
export default {

    async getSelectedFile(id) {
        const res = await http.get(`/houseDetail/getSelectedFile/${id}`);
        return res.data;
    },

    async getInformationByHouseDetail(id) {
        const res = await http.get(`/houseDetail/getInformationByHouseDetail/${id}`);
        return res.data;
    },

    async findCustomerById(id) {
        const res = await http.get(`/customer/customerFind/${id}`);
        return res.data;
    },
    
};
