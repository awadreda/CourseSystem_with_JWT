// import { errors } from './../../../../node_modules/immer/src/utils/errors'
import type { UserReadDTO, UserUpdateDTO } from '../../types/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteUserApi,
  getAllUsersApi,
  getUserByEmailApi,
  getUserByIdApi,
  getUserByIdForUpdateApi,
  UpdateUserApi
} from '../apis/UsersApis'

interface UserState {
  users: UserReadDTO[]
  status:  'loading' | 'succeeded' | 'failed'
  errors: string | null
  user: UserReadDTO
  CurrentUser: UserReadDTO | null
}

const initialState: UserState = {
  users: [],
  status: 'succeeded',
  errors: null,
  user: {
    userID: '',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  },
  CurrentUser: null
}

export const getAllUsers = createAsyncThunk(`/User/GetAllUsers`, async () => {
  const response = await getAllUsersApi()
  if (!response) {
    throw new Error('Failed to fetch users')
  }
  if (response.errors) {
    throw new Error(response.errors)
  }
  console.log('response users from getalluserSLice ', response)

  return response
})

export const getUserByID = createAsyncThunk(
  `/User/GetUserByID`,
  async (id: string) => {
    const response = await getUserByIdApi(id)

    return response
  }
)

export const getUserByIdForUpdate = createAsyncThunk(
  `/User/GetUserByIdForUpdate`,
  async (id: string) => {
    const response = await getUserByIdForUpdateApi(id)
    if (!response) {
      throw new Error('Failed to fetch user for update')
    }
    if (response.errors) {  
      throw new Error(response.errors)
    }
    return response
  }
)



export const getUserByEmail = createAsyncThunk(
  `/User/GetUserByEmail`,
  async (email: string) => {
    const response = await getUserByEmailApi(email)

    return response
  }
)

export const UpdatUser = createAsyncThunk(
  `/User/UpdateUser`,
  async (userUpdateDTO: UserUpdateDTO) => {
    const response = await UpdateUserApi(userUpdateDTO)

    return response
  }
)


export const UpdateBasicUserInfo = createAsyncThunk(
  `/User/UpdateBasicUser`,
  async (userUpdateDTO: UserUpdateDTO) => {
    const response = await UpdateUserApi(userUpdateDTO)

    return response
  }
)

export const deleteUser = createAsyncThunk(
  `/User;/DeleteUser`,
  async (id: string) => {
    const response = await deleteUserApi(id)

    return response
  }
)   



const UserSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUsers.pending, state => {
        state.status = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message || 'Faild to fetch users'
      })
      // handle getuserbyid
      .addCase(getUserByID.pending, state => {
        state.status = 'loading'
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message || 'Faild to fetch user'
      })
      // handle getuserbyidforupdate

      .addCase(getUserByIdForUpdate.pending, state => {
        state.status = 'loading'  

      })
      .addCase(getUserByIdForUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(getUserByIdForUpdate.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message || 'Faild to fetch user for update'
      })

      // handle getuserbyemail

      .addCase(getUserByEmail.pending, state => {
        state.status = 'loading'
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.CurrentUser = action.payload
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message || 'Faild to fetch user'
      })
      // handle update user
      .addCase(UpdatUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(UpdatUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(UpdatUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message || 'Faild to fetch user'
      })
      // handle updateBasic user
      .addCase(UpdateBasicUserInfo.pending, state => {
        state.status = 'loading'
      })
      .addCase(UpdateBasicUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(UpdateBasicUserInfo.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message || 'Faild to fetch user'
      })

      // handle delete user
      .addCase(deleteUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message || 'Faild to fetch user'
      })
  }
})


export default UserSlice.reducer    
