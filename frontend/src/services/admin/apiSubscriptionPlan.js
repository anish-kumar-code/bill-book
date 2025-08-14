import axiosInstance from "../../utils/axiosInstance";

export const addSubscriptionPlan = async (data) => {
    const response = await axiosInstance.post(`/api/admin/subscription-plan`, data);
    return response;
}

export const getSubscriptionPlan = async (id) => {
    let url;
    if (id) {
        url = `/api/admin/subscription-plan?id=${id}`
    } else {
        url = `/api/admin/subscription-plan`
    }
    const response = await axiosInstance.get(url);
    return response;
}

export const editSubscriptionPlan = async (id,data) => {
    const response = await axiosInstance.patch(`/api/admin/subscription-plan/${id}`, data);
    return response;
}

export const deleteSubscriptionPlan = async (id) => {
    const response = await axiosInstance.delete(`/api/admin/subscription-plan/${id}`);
    return response;
}