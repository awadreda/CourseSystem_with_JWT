import { StudentCreateDTO, StudentUpdateDTO, UserUpdateDTO, UserCreateDTO } from '../../../../types/types';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5174/api',
  headers: {
    'Content-Type': 'application/json'
  }
})



export const getAllStudentsApi = async () => {
  try {
    const response = await api.get(`/Student/GetAllStudents`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain'
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getStudentByIdApi = async (id: string) => {
  try {
    const response = await api.get(`/Student/GetStudentById/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain'
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getStudentByIdForUpdateApi = async (id: string) => {
  try {
    const response = await api.get(`/Student/GetStudentByIdForUpdate/${id}`, {
      headers: {      
        'Content-Type': 'application/json', 
        Accept: 'text/plain'
      }
    })
    return response.data   
  } catch (error) {
    console.error(error)
    throw error
  } 
}


export const getStudentByEmailApi = async (email: string) => {  
  try {
    const response = await api.get(`/Student/GetStudentByEmail/${email}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain'
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const UpdateStudentApi = async (studentUpdateDTO: StudentUpdateDTO) => {
  try {
    const response = await api.put(
      `/Student/UpdateStudent`,
      {
        studentID: studentUpdateDTO.studentID,
        gpa: studentUpdateDTO.gpa,
        UserUpdateDTO: studentUpdateDTO.UserUpdateDTO
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/plain'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}



export const CreateStudentApi = async (studentCreateDTO: StudentCreateDTO) => {
  try {
    const response = await api.post(
      `/Student/AddStudent`,
      {
        gpa: studentCreateDTO.gpa,
        user: studentCreateDTO.user,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/plain'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}


export const DeleteStudentApi = async (id: string) => {
  try {
    const response = await api.delete(`/Student/DeleteStudent/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain'
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
