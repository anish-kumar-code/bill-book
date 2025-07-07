import axiosInstance from "../../utils/axiosInstance";


export const getList = async (type) => {
    return axiosInstance.get(`/api/admin/list`);
};

// export const getList = async () => {
//     try {
//         const response = await axiosInstance.get("/api/admin/list");
//         return response.data;
//     } catch (error) {
//         message.error("Something went wrong")
//     }
// }