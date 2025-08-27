import axios from "axios";
import type { CourseCreateDTO, CourseUpdateDTO } from "../../types/types";
// import { CourseCreateDTO, CourseUpdateDTO } from "../../../../types/types";




const api = axios.create({
  baseURL: "http://localhost:5174/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
});



export const GetAllCoursesApi = async () => {
  try {
    const response = await api.get(`/Course/GetAllCourses`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}


export const GetCourseByIdApi = async (id: string) => {
  try {
    const response = await api.get(`/Course/GetCourseById/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const GetCoursesTeacherIDApi = async(teacherId : string) => {
  try {
    const response = await api.get(`/Course/GetCoursesTeacherID/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export const GetCoursesByStudentIdApi = async (studentId: string) => {
  try {
    const response = await api.get(`/Course/GetCoursesByStudentId/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export const CreateCourseApi   =  async(courseCreateDTO:CourseCreateDTO) =>
{
  try {
    const response = await api.post(`/Course/CreateCourse`, courseCreateDTO);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
} 



export const  UpdateCourseApi =  async(courseUpdateDTO:CourseUpdateDTO) =>
{
  try {
    const response = await api.put(`/Course/UpdateCourse`, courseUpdateDTO);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}





export  const DeleteCourseApi =  async(courseId:string) =>
{
  try {
    const response = await api.delete(`/Course/DeleteCourse/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}













