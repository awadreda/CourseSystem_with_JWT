import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'

import userReducer from './slices/userSlice'
import studentReducer from './slices/studentSlice'
import { teacherReducer } from './slices/teacherSlice'
import  courseReducer  from './slices/CoursesSlice'
import  EnrollmentSlice  from './slices/EnorllmentSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
  course: courseReducer,
    student: studentReducer,
    teacher: teacherReducer,
    CourseAssign: EnrollmentSlice,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store


