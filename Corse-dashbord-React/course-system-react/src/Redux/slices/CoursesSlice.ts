import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CourseReadDTO, CourseReadWithAllInfoDTO, CourseUpdateDTO, } from "../../types/types";
import { GetAllCoursesApi, GetCourseByIdApi, GetCoursesTeacherIDApi, GetCoursesByStudentIdApi, CreateCourseApi, UpdateCourseApi, DeleteCourseApi } from '../apis/CoursesApi';






interface CourseState {
  courses: CourseReadWithAllInfoDTO[]
  status: 'loading' | 'succeeded' | 'failed'
  errors: string | null
  course: CourseReadWithAllInfoDTO | null
  CurrentCourse: CourseReadWithAllInfoDTO | null
}



const initialState: CourseState = {
  courses: [],
  status: 'succeeded',
  errors: null,
  course: null,
  CurrentCourse: null,
};

export const GetAllCoursesSlice = createAsyncThunk(
  `/Courses/GetAllCourses`,
  async () => {
    const response = await GetAllCoursesApi();
    if (!response) {
      throw new Error('Failed to fetch courses');
    }
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response;
  }
)


export const  GetCoursebyId = createAsyncThunk(
  `/Courses/GetCourseById`,
  async (id: string) => {
    const response = await GetCourseByIdApi(id);
    if (!response) {
      throw new Error('Failed to fetch course');
    }
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response;
  }
)


export const GetCoursesTeacherID = createAsyncThunk(`/Courses/GetCoursesTeacherID`, async(teacherId : string) => {
  try {
    const response = await GetCoursesTeacherIDApi(teacherId );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
);

export const GetCoursesByStudent = createAsyncThunk(`/Courses/GetCoursesByStudent`, async (studentid: string) => {
    const response = await GetCoursesByStudentIdApi(studentid);
    if (!response) {
      throw new Error('Failed to fetch course');
    }
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response;
  }
)





export const CreateCourseSlice = createAsyncThunk(
  `/Courses/CreateCourse`,
  async (course: CourseReadDTO) => {
    const response = await CreateCourseApi(course);
    if (!response) {
      throw new Error('Failed to fetch course');
    }
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response;
  }
)



export const UpdateCourseSlice = createAsyncThunk(`/Courses/UpdateCourse`, async(course:CourseUpdateDTO) => {
  try {
    const response = await UpdateCourseApi(course);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
);

export const DeleteCourseSlice = createAsyncThunk(`/Courses/DeleteCourse`,
  async (courseId: string) => {
    const response = await DeleteCourseApi(courseId);
    if (!response) {
      throw new Error('Failed to fetch course');
    }
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response;
  }
)


export const CourseSlice = createSlice({
  
  name:`courses`,
  initialState: initialState,
  reducers:{},
  extraReducers: (builder) => {
      builder
      .addCase(GetAllCoursesSlice.pending, (state) => {
        state.status = 'loading';
      })    
      .addCase(GetAllCoursesSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })    
      .addCase(GetAllCoursesSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch courses';
      })  
      // handle getcoursebyid
      .addCase(GetCoursebyId.pending, (state) => {
        state.status = 'loading';
      })    
      .addCase(GetCoursebyId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
      })    
      .addCase(GetCoursebyId.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch course';
      })
      //handle getCourse by teacherID 
      .addCase(GetCoursesTeacherID.pending, (state) => {
        state.status = 'loading';
      })    
      .addCase(GetCoursesTeacherID.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })    
      .addCase(GetCoursesTeacherID.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch course';
      })
      //handle getCourse by studentID
      .addCase(GetCoursesByStudent.pending, (state) => {
        state.status = 'loading';
      })    
      .addCase(GetCoursesByStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })    
      .addCase(GetCoursesByStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch course';
      })
      // handle create course
      .addCase(CreateCourseSlice.pending, (state) => {
        state.status = 'loading';
      })    
      .addCase(CreateCourseSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
      })    
      .addCase(CreateCourseSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch course';
      })
     
      //handle update course
      .addCase(UpdateCourseSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateCourseSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
      })
      .addCase(UpdateCourseSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch course';
      })
      // handle delete course
      .addCase(DeleteCourseSlice.pending, (state) => {
        state.status = 'loading';
      })    
      .addCase(DeleteCourseSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
      })
      .addCase(DeleteCourseSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch course';
      })
  }
})  




  export default CourseSlice.reducer




