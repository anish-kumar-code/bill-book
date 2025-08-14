import axiosInstance from "../../utils/axiosInstance";


export const getUser = async (type) => {
    return axiosInstance.get(`/api/admin/user/list?type=${type}`);
};

export const updateUser = async (id, data) => {
    return axiosInstance.patch(`/api/admin/user/${id}`, data);
};