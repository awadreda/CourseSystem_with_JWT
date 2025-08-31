import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Button,
  Container,
  Grid
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import PersonIcon from '@mui/icons-material/Person'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { GetCoursebyId } from '../../../Redux/slices/CoursesSlice'
import AssaignCourseDailog from '../../../Components/Course/AssaignCourseDailog'

export default function CourseDetails () {
  const { courseId } = useParams<{ courseId: string }>()
  const courseApi = useAppSelector(state => state.course)
  const course = courseApi.CurrentCourse
  const dispatch = useAppDispatch()

  useEffect(() => {
  
    dispatch(GetCoursebyId(courseId??''))
    console.log(courseId)
  
}, [ ])
  
// if (!course || courseApi.status === 'loading') {
//   return (
//     <Box
//       display='flex'
//       justifyContent='center'
//       alignItems='center'
//       minHeight='80vh'
//       color='white'
//     >
//       Loading...
//     </Box>
//   )
// }


  return (
    <Container maxWidth='md' sx={{ py: 4, color: '#fff' }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: '#1e1e2f',
          borderRadius: 3,
          p: 3,
          mb: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h4' fontWeight='bold'>
            {course?.title}
          </Typography>
          <Chip
            icon={<SchoolIcon sx={{ color: '#90caf9' }} />}
            label={`${course?.credits} credits`}
            sx={{
              bgcolor: '#2e2e42',
              color: '#90caf9',
              fontWeight: 'bold',
              fontSize: '1rem',
              px: 2
            }}
          />
        </Box>
        <Typography
          variant='body1'
          sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}
        >
          {course?.description}
        </Typography>
      </Box>

      {/* Teacher Section */}
      <Card
        sx={{
          bgcolor: '#1e1e2f',
          color: '#fff',
          borderRadius: 3,
          mb: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        <CardContent>
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            Teacher
          </Typography>
          <Box display='flex' alignItems='center'>
            <Avatar sx={{ bgcolor: '#3949ab', mr: 2 }}>
              {course?.teacher.firstName[0]}
            </Avatar>
            <Box>
              <Typography>
                {course?.teacher.firstName} {course?.teacher.lastName}
              </Typography>
              <Typography variant='body2' color='rgba(255,255,255,0.6)'>
                {course?.teacher.email}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Students Section */}
      <Card
        sx={{
          bgcolor: '#1e1e2f',
          color: '#fff',
          borderRadius: 3,
          mb: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        <CardContent>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={2}
          >
            <Typography variant='h6' fontWeight='bold'>
              Students ({course?.students.length})
            </Typography>
            {/* <Button
              variant='contained'
              sx={{
                bgcolor: '#00897b',
                '&:hover': { bgcolor: '#00796b' },
                borderRadius: 2,
                textTransform: 'none'
              }}
              onClick={() =>
                console.log(`Assign clicked for course: ${course?.courseID}`)
              }
            >
              Assign 
            </Button> */}

            <AssaignCourseDailog courseId={course?.courseID ?? ''} studentId='' />
          </Box>

          <List>
            {course?.students.map(s => (
              <ListItem
                key={s.studentID}
                sx={{
                  bgcolor: '#2a2a3d',
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': { bgcolor: '#33334d' }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#00897b' }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${s.firstName} ${s.lastName}`}
                  secondary={`GPA: ${s.gpa}`}
                  secondaryTypographyProps={{ color: '#90caf9' }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  )
}
