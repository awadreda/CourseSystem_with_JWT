import { UserUpdateDTO, UserReadDTO } from '../../../../types/types';
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5174/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getAllUsersApi = async () => {
  try {
    const response = await api.get(`/User/GetAllUsers`, {
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

export const getUserByIdApi = async (id: string) => {
  try {
    const response = await api.get(
      `/User/GetUserById/${id}
}`,
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

export const getUserByIdForUpdateApi = async (id: string) => {
  try {
    const response = await api.get(`/User/GetUserByIdForUpdate/${id}`, {
      headers: {      
        'Content-Type': 'application/json', 
        Accept: 'text/plain'
      }
    })
    return response.data    
  } catch (error) {
    console.error(error)
  
  }
}

export const getUserByEmailApi = async (email: string) => {
  try {
    const response = await api.get(`/User/GetUserByEmail/${email}`, {
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

export const UpdateUserApi = async (userUpdateDTO: UserUpdateDTO) => {
  try {
    const response = await api.put(`/User/UpdateUser`, userUpdateDTO, {
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

export const updateUserBasicInfoApi = async (userReadDTO: UserReadDTO) => {
  try {
    const response = await api.put(`/User/UpdateUserBasicInfo`, userReadDTO, {
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

export const deleteUserApi = async (id: string) => {
  try {
    const response = await api.delete(`/User/DeleteUser/${id}`, {
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
