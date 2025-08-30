import  type { TeacherDTO, TeacherUpdateBasicInfoDto, TeacherWithUser } from "../../types/types";
// import { get } from 'http';
import { DeleteTeacherApi, getAllTeachersApi, getTeacherByIdApi, getTeacherWithAllDataByEmailApi, UpdateTeacherApi, UpdateTeacherBasicInfoApi } from '../apis/TeacherApis';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




interface TeacherState {
teachers: TeacherDTO[]

status: 'loading' | 'succeeded' | 'failed';
errors: string | null;
teacher: TeacherDTO | null;   
currentTeacher: TeacherDTO | null;
TeacherWithAllDataByTeacherEmail: TeacherWithUser | null

}

const initialState: TeacherState = {
  teachers: [],
  status: 'succeeded',
  errors: null,
  teacher: null,
  currentTeacher: null,
  TeacherWithAllDataByTeacherEmail: null
};


export const getAllTeachersAsync = createAsyncThunk(`/Teacher/GetAllTeachers`, async   () => {
  const response = await getAllTeachersApi();
  if (!response) {
    throw new Error('Failed to fetch teachers');
  }
  if (response.errors) {
    throw new Error(response.errors);
  }
  console.log('Teachers in getAllTeachersAsync:', response);
  return response;
}    
)


export const getTeacherByID = createAsyncThunk(
  `/Teacher/GetTeacherByID`,
  async (id: string) => { 
    const response = await getTeacherByIdApi(id);
    if (!response) {
      throw new Error('Failed to fetch teacher');
    }
    return response;
  }   


);

export const getTeacherByIdForUpdate = createAsyncThunk(  
  `/Teacher/GetTeacherByIDForUpdate`, 
  async (id: string) => {
    const response = await getTeacherByIdApi(id);
    if (!response) {
      throw new Error('Failed to fetch teacher for update');
    }
    return response;
  }

);

export const GetTeacherWithAllInfoAndCoursesAndTeachersByEmail = createAsyncThunk(
  `/Teacher/GetTeacherWithAllInfoAndCoursesAndTeachersByEmail`,
  async (email: string) => {
    const response = await getTeacherWithAllDataByEmailApi(email);
    if (!response) {
      throw new Error('Failed to fetch teacher');
    }
    console.log('Teacher in GetTeacherWithAllInfoAndCoursesAndTeachersByEmail from slice:', response);
    return response as TeacherWithUser;
  }
)


export const updateTeacherAsync = createAsyncThunk(
  `/Teacher/UpdateTeacher`,
  async (teacher: TeacherDTO) => {
    const response = await UpdateTeacherApi(teacher.teacherID);
    if (!response) {
      throw new Error('Failed to update teacher');
    }
    return response;
  }     
);

export  const UpdateBasicTeacherInfo = createAsyncThunk(
  `/Teacher/UpdateBasicTeacherInfo`,
  async (teacher: TeacherUpdateBasicInfoDto) => {
    const response = await UpdateTeacherBasicInfoApi(teacher  );
    if (!response) {
      console.error('Error updating teacher:', response);
      throw new Error('Failed to update teacher');
    }
    return response;
  }     
);




export const DeleteTeacher = createAsyncThunk(
  `/Teacher/DeleteTeacher`,
  async (teacherID: string) => {
    const response = await DeleteTeacherApi(teacherID);
    if (!response) {
      throw new Error('Failed to delete teacher');
    }
    return response;
  } 

);




export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTeachersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachers = action.payload;
      })
      .addCase(getAllTeachersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch teachers';
      })
      // Handle the getTeacherByID actions
      .addCase(getTeacherByID.pending, (state) => {
        state.status = 'loading';
      })  
      .addCase(getTeacherByID.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teacher = action.payload;
      })
      .addCase(getTeacherByID.rejected, (state, action) => {    
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch teacher';
      } ) 
      // Handle the getTeacherByIdForUpdate actions
      .addCase(getTeacherByIdForUpdate.pending, (state) => {  
        state.status = 'loading';
      }
      )
      .addCase(getTeacherByIdForUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTeacher = action.payload;
      })
      .addCase(getTeacherByIdForUpdate.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch teacher for update';  
      })

      // Handle the GetTeacherWithAllInfoAndCoursesAndTeachersByEmail actions
      .addCase(GetTeacherWithAllInfoAndCoursesAndTeachersByEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetTeacherWithAllInfoAndCoursesAndTeachersByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.TeacherWithAllDataByTeacherEmail = action.payload;
      })
      .addCase(GetTeacherWithAllInfoAndCoursesAndTeachersByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to fetch teacher';
      })
      // Handle the updateTeacherAsync actions
      .addCase(updateTeacherAsync.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(updateTeacherAsync.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(teacher => teacher.teacherID === updatedTeacher.teacherID);
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
      })
      .addCase(updateTeacherAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to update teacher';
      })
      // Handle the UpdateBasicStudentInfo actions  
      .addCase(UpdateBasicTeacherInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateBasicTeacherInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(teacher => teacher.teacherID === updatedTeacher.teacherID);
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
      }
      )
      .addCase(UpdateBasicTeacherInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to update teacher basic info';
      } )
      // Handle the DeleteStudent actions
      .addCase(DeleteTeacher.pending, (state) => {
        state.status = 'loading';
      })      
      .addCase(DeleteTeacher.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teacher = action.payload;
      })
      .addCase(DeleteTeacher.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.error.message || 'Failed to delete teacher';
      })  
        
      
  },
});





export const teacherReducer = teacherSlice.reducer;





