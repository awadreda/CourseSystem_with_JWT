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
  LinearProgress,
  Stack
} from '@mui/material'
// import Grid from '@mui/material/Grid';
// import Grid from '@mui/material/Grid';
// import { Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
import Grid from '@mui/material/GridLegacy'

import {
  School,
  Email,
  Grade,
  MenuBook,
  AccountCircle
} from '@mui/icons-material'

const studentData = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'Student'
  },
  gpa: 3.8,
  courses: [
    {
      courseID: 'CSE101',
      title: 'Introduction to Computer Science',
      credits: 3,
      description: 'Learn the basics of computer science.',
      teacher: {
        user: {
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com'
        }
      }
    },
    {
      courseID: 'CSE102',
      title: 'Data Structures',
      credits: 4,
      description: 'Advanced data structures and algorithms.',
      teacher: {
        user: {
          firstName: 'Bob',
          lastName: 'Johnson',
          email: 'bob.johnson@example.com'
        }
      }
    },
    {
      courseID: 'CSE103',
      title: 'Web Development',
      credits: 3,
      description: 'Modern web development techniques.',
      teacher: {
        user: {
          firstName: 'Carol',
          lastName: 'Williams',
          email: 'carol.williams@example.com'
        }
      }
    },
    {
      courseID: 'CSE104',
      title: 'Database Systems',
      credits: 3,
      description: 'Database design and management.',
      teacher: {
        user: {
          firstName: 'David',
          lastName: 'Brown',
          email: 'david.brown@example.com'
        }
      }
    }
  ]
}

const getGPAColor = (gpa: number) => {
  if (gpa >= 3.7) return '#4caf50'
  if (gpa >= 3.0) return '#ff9800'
  return '#f44336'
}

const getGPAProgress = (gpa: number) => (gpa / 4.0) * 100

export default function StudentInfoPage () {
  const { user, gpa, courses } = studentData
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #1a237e 0%, #4a148c 100%)',
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
            {user.firstName[0]}
            {user.lastName[0]}
          </Avatar>
          <Box flex={1}>
            <Typography variant='h4' fontWeight='bold' gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Stack direction='row' spacing={2} alignItems='center' mb={2}>
              <Chip
                icon={<School />}
                label={user.role}
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Box display='flex' alignItems='center' gap={1}>
                <Email fontSize='small' />
                <Typography variant='body2'>{user.email}</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        {/* GPA Section */}
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box display='flex' alignItems='center' gap={2} mb={3}>
                <Grade color='primary' />
                <Typography variant='h6' fontWeight='bold'>
                  Academic Performance
                </Typography>
              </Box>

              <Box textAlign='center' mb={3}>
                <Typography
                  variant='h2'
                  fontWeight='bold'
                  sx={{ color: getGPAColor(gpa) }}
                >
                  {gpa.toFixed(1)}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Current GPA
                </Typography>
              </Box>

              <LinearProgress
                variant='determinate'
                value={getGPAProgress(gpa)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'grey.800',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: getGPAColor(gpa),
                    borderRadius: 4
                  }
                }}
              />

              <Box mt={3} p={2} bgcolor='grey.900' borderRadius={2}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  Total Credits Enrolled
                </Typography>
                <Typography variant='h5' fontWeight='bold' color='text.primary'>
                  {totalCredits}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Courses Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Box display='flex' alignItems='center' gap={2} mb={3}>
              <MenuBook color='primary' />
              <Typography variant='h6' fontWeight='bold'>
                Enrolled Courses ({courses.length})
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {courses.map((course, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    variant='outlined'
                    sx={{
                      height: '100%',
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
                          gutterBottom
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
                        gutterBottom
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {course.courseID}
                      </Typography>

                      <Typography variant='body2' color='text.secondary' mb={2}>
                        {course.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Box display='flex' alignItems='center' gap={1}>
                        <AccountCircle fontSize='small' color='action' />
                        <Typography variant='body2' color='text.secondary'>
                          {course.teacher.user.firstName}{' '}
                          {course.teacher.user.lastName}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
