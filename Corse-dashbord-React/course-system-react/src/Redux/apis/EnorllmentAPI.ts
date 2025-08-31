
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5174/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
});



export const EnrollStudentInCourseAsync = async (studentId: string, courseId: string) => {
  try {
    const response = await api.post(`EnrollCourses/EnrollStudentInCourseAsync,${ studentId }, ${ courseId }`);
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const UnenrollStudentInCourseAsync = async (studentId: string, courseId: string) => {
  try {
    const response = await api.delete(`EnrollCourses/UnenrollStudentInCourseAsync,${ studentId }, ${ courseId }`);
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const AssignCourseToTeacher = async (teacherId: string, courseId: string) => {
  try {
    const response = await api.post(`EnrollCourses/AssignCourseToTeacher,${ teacherId }, ${ courseId }`);
      console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}




