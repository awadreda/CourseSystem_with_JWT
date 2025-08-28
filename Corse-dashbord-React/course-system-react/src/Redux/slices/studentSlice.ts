import type{ StudentCreateDTO, StudentReadDTO, StudentUpdateDTO, StudentWithUser } from "../../types/types";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateStudentApi, getAllStudentsApi, getStudentByEmailApi, getStudentByIdApi, UpdateStudentApi, DeleteStudentApi, getStudentByIdForUpdateApi, UpdateStudentBasicINfoApi, GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmail } from '../apis/StudentApis';
// import { get } from 'http';
// import { updateUserBasicInfoApi } from "../apis/UsersApis";





interface studentState {
  students: StudentReadDTO[];
  status: 'loading' | 'succeeded' | 'failed' | 'idle';
  errors: string | null;
  student: StudentReadDTO  | StudentUpdateDTO;
  CurrentStudent: StudentReadDTO | null;
  StudentWithAllInfoAndCoursesAndTeachersByStudenEmail: StudentWithUser | null

}

const initialState: studentState = {
  students: [],
  status: 'succeeded',
  errors: null,
  student: {
    studentID: '',
    gpa: 0,
    courses: null,
   
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    
  },
  CurrentStudent: null
  , StudentWithAllInfoAndCoursesAndTeachersByStudenEmail: null
};




export const getAllStudents = createAsyncThunk(
  `/Student/GetAllStudents`,
  async () => {
    const response = await getAllStudentsApi();
    if (!response) {
      throw new Error('Failed to fetch students');
    }
    if (response.errors) {
      throw new Error(response.errors);
    }
    console.log('response students from getallstudentSlice ', response);

    return response;
  }
);  





export const getStudentByID = createAsyncThunk(
  `/Student/GetStudentByID`,
  async (id: string) => { 
    const response = await getStudentByIdApi(id);
    return response;
  } 

);


export const getStudentByIdForUpdate = createAsyncThunk(
  `/Student/GetStudentByIdForUpdate`,
  async (id: string) => {
    const response = await getStudentByIdForUpdateApi(id);
    if (!response) {
      throw new Error('Failed to fetch student for update');
    }
    if (response.errors) {
      throw new Error(response.errors);
    }
    return response as StudentUpdateDTO;
  }
);  


export const getStudentByEmail = createAsyncThunk(
  `/Student/GetStudentByEmail`,
  async (email: string) => {
    const response = await getStudentByEmailApi(email);
    return response;
  }
);

export const GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmailSlice = createAsyncThunk(
  `/Student/GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmail`,
  async (email: string) => {
    const response = await GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmail(email);
    console.log('student in  Slice GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmail:', response);
    return response as StudentWithUser;
  }
)


export const createStudent = createAsyncThunk(
  `/Student/AddStudent`,
  async (student: StudentCreateDTO) => {  
    const response = await CreateStudentApi(student);
    return response;
  }
);


export const UpdateStudent = createAsyncThunk(
  `/Student/UpdateStudent`,
  async (student: StudentUpdateDTO) => {  
    const response = await UpdateStudentApi(student);
    return response;
  } 
);

export const UpdateBasicStudentInfo = createAsyncThunk(
  `/Student/UpdateStudentBasicInfo`,
  async (student: StudentReadDTO) => {  
    const response = await UpdateStudentBasicINfoApi(student);
    return response;
  } 
)

export const DeleteStudent = createAsyncThunk(
  `/Student/DeleteStudent`,
  async (studentID: string) => {  
    const response = await DeleteStudentApi(studentID);
    return response;
  } 
);


export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setCurrentStudent: (state, action) => {
      state.CurrentStudent = action.payload;
    }
  },
  extraReducers: builder => {
    builder

    // Handle the getAllStudentsApiThunk actions
      .addCase(getAllStudents.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch students';
      })

        // Handle the getStudentByID actions
      .addCase(getStudentByID.pending, state => {
        state.status = 'loading';
      }
      )      
      .addCase(getStudentByID.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(getStudentByID.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch student';
      })  
      // Handle the getStudentByIdForUpdate actions
      .addCase(getStudentByIdForUpdate.pending, state => {
        state.status = 'loading';
      })
      .addCase(getStudentByIdForUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload ;
      })
      .addCase(getStudentByIdForUpdate.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch student for update';
      })

      // Handle the getStudentByEmail actions
      .addCase(getStudentByEmail.pending, state => {
        state.status = 'loading';
      }
      )      
      .addCase(getStudentByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(getStudentByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch student';
      })
      // Handle the GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmail actions
      .addCase(GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmailSlice.pending, state => {
        state.status = 'loading';
      }
      )      
      .addCase(GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmailSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.StudentWithAllInfoAndCoursesAndTeachersByStudenEmail = action.payload;

      })
      .addCase(GetStudentWithAllInfoAndCoursesAndTeachersByStudenEmailSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch student';
        
      })

      // Handle the createStudent actions 
      .addCase(createStudent.pending, state => {
        state.status = 'loading';

      })      
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to create student';
      })

      // Handle the UpdateStudent actions
      .addCase(UpdateStudent.pending, state => {
        state.status = 'loading';
      })      
      .addCase(UpdateStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(UpdateStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to update student';
      })
        // Handle the UpdateBasicStudentInfo actions
      .addCase(UpdateBasicStudentInfo.pending, state => {
        state.status = 'loading';
      })      
      .addCase(UpdateBasicStudentInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(UpdateBasicStudentInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to update student';
      })


      // Handle the DeleteStudent actions
      .addCase(DeleteStudent.pending, state => {
        state.status = 'loading';
      })      
      .addCase(DeleteStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(DeleteStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to delete student';
      })  
  }
});





export const { setCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;













