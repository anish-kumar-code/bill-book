import axiosInstance from "../../utils/axiosInstance";


export const getServiceCount = async (type, userId) => {
    return axiosInstance.get(`/api/admin/service/count/${userId}`);
};


export const getService = async (type, userId) => {
    return axiosInstance.get(`/api/admin/service/list/${userId}?type=${type}`);
};

