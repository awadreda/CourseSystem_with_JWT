import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  
  Box
} from '@mui/material'

import Grid from '@mui/material/GridLegacy'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import { GetAllCoursesSlice } from '../../../Redux/slices/CoursesSlice'
import { Link } from 'react-router'

// --- Types ---
export interface StudentReadDTO {
  studentID: string // uuid
  firstName: string
  lastName: string
  email: string
  role: string
  gpa: number
}

export interface Teacher {
  courses: string[]
  teacherID: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export interface Course {
  courseID: string
  title: string
  description: string
  credits: number
  teacherID: string
  teacher: Teacher
  students: StudentReadDTO[]
}

// --- Mock Data ---
// export const courses: Course[] = [
//   {
//     courseID: 'fd9eb96a-a2ce-4134-1923-08ddb702afee',
//     title: 'Math',
//     description: 'Math is big lol',
//     credits: 60,
//     teacherID: 'b904487b-f557-418f-9995-69bcebd9b8f7',
//     teacher: {
//       courses: ['fd9eb96a-a2ce-4134-1923-08ddb702afee'],
//       teacherID: 'b904487b-f557-418f-9995-69bcebd9b8f7',
//       firstName: 'Awad',
//       lastName: 'Reda',
//       email: 'awad@gmail.com',
//       role: 'Teacher'
//     },
//     students: [
//       {
//         studentID: '11111111-aaaa-4444-bbbb-cccccccc1111',
//         firstName: 'Hossam',
//         lastName: 'Khaled',
//         email: 'hossam.khaled@example.com',
//         role: 'Student',
//         gpa: 3.6
//       },
//       {
//         studentID: '22222222-bbbb-5555-cccc-dddddddd2222',
//         firstName: 'Mona',
//         lastName: 'Ibrahim',
//         email: 'mona.ibrahim@example.com',
//         role: 'Student',
//         gpa: 3.9
//       }
//     ]
//   },
//   {
//     courseID: '9c738ec3-2621-47c6-568a-08ddb704d1dd',
//     title: 'Science',
//     description: 'science bla blabl',
//     credits: 60,
//     teacherID: '19c37ffe-c42d-43ab-ac3f-40dc0d365317',
//     teacher: {
//       courses: [
//         '9c738ec3-2621-47c6-568a-08ddb704d1dd',
//         'c141a9ff-e0de-44e4-c2bb-08ddb7ca4467'
//       ],
//       teacherID: '19c37ffe-c42d-43ab-ac3f-40dc0d365317',
//       firstName: 'Omar',
//       lastName: 'Fahmy',
//       email: 'omar.fahmy@example.com',
//       role: 'Teacher'
//     },
//     students: [
//       {
//         studentID: '33333333-cccc-6666-dddd-eeeeeeee3333',
//         firstName: 'Youssef',
//         lastName: 'Ali',
//         email: 'youssef.ali@example.com',
//         role: 'Student',
//         gpa: 2.8
//       }
//     ]
//   },
//   {
//     courseID: '9e43ce5f-01fb-43aa-c2ba-08ddb7ca4467',
//     title: 'Physics',
//     description: 'An introduction to Physics and basic laws of motion.',
//     credits: 45,
//     teacherID: '1feb7704-9df3-4845-95a2-0dd0a95df66d',
//     teacher: {
//       courses: ['9e43ce5f-01fb-43aa-c2ba-08ddb7ca4467'],
//       teacherID: '1feb7704-9df3-4845-95a2-0dd0a95df66d',
//       firstName: 'Salma',
//       lastName: 'Ali',
//       email: 'salma.ali@example.com',
//       role: 'Teacher'
//     },
//     students: [
//       {
//         studentID: '44444444-dddd-7777-eeee-ffffffff4444',
//         firstName: 'Aya',
//         lastName: 'Mohamed',
//         email: 'aya.mohamed@example.com',
//         role: 'Student',
//         gpa: 3.2
//       }
//     ]
//   },
//   {
//     courseID: 'c141a9ff-e0de-44e4-c2bb-08ddb7ca4467',
//     title: 'English Literature',
//     description: 'Study of classic and modern literary works.',
//     credits: 50,
//     teacherID: '19c37ffe-c42d-43ab-ac3f-40dc0d365317',
//     teacher: {
//       courses: [
//         '9c738ec3-2621-47c6-568a-08ddb704d1dd',
//         'c141a9ff-e0de-44e4-c2bb-08ddb7ca4467'
//       ],
//       teacherID: '19c37ffe-c42d-43ab-ac3f-40dc0d365317',
//       firstName: 'Omar',
//       lastName: 'Fahmy',
//       email: 'omar.fahmy@example.com',
//       role: 'Teacher'
//     },
//     students: []
//   },
//   {
//     courseID: '66e3aa44-069c-4086-c2bc-08ddb7ca4467',
//     title: 'Computer Science',
//     description: 'Fundamentals of computing and programming basics.',
//     credits: 55,
//     teacherID: '104c1724-b12a-40a5-a888-4de420c924e0',
//     teacher: {
//       courses: ['66e3aa44-069c-4086-c2bc-08ddb7ca4467'],
//       teacherID: '104c1724-b12a-40a5-a888-4de420c924e0',
//       firstName: 'Tarek',
//       lastName: 'Youssef',
//       email: 'tarek.youssef@example.com',
//       role: 'Teacher'
//     },
//     students: [
//       {
//         studentID: '55555555-eeee-8888-ffff-aaaaaaaa5555',
//         firstName: 'Karim',
//         lastName: 'Nabil',
//         email: 'karim.nabil@example.com',
//         role: 'Student',
//         gpa: 3.7
//       }
//     ]
//   },
//   {
//     courseID: '259f62bc-0580-46b1-c2bd-08ddb7ca4467',
//     title: 'History',
//     description: 'Exploration of world history from ancient to modern times.',
//     credits: 40,
//     teacherID: 'a0111abc-0aaf-40bc-94b6-7d92e27e7938',
//     teacher: {
//       courses: ['259f62bc-0580-46b1-c2bd-08ddb7ca4467'],
//       teacherID: 'a0111abc-0aaf-40bc-94b6-7d92e27e7938',
//       firstName: 'Nouran',
//       lastName: 'Samir',
//       email: 'nouran.samir@example.com',
//       role: 'Teacher'
//     },
//     students: [
//       {
//         studentID: '66666666-ffff-9999-gggg-bbbbbbbb6666',
//         firstName: 'Sara',
//         lastName: 'Adel',
//         email: 'sara.adel@example.com',
//         role: 'Student',
//         gpa: 3.5
//       }
//     ]
//   }
// ]

interface Props {
  // onAssign: (courseID: string) => void
}

const CourseListTOAssgin
: React.FC<Props> = () => {
  function onAssign(courseID: string): void {
    console.log(courseID)
  }

  const CourseApi = useAppSelector(state => state.course)

  const courses = CourseApi.courses;
  const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(GetAllCoursesSlice())
}, [dispatch])


  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: '#121212', // dark background
        minHeight: '100vh'
      }}
    >
      <Typography
        variant='h4'
        gutterBottom
        sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}
      >
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.courseID}>
            <Card
              sx={{
                bgcolor: '#1e1e1e',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0,0,0,0.6)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 6px 25px rgba(0,0,0,0.8)'
                }
              }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 'bold', mb: 1, color: '#90caf9' }}
                >
                  {course.title}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1, color: '#cfcfcf' }}>
                  {course.description}
                </Typography>
                <Typography variant='body2' sx={{ color: '#aaa' }}>
                  Credits: {course.credits}
                </Typography>
                <Typography variant='body2' sx={{ color: '#aaa' }}>
                  Teacher: {course.teacher.firstName} {course.teacher.lastName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant='contained'
                  fullWidth
                  sx={{
                    bgcolor: '#1976d2',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#1565c0' }
                  }}
                  onClick={() => onAssign(course.courseID)}
                >
                  <Link style={{width: '100%', textDecoration: 'none', color: '#fff'}} to={`${course.courseID}`}>
                  Assign to Course
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CourseListTOAssgin
