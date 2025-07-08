import axios from 'axios'
import { UserLoginDTO } from '../../../../types/types'

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
  userToRegister: UserLoginDTO
}) => {
  try {
    const response = await api.post(
      `/Auth/Register`,
      {
        email: userToRegister.email,
        password: userToRegister.password
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

