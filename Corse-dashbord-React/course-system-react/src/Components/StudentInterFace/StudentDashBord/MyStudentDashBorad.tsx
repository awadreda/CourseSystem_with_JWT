import React from 'react'
import { Avatar, Card, CardContent } from '@mui/material'
import { deepPurple } from '@mui/material/colors'

type Props = {}

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
      courseID: 'CSE101',
      title: 'Science',
      credits: 3,
      description: 'Learn the basics of computer science.',
      teacher: {
        user: {
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com'
        }
      }
    }
    // Add more courses as needed
  ]
}

const MyStudentDashBorad = (props: Props) => {
  return (
    <div className='text-white  '>
      <h1 className='text-4xl font-bold position-absolute top-0'>
        {studentData.user.firstName}
      </h1>

      <Card className='shadow-xl'>
        <CardContent className='p-6 bg-'>
          <Avatar sizes='large' sx={{ bgcolor: deepPurple[500] }}>
            {studentData.user.firstName[0]}
          </Avatar>
        </CardContent>
      </Card>
    </div>
  )
}

export default MyStudentDashBorad
