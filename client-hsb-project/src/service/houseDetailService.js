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
    
    async deleteFileByID(id) {
        const res = await http.delete(`/houseDetail/deleteFileByID/${id}`);
        return res.data;
    },
    async createHouseDetail(data) {
        const res = await http.post(`/houseDetail/createHouseDetail`, data);
        return res.data;
    },
    async updateHouseDetailId(id, data) {
        const res = await http.put(`/houseDetail/updateHouseDetail/${id}`, data);
        return res.data;
    },
    async findAllHoseDetailName() {
        const res = await http.get(`/houseDetail/findAllHoseDetailName`);
        return res.data;
    },
    async deleteHouseDetailId(id) {
        const res = await http.delete(`/houseDetail/deleteHouseDetailId/${id}`);
        return res.data;
    },

    async getInformationByHouseDetail(id) {
        const res = await http.get(`/houseDetail/getInformationByHouseDetail/${id}`);
        return res.data;
    },
    async updateSelectedFile(id) {
        const res = await http.put(`/houseDetail/updateSelectedFile/${id}`);
        return res.data;
    },

    async updateSelectedFileFalse(id) {
        const res = await http.put(`/houseDetail/updateSelectedFileFalse/${id}`);
        return res.data;
    },

    async getSelectedFile(id) {
        const res = await http.get(`/houseDetail/getSelectedFile/${id}`);
        return res.data;
    },
};
