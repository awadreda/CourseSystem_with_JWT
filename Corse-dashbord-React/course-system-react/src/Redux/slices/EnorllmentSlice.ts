import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { EnrollStudentInCourseAsync, UnenrollStudentInCourseAsync } from "../apis/EnorllmentAPI"



interface EnorllmentState {
  enrolled: string[]
  status: 'loading' | 'succeeded' | 'failed' | 'idle'
  errors: string | null
  Enorllmentmessage: string | undefined

}

const initialState: EnorllmentState = {
  enrolled: [],
  status: 'succeeded',
  errors: null,
  Enorllmentmessage: ""
}


export const EnorllStudenttoCourseSlice = createAsyncThunk(
  `/Enorllment/EnorllStudenttoCourse`,
  async (data: { studentId: string, courseId: string }) => {
    const response = await EnrollStudentInCourseAsync(data.studentId, data.courseId);
    console.log('student in  Slice EnorllStudenttoCourse:', response);
    return response;
  }
)

export const UnEnrollStudentInCourse = createAsyncThunk(
  `/Enorllment/UnEnrollStudentInCourse`,
  async (data: { studentID: string, courseID: string }) => {
    const response = await UnenrollStudentInCourseAsync(data.studentID, data.courseID);
    console.log('student in  Slice EnorllStudenttoCourse:', response);
    return response;
  }
)



export const EnrollmentSlice = createSlice({
  name: 'Enorllment',
  initialState,
  reducers: {
    setCurrentEnorllment: (state, action) => {
      state.enrolled = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(EnorllStudenttoCourseSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.Enorllmentmessage = action.payload
    }).addCase(EnorllStudenttoCourseSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.Enorllmentmessage = action.error.message
    }).addCase(EnorllStudenttoCourseSlice.pending, (state, action) => {
      state.Enorllmentmessage = "loading"
    })

    // UnEnroll
    builder.addCase(UnEnrollStudentInCourse.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.Enorllmentmessage = action.payload
    }).addCase(UnEnrollStudentInCourse.rejected, (state, action) => {
        state.status = 'failed'
      state.Enorllmentmessage = action.error.message
    }).addCase(UnEnrollStudentInCourse.pending, (state, action) => {
            state.status = 'loading'
      state.Enorllmentmessage = "loading"
    
    })
    
  }
})









export const { setCurrentEnorllment } = EnrollmentSlice.actions;
export default EnrollmentSlice.reducer;



