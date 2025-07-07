import axiosInstance from "../../utils/axiosInstance";

export const updateUser = async (id, data) => {
    return axiosInstance.patch(`/api/admin/user/${id}`, data);
};