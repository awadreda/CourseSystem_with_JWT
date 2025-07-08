import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { IconButton } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import {
  deleteUser,
  getAllUsers
} from '../../../src/app/redux/slices/userSlice'
import { toast } from 'react-toastify'
type UserDeleteDialogProps = {
  userId: string
  // onDelete: (userId: string) => void
}

export default function UserDeleteDialog ({ userId }: UserDeleteDialogProps) {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()
  const userAPi = useAppSelector(state => state.user)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onDelete = (userId: string) => {
    dispatch(deleteUser(userId)).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('User deleted successfully', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })

        dispatch(getAllUsers())
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
    onDelete(userId)
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
            Are you sure you want to delete this user?
          </DialogContentText>
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
