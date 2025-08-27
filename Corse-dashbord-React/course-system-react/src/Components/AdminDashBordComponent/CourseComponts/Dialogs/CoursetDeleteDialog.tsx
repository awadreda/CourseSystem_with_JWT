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
import { GetAllCoursesSlice } from '../../../../Redux/slices/CoursesSlice'
import { DeleteStudent } from '../../../../Redux/slices/studentSlice'
import type { StudentReadDTO, CourseReadDTO } from '../../../../types/types'
// import { CourseReadDTO, StudentReadDTO } from '../../../types/types'
// import { DeleteStudent, getAllStudents } from '@/app/redux/slices/studentSlice'
// import { GetAllCoursesSlice } from '@/app/redux/slices/CoursesSlice'
type UserDeleteDialogProps = {
  student: StudentReadDTO
  // onDelete: (userId: string) => void
}

export default function CourseDeleteDialog ({ Course }: { Course :CourseReadDTO}) {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const CourseApi = useAppSelector(state => state.course)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onDelete = (CourseID: string) => {
    dispatch(DeleteStudent(CourseID)).then( (response: { meta: { requestStatus: string } }) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`Course with ${Course.title} deleted successfully`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })

        dispatch(GetAllCoursesSlice())
      }

      if (response.meta.requestStatus === 'rejected') {
        toast.error('Failed to delete Course', {
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
    onDelete(Course.courseID)
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
            Are you sure you want to delete this user {Course.title}?
          </DialogContentText>
          ;
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems='center'>
                <Grid>
                  <Avatar sx={{ width: 64, height: 64 }}>
                    {Course.title[0]}
                  </Avatar>
                </Grid>
                <Grid>
                  <Typography variant='h6'>
                    {Course.title} 
                  </Typography>
                  <Typography color='text.secondary'>{Course.credits} Credits</Typography>
                </Grid>
              </Grid>

              <Typography sx={{ mt: 2 }}>
                <strong>Students Number:</strong> {Course.students.length}
              </Typography>
              <Typography>
                <strong>Course ID:</strong> {Course.courseID}
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
