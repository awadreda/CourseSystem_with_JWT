import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { UserReadDTO } from '../../../types/types'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

export default function UserEditDialog ({ user }: { user: UserReadDTO }) {
  const [open, setOpen] = React.useState(false)
  const [firstName, setFirstName] = React.useState(user.firstName)
  const [lastName, setLastName] = React.useState(user.lastName)
  const [email, setEmail] = React.useState(user.email)
  const [role, setRole] = React.useState(user.role)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries((formData as any).entries())
    // const email = formJson.email
    console.log(formJson)
    handleClose()
  }

  return (
    <React.Fragment>
      <IconButton color="primary" onClick={handleClickOpen}>
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
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
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
              value={lastName}
              onChange={event => setLastName(event.target.value)}
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
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              required
              margin='dense'
              id='role'
              name='role'
              label='Role'
              type='text'
              fullWidth
              variant='standard'
              value={role}
              onChange={event => setRole(event.target.value)}
            />
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
