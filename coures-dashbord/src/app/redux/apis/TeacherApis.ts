import axios from "axios";



const api = axios.create({
  baseURL: 'http://localhost:5174/api',
  headers: {
    'Content-Type': 'application/json'
  }
})



export const getAllTeachersApi = async () => {
  try {
    const response = await api.get(`/Teacher/GetAllTeachers`, {
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




export const getTeacherByIdApi = async (id: string) => {
  try {
    const response = await api.get(`/Teacher/GetTeacherByID/${id}`, {
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


export const getTeacherByIdForUpdateApi = async (id: string) => {
  try {
    const response = await api.get(`/Teacher/GetTeacherByIDForUpdate/${id}`, {
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


export const getTeacherByEmailApi = async (email: string) => {
  try {
    const response = await api.get(`/Teacher/GetTeacherByEmail/${email}`, {
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

export const  CreateTeacherApi = async (teacher: any) => {
  try {
    const response = await api.post(`/Teacher/CreateTeacher`, teacher, {
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

export const UpdateTeacherApi = async (teacher: any) => {
  try {
    const response = await api.put(`/Teacher/UpdateTeacher  `, teacher, {
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

export const UpdateTeacherBasicInfoApi   = async (teacher: any) => {
  try {
    const response = await api.put(`/Teacher/UpdateTeacherBasicInfo`, teacher, {
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

export const DeleteTeacherApi = async (id: string) => {
  try {
    const response = await api.delete(`/Teacher/DeleteTeacher/${id}`, {
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



































