import axios from 'axios'
import type { UserLoginDTO, UserRegisterDTO } from '../../types/types'
// import { UserLoginDTO, UserRegisterDTO } from '../../../../types/types'

const api = axios.create({
  baseURL: 'http://localhost:5174/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const LoginApi = async ({
  userToLogn
}: {
  userToLogn: UserLoginDTO
}) => {
  try {
    const response = await api.post(
      `/Auth/Login`,
      { email: userToLogn.email, password: userToLogn.password },
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

export const RegisterApi = async ({
  userToRegister
}: {
  userToRegister: UserRegisterDTO
}) => {
  try {
    const response = await api.post(
      `/Auth/Register`,
      {
        firstName: userToRegister.firstName,
        lastName: userToRegister.lastName,
        email: userToRegister.email,
        password: userToRegister.password,
        role: userToRegister.role
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
