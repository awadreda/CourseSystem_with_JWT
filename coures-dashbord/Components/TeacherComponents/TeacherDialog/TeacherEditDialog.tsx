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
import { StudentReadDTO, StudentUpdateBasicInfoDTO, StudentUpdateDTO, TeacherDTO, TeacherUpdateBasicInfoDto } from '../../../types/types'
import { getAllStudents, getStudentByIdForUpdate, UpdateBasicStudentInfo, UpdateStudent } from '@/app/redux/slices/studentSlice'
import { current } from '@reduxjs/toolkit'
import { UpdateStudentBasicINfoApi } from '@/app/redux/apis/StudentApis'
import { getAllTeachersAsync, UpdateBasicTeacherInfo } from '@/app/redux/slices/teacherSlice'

export default function TeacherEditDialog ({ teacher }: { teacher: TeacherDTO }) {
  const [open, setOpen] = React.useState(false)

  const dispatch = useAppDispatch()
  const studentApi = useAppSelector(state => state.student)
  // const CurrentStudent = studentApi.CurrentStudent
  const [teacherToUpdate, setTeacherToUpdate] = React.useState<TeacherUpdateBasicInfoDto>({
  teacherID: teacher.teacherID,

      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      role: teacher.role ,
    
  })
  
  //   


  const handleClickOpen = () => {
    console.log('OPEN CLICKED') 

    setOpen(true)
   
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setTeacherToUpdate(prev => ({
      ...prev,
    [name]: value
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setTeacherToUpdate(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
   
    dispatch(UpdateBasicTeacherInfo(teacherToUpdate)).then((res) => {

      console.log('Update response:', res)
      if (studentApi.status === 'succeeded') {

        console.log('User updated successfully', teacherToUpdate)
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
        dispatch(getAllTeachersAsync())
      }

      

      if (studentApi.status === 'failed') {
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
              id='firstName'
              name='firstName'
              label='First Name'
              type='text'
              fullWidth
              variant='standard'
              value={teacherToUpdate.firstName}
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='lastName'
              name='lastName'
              label='Last Name'
              type='text'
              fullWidth
              variant='standard'
              value={teacherToUpdate.lastName}
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='email'
              name='email'
              label='Email Address'
              type='email'
              fullWidth
              variant='standard'
              value={teacherToUpdate.email}
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
              value={teacherToUpdate.gpa}
              onChange={handleChange} 
            /> */}

        

            <InputLabel id='demo-simple-select-label'>Role</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={teacherToUpdate.role}
              label='Role'
              onChange={handleSelectChange}
            >
              <MenuItem value={'Studnet'}>Studnet</MenuItem>
              <MenuItem value={'Teacher'}>Teacher</MenuItem>
            </Select>
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





















