import { message } from "antd";
import axiosInstance from "@utils/axiosInstance";

export const getAllCollege= async () => {
    try {
        const response = await axiosInstance.get('/api/admin/college') // change this api for college details
        // console.log(response.data.data)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching college list');
    }
}
export const UpdateCollegeDetails = async (formData,id) => {
    try {
        const response = await axiosInstance.patch(`/api/admin/college/${id}`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
        return response.data;
    } catch (error) {
        console.error('Error creating college ID:', error);
        throw error; // Re-throw the error for further handling
    }
}
//  this  id for get the single data of the college
export const getCollegeDataById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/admin/college/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error creating college ID:', error);
        throw error; // Re-throw the error for further handling
    }
}