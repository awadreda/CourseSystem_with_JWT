'use client'
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Card,
  CardContent,
  Divider,
  // Grid,
  Stack,
  LinearProgress,
  // Grid
} from '@mui/material'

import Grid from '@mui/material/GridLegacy'


import { School, Email, MenuBook, People } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { useEffect } from 'react'
import { getTeacherByEmailApi, getTeacherWithAllDataByEmailApi } from '../../../Redux/apis/TeacherApis'
import { GetTeacherWithAllInfoAndCoursesAndTeachersByEmail } from '../../../Redux/slices/teacherSlice'

// const teacherData = {
//   teacherID: 'b904487b-f557-418f-9995-69bcebd9b8f7',
//   user: {
//     firstName: 'Awad',
//     lastName: 'Reda',
//     email: 'awad@gmail.com',
//     role: 'Teacher'
//   },
//   courses: [
//     {
//       courseID: 'fd9eb96a-a2ce-4134-1923-08ddb702afee',
//       title: 'Math',
//       description: 'Math is big lol',
//       credits: 60,
//       students: [
//         { studentID: '1', firstName: 'Omar', lastName: 'Mahmoud', gpa: 3.3 },
//         { studentID: '2', firstName: 'Tamer', lastName: 'Nabil', gpa: 1.8 },
//         { studentID: '3', firstName: 'Ahmed', lastName: 'Farse', gpa: 1 },
//         { studentID: '4', firstName: 'Laila', lastName: 'Waleed', gpa: 1.4 },
//         { studentID: '5', firstName: 'Mona', lastName: 'Khaled', gpa: 3.4 },
//         { studentID: '6', firstName: 'Farida', lastName: 'Tarek', gpa: 2.5 }
//       ]
//     },
//     {
//       courseID: 'b12de88a-a2ce-4134-1923-08ddb702af11',
//       title: 'Physics',
//       description: 'Learn about motion, energy, and the universe',
//       credits: 45,
//       students: [
//         { studentID: '7', firstName: 'Hossam', lastName: 'Ali', gpa: 2.9 },
//         { studentID: '8', firstName: 'Salma', lastName: 'Mostafa', gpa: 3.6 },
//         { studentID: '9', firstName: 'Youssef', lastName: 'Amr', gpa: 2.1 },
//         { studentID: '10', firstName: 'Nour', lastName: 'Hany', gpa: 3.0 }
//       ]
//     },
//     {
//       courseID: 'c45fa96a-b2fe-4234-8923-08ddb702af22',
//       title: 'Computer Science',
//       description: 'Introduction to programming and algorithms',
//       credits: 75,
//       students: [
//         { studentID: '11', firstName: 'Karim', lastName: 'Samir', gpa: 3.8 },
//         { studentID: '12', firstName: 'Aya', lastName: 'Khaled', gpa: 3.1 },
//         { studentID: '13', firstName: 'Hager', lastName: 'Mohamed', gpa: 2.7 },
//         { studentID: '14', firstName: 'Ola', lastName: 'Sameh', gpa: 3.5 },
//         { studentID: '15', firstName: 'Mostafa', lastName: 'Said', gpa: 2.3 }
//       ]
//     },
//     {
//       courseID: 'd87eb77a-d3ce-4434-9823-08ddb702af33',
//       title: 'Chemistry',
//       description: 'Study of matter, reactions, and the periodic table',
//       credits: 50,
//       students: [
//         { studentID: '16', firstName: 'Sherif', lastName: 'Adel', gpa: 2.0 },
//         { studentID: '17', firstName: 'Mariam', lastName: 'Hesham', gpa: 3.9 },
//         { studentID: '18', firstName: 'Ali', lastName: 'Gamal', gpa: 1.7 },
//         { studentID: '19', firstName: 'Nada', lastName: 'Ibrahim', gpa: 2.8 }
//       ]
//     }
//   ]
// }

export default function TeacherInfoPage () {
  // const { user, courses } = teacherData
  
  const teacherApi =useAppSelector((state) => state.teacher)
  
  const teacher = teacherApi.TeacherWithAllDataByTeacherEmail
  const totalCredits = teacher?.courses?.reduce((sum, c) => sum + c.credits, 0)

  const dispatch = useAppDispatch()


  useEffect (() => {
    dispatch(GetTeacherWithAllInfoAndCoursesAndTeachersByEmail("awad@gmail.com"))
  }, [])


  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #00695c 0%, #004d40 100%)',
          color: 'white',
          borderRadius: 3
        }}
      >
        <Box display='flex' alignItems='center' gap={3}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'rgba(255,255,255,0.2)',
              fontSize: '2rem'
            }}
          >
            {teacher?.user.firstName[0]}
            {teacher?.user.lastName[0]}
          </Avatar>
          <Box flex={1}>
            <Typography variant='h4' fontWeight='bold' gutterBottom>
              {teacher?.user.firstName} {teacher?.user.lastName}
            </Typography>
            <Stack direction='row' spacing={2} alignItems='center' mb={2}>
              <Chip
                icon={<School />}
                label={teacher?.user.role}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Box display='flex' alignItems='center' gap={1}>
                <Email fontSize='small' />
                <Typography variant='body2'>{teacher?.user.email}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {/* Stats */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant='h6' fontWeight='bold' gutterBottom>
                Teaching Overview
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant='h5' fontWeight='bold' color='primary'>
                {teacher?.courses?.length} Courses
              </Typography>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                Currently teaching
              </Typography>
              <Typography variant='h6' fontWeight='bold' color='primary'>
                {totalCredits} Credits
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Total credits covered
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Courses */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Box display='flex' alignItems='center' gap={2} mb={3}>
              <MenuBook color='primary' />
              <Typography variant='h6' fontWeight='bold'>
                Courses ({teacher?.courses?.length})
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {teacher?.courses?.map((course, index) => {
                const topStudents = [...course.students]
                  .sort((a, b) => b.gpa - a.gpa)
                  .slice(0, 3)
                return (
                  <Grid item xs={12} key={index}>
                    <Card
                      variant='outlined'
                      sx={{
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          display='flex'
                          justifyContent='space-between'
                          alignItems='start'
                          mb={2}
                        >
                          <Typography
                            variant='h6'
                            fontWeight='bold'
                            color='primary'
                          >
                            {course.title}
                          </Typography>
                          <Chip
                            label={`${course.credits} Credits`}
                            size='small'
                            color='primary'
                            variant='outlined'
                          />
                        </Box>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          mb={2}
                        >
                          {course.description}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box display='flex' alignItems='center' gap={1} mb={2}>
                          <People fontSize='small' color='action' />
                          <Typography variant='body2' color='text.secondary'>
                            {course.students.length} Students
                          </Typography>
                        </Box>
                        <Typography variant='subtitle2' fontWeight='bold'>
                          Top Students:
                        </Typography>
                        {topStudents.map(s => (
                          <Typography
                            key={s.studentID}
                            variant='body2'
                            color='text.secondary'
                          >
                            {s.firstName} {s.lastName} (GPA: {s.gpa}) 
                                    
                          </Typography>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
