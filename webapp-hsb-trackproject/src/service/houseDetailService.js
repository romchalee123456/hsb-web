import http from '@/http-common';
export default {

    async findAllHouseDetail(id) {
        const res = await http.get(`/houseDetail/findAllHouseDetail/${id}`);
        return res.data;
    },

    async findHouseDetailById(id) {
        const res = await http.get(`/houseDetail/findHouseDetailById/${id}`);
        return res.data;
    },

    async findAllFileByHouseDetail(id) {
        const res = await http.get(`/houseDetail/findAllFileByHouseDetail/${id}`);
        return res.data;
    },

};
