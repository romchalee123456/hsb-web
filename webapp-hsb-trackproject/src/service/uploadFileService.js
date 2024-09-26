import http from '@/http-common';
export default {
    async UploadFileHouseDetail(data) {
        const res = await http.post('/uploadFile/upload', data);
        return res.data;
    }
};
