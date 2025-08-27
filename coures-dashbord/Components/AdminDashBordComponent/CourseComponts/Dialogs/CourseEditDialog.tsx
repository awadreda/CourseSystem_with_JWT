import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { getAllUsers, UpdatUser } from '@/app/redux/slices/userSlice'
import { toast } from 'react-toastify'
import { get } from 'http'
import { CourseReadDTO, CourseUpdateDTO, StudentReadDTO, StudentUpdateBasicInfoDTO, StudentUpdateDTO } from '../../../types/types'
import { getAllStudents, getStudentByIdForUpdate, UpdateBasicStudentInfo, UpdateStudent } from '@/app/redux/slices/studentSlice'
import { current } from '@reduxjs/toolkit'
import { UpdateStudentBasicINfoApi } from '@/app/redux/apis/StudentApis'
import { GetAllCoursesSlice, UpdateCourseSlice } from '@/app/redux/slices/CoursesSlice'

export default function CourseEditDialog ({ Course }: { Course: CourseReadDTO }) {
  const [open, setOpen] = React.useState(false)

  const dispatch = useAppDispatch()
  const CourseApi = useAppSelector(state => state.course)
  // const CurrentStudent = studentApi.CurrentStudent
  const [coursenToUpdate, setCourseToUpdate] = React.useState<CourseUpdateDTO>({
  courseID: Course.courseID,
  title: Course.title,
  description: Course.description,
  credits: Course.credits,
  teacherID: Course.teacherID

    
  })
  
  //   React.useEffect(() => {

  //     if( open && student.studentID)
  //     {

  //       dispatch(getStudentByIdForUpdate(student.studentID)).then((response) => {
  //         console.log( "response.payload " , response.payload )
  //       const studentPayload = response.payload as {
  //         studentID?: string | undefined,
  //         gpa: number,
  //         user: {
  //           userID: string,
  //           firstName: string,
  //           lastName: string,
  //           email: string,
  //           password: string,
  //           role: string
  //         },
  //         courses: string[]
  //       };
  //       setstudetnToUpdate({
  //         studentID: studentPayload.studentID ||  '', 
  //         gpa: studentPayload.gpa,
  //         UserUpdateDTO: {
  //           userID: "studentPayload.UserUpdateDTO.userID",
  //           firstName: studentPayload.user.firstName,
  //           lastName: studentPayload.user.lastName,
  //           email: studentPayload.user.email,
  //           password: '', // Password is not required for update
  //           role: studentPayload.user.role
  //         }
  //       })
        
  //     })
  //   }
  
  // }, [open        ])


  const handleClickOpen = () => {
    console.log('OPEN CLICKED') 

    setOpen(true)
   
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCourseToUpdate(prev => ({
      ...prev,
    [name]: value
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setCourseToUpdate(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // const formJson = Object.fromEntries((formData as any).entries())
    // // const email = formJson.email
    // console.log(formJson)
    dispatch(UpdateCourseSlice(coursenToUpdate)).then((res) => {

      console.log('Update response:', res)
      if (CourseApi.status === 'succeeded') {

        console.log('User updated successfully', coursenToUpdate)
        toast.success('User updated successfully', {

          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        dispatch(GetAllCoursesSlice())
      }

      // if (studentApi.status === 'succeeded') {
      //   toast.success('User updated successfully', {
      //     position: 'bottom-left',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'light'
      //   })
      //   dispatch(getAllUsers())
      // }

      if (CourseApi.status === 'failed') {
        toast.error('Failed to update user', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <IconButton color='primary' onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            To edit this user, please enter the new information here.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin='dense'
              id='title'
              name='title'
              label='Title'
              type='text'
              fullWidth
              variant='standard'
              value={coursenToUpdate.title}
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='description'
              name='description'
              label='Description'
              type='text'
              fullWidth
              variant='standard'
              value={coursenToUpdate.description}
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='credits'
              name='credits'
              label='Credits'
              type='number'
              fullWidth
              variant='standard'
              value={   coursenToUpdate.credits}
              onChange={handleChange}
            />

            {/* <TextField
              required
              margin='dense'
              id='gpa'
              name='gpa'
              label='GPA'
              type='number'
              fullWidth
              variant='standard'
              value={coursenToUpdate.}
              onChange={handleChange} 
            /> */}

            {/* <TextField
              required
              margin='dense'
              id='role'
              name='role'
              label='Role'
              type='text'
              fullWidth
              variant='standard'
              value={userToUpdate.role}
              onChange={handleChange}
            /> */}

            {/* <InputLabel id='demo-simple-select-label'>Role</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={studetnToUpdate.role}
              label='Role'
              onChange={handleSelectChange}
            >
              <MenuItem value={'Studnet'}>Studnet</MenuItem>
              <MenuItem value={'Teacher'}>Teacher</MenuItem>
            </Select> */}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit'>Update</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}





















