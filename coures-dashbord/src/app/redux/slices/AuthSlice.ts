import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserReadDTO, UserRegisterDTO } from '../../../../types/types'
import { RegisterApi } from '../apis/AuthApis'

interface AuthState {
  user: UserReadDTO | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  token: null
}

export const RegisterNewUser = createAsyncThunk(
  'auth/Register',
  async (userToRegister: UserRegisterDTO) => {
    const response = await RegisterApi({ userToRegister })
    return response
  }
)

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetAuthState: state => {
      state.user = null
      state.status = 'idle'
      state.error = null
      state.token = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(RegisterNewUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(RegisterNewUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(RegisterNewUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to register user'
      })
  }
})


export const { resetAuthState } = AuthSlice.actions
export default AuthSlice.reducer