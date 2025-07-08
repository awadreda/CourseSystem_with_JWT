import * as React from 'react'
import { useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  Card,
  CardContent,
  Avatar
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { useDispatch } from 'react-redux'
import {
  getAllUsers,
  getUserByID,
  UpdatUser
} from '@/app/redux/slices/userSlice'

// نوع البيانات (UserReadDTO)
export interface UserReadDTO {
  userID: string
  firstName: string
  lastName: string
  email: string
  role: string
}

// دي بيانات تجريبية
const user: UserReadDTO = {
  userID: 'e3b0c442-98fc-1fcf-bc4c-000000000001',
  firstName: 'Ahmed',
  lastName: 'Samir',
  email: 'ahmed.samir@example.com',
  role: 'Admin'
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function UserInfoDialog ({user}:{user:UserReadDTO}) {
  const [open, setOpen] = React.useState(false)
  const userApi = useAppSelector(state => state.user)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  

  return (
    <React.Fragment>
      <IconButton color='primary' onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          User Information
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={theme => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Grid container spacing={2} alignItems='center'>
                <Grid>
                  <Avatar sx={{ width: 64, height: 64 }}>
                    {user.firstName[0]}
                  </Avatar>
                </Grid>
                <Grid>
                  <Typography variant='h6'>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography color='text.secondary'>
                    {user.role}
                  </Typography>
                </Grid>
              </Grid>

              <Typography sx={{ mt: 2 }}>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography>
                <strong>User ID:</strong> {user.userID}
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
