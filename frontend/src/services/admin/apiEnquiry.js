import { message } from "antd";
import axiosInstance from "@utils/axiosInstance";

export const getAllEnquiry= async () => {
    try {
        const response = await axiosInstance.get('/api/admin/enquiry') // change this api for enquiry details
        // console.log(response.data.data)
        return response.data;
    } catch (error) {
        // console.log(error)
        message.error('Error fetching user list');
    }
}


//  for create the college id
export const createCollegeId = async (data) => {
  try {
    const response = await axiosInstance.post(
      '/api/admin/college/createId',
      {
        name: data.name,
        collegeId: data.collegeId,
        password: data.collegePassword,
        enqId: data.enqId,
      }
    );
    return response.data;
  } catch (error) {
    message.error('Error creating college ID');
  }
};