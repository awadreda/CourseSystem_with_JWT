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
import type { StudentReadDTO } from '../../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks'
import { DeleteStudent, getAllStudents } from '../../../../Redux/slices/studentSlice'
// import { StudentReadDTO } from '../../../types/types'
// import { DeleteStudent, getAllStudents } from '@/app/redux/slices/studentSlice'
type UserDeleteDialogProps = {
  student: StudentReadDTO
  // onDelete: (userId: string) => void
}

export default function StudentDeleteDialog ({ student }: { student :StudentReadDTO}) {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const studetnApi = useAppSelector(state => state.student)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onDelete = (studentId: string) => {
    dispatch(DeleteStudent(studentId)).then( (response: { meta: { requestStatus: string } }) => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success(`User with ${student.email} deleted successfully`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })

        dispatch(getAllStudents())
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
    onDelete(student.studentID)
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
            Are you sure you want to delete this user {student.email}?
          </DialogContentText>
          ;
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems='center'>
                <Grid>
                  <Avatar sx={{ width: 64, height: 64 }}>
                    {student.firstName[0]}
                  </Avatar>
                </Grid>
                <Grid>
                  <Typography variant='h6'>
                    {student.firstName} {student.lastName}
                  </Typography>
                  <Typography color='text.secondary'>{student.gpa} GPA</Typography>
                </Grid>
              </Grid>

              <Typography sx={{ mt: 2 }}>
                <strong>Email:</strong> {student.email}
              </Typography>
              <Typography>
                <strong>User ID:</strong> {student.studentID}
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
