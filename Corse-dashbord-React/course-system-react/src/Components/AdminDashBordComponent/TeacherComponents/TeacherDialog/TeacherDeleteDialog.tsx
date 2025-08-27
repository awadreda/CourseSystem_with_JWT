import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
// import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'

import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks'
import { DeleteTeacher, getAllTeachersAsync } from '../../../../Redux/slices/teacherSlice'
import type { StudentReadDTO, TeacherDTO } from '../../../../types/types'
// import { StudentReadDTO, TeacherDTO } from '../../../types/types'
// import { DeleteStudent, getAllStudents } from '@/app/redux/slices/studentSlice'
// import { DeleteTeacher, getAllTeachersAsync } from '@/app/redux/slices/teacherSlice'
// import { getAllTeachersApi } from '@/app/redux/apis/TeacherApis'
type UserDeleteDialogProps = {
  student: StudentReadDTO
  // onDelete: (userId: string) => void
}

export default function TeacherDeleteDialog ({ teacher }: { teacher :TeacherDTO}) {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const TeacherApi = useAppSelector(state => state.teacher)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onDelete = (teacherID: string) => {
    dispatch(DeleteTeacher(teacherID)).then( (response: { meta: { requestStatus: string } }) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`User with ${teacher.email} deleted successfully`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })

        dispatch(getAllTeachersAsync())
      }

      if (response.meta.requestStatus === 'rejected') {
        toast.error('Failed to delete user', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    })
  }

  const handleDelete = () => {
    onDelete(teacher.teacherID)
    setOpen(false)
  }

  return (
    <React.Fragment>
      <IconButton color='secondary' onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Delete User'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this user {teacher.email}?
          </DialogContentText>
          ;
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems='center'>
                <Grid>
                  <Avatar sx={{ width: 64, height: 64 }}>
                    {teacher.firstName[0]}
                  </Avatar>
                </Grid>
                <Grid>
                  <Typography variant='h6'>
                    {teacher.firstName} {teacher.lastName}
                  </Typography>
                  {/* <Typography color='text.secondary'>{student.gpa} GPA</Typography> */}
                </Grid>
              </Grid>

              <Typography sx={{ mt: 2 }}>
                <strong>Email:</strong> {teacher.email}
              </Typography>
              <Typography>
                <strong>User ID:</strong> {teacher.teacherID}
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
