import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
// import { UserReadDTO, UserUpdateDTO } from '../../../types/types'
import {
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
// import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
// import { getAllUsers, UpdatUser } from '@/app/redux/slices/userSlice'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../../Redux/hooks'
import { UpdatUser, getAllUsers } from '../../../../Redux/slices/userSlice'
import type { UserUpdateDTO } from '../../../../types/types'
import type { UserReadDTO } from './UserInfoDialog'
// import { get } from 'http'

export default function UserEditDialog ({ user }: { user: UserReadDTO }) {
  const [open, setOpen] = React.useState(false)

  const dispatch = useAppDispatch()
  const userApi = useAppSelector(state => state.user)
  const [userToUpdate, setUserToUpdate] = React.useState<UserUpdateDTO>({
    userID: user.userID,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '', // Password is not required for update
    role: user.role
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserToUpdate(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setUserToUpdate(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // const formJson = Object.fromEntries((formData as any).entries())
    // // const email = formJson.email
    // console.log(formJson)
    dispatch(UpdatUser(userToUpdate)).then(() => {
      if (userApi.status === 'succeeded') {
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
        dispatch(getAllUsers())
      }

      if (userApi.status === 'succeeded') {
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
        dispatch(getAllUsers())
      }

      if (userApi.status === 'failed') {
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
              value={userToUpdate.firstName}
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
              value={userToUpdate.lastName}
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
              value={userToUpdate.email}
              onChange={handleChange}
            />

            <TextField
              margin='dense'
              id='password'
              name='password'
              label='Password (leave blank to keep current password)'
              type='password'
              fullWidth
              variant='standard'
              value={userToUpdate.password}
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
              value={userToUpdate.role}
              onChange={handleChange}
            /> */}

            <InputLabel id='demo-simple-select-label'>Role</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={userToUpdate.role}
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
