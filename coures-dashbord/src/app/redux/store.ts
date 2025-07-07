import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // course: courseReducer,
    // student: studentReducer,
    // teacher: teacherReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
