import { message } from "antd"
import axiosInstance from "../utils/axiosInstance";

export const getAllSettings = async () => {
    try {
        const response = await axiosInstance.get("/api/admin/setting");
        return response.data;
    } catch (error) {
        message.error("Something went wrong")
    }
}

export const updateSettings = async (formData) => {
    return axiosInstance.patch(`/api/admin/setting`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateLogo = async (formData) => {
    return axiosInstance.patch(`/api/admin/setting/logo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateFavicon = async (formData) => {
    return axiosInstance.patch(`/api/admin/setting/favicon`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const updateAdminCardImage = async (formData) => {
    return axiosInstance.patch(`/api/admin/setting/card`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};