import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
// import { UserCreateDTO, UserReadDTO } from 'types/types'
import {
  Alert,
  colors,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
// import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
// import { RegisterNewUser } from '@/'
// import AuthSlice from '../../../src/app/redux/slices/AuthSlice'
import { toast } from 'react-toastify'
// import { getAllUsers } from '@/app/redux/slices/userSlice'
import { RegisterNewUser } from '../../../../Redux/slices/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks'
import { getAllUsers } from '../../../../Redux/slices/userSlice'
import type { UserCreateDTO } from '../../../../types/types'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const BootstrapDialogTitle = styled(DialogTitle)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: 24
  }
}))

export default function AddNewUserDialog () {
  const [open, setOpen] = React.useState(false)
  const [userCreate, setUserCreate] = React.useState<UserCreateDTO>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  })

  const dispatch = useAppDispatch()
  const userApi = useAppSelector(state => state.auth)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    return
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserCreate((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setUserCreate(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(RegisterNewUser(userCreate)).then(response => {
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('User added successfully!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })

        dispatch(getAllUsers())
      }

      if (response.meta.requestStatus === 'rejected') {
        toast.error('Failed to add user', {
          position: 'bottom-right',
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
      <Button
        color='primary'
        variant='outlined'
        sx={{
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '10px',
          width: `fit-content`
        }}
        onClick={handleClickOpen}
      >
        <AddIcon /> add new User
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <BootstrapDialogTitle id='customized-dialog-title'>
          Add New User
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            To add a new user, please enter the required information here.
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
              value={userCreate.firstName}
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
              value={userCreate.lastName}
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
              value={userCreate.email}
              onChange={handleChange}
            />
            <TextField
              required
              margin='dense'
              id='password'
              name='password'
              label='Password'
              type='password'
              fullWidth
              variant='standard'
              value={userCreate.password}
              onChange={handleChange}
            />
            {/* <TextField
              required
              margin='dense'
              id='role'
              name='role'
              label='Role'
              type='text'
              fullWidth
              variant='standard'
              value={userCreate.role}
              onChange={handleChange}
            /> */}

            <InputLabel id='demo-simple-select-label'>Role</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              margin='dense'
              id ='role'
              fullWidth
              color='primary'
              sx={{color:"white"}}

              value={userCreate.role}
              label='Role'
              onChange={handleSelectChange}
            >
              <MenuItem value={'Studnet'}>Studnet</MenuItem>
              <MenuItem value={'Teacher'}>Teacher</MenuItem>
            </Select>

            <DialogActions>
              <Button color='secondary' onClick={handleClose}>
                Cancel
              </Button>
              <Button color='primary' type='submit'>
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  )
}
