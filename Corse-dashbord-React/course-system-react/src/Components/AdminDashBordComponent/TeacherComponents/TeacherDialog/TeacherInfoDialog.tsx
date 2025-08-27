import * as React from 'react'
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
import type { TeacherDTO } from '../../../../types/types'
// import { StudentReadDTO, TeacherDTO } from '../../../types/types'



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export default function TeacherInfoDialog({teacher}:{teacher:TeacherDTO}) {
  const [open, setOpen] = React.useState(false)

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
          Teacher Information
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
                    {teacher.firstName[0]}
                  </Avatar>
                </Grid>
                <Grid>
                  <Typography variant='h6'>
                    {teacher.firstName} {teacher.lastName}
                  </Typography>
                  <Typography color='text.secondary'>
                    {/* {student.gpa} GPA */}
                  </Typography>
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
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}
