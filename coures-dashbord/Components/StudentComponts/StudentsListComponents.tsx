'use client'
import * as React from 'react'
import { useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { getAllUsers } from '@/app/redux/slices/userSlice'
// import UserInfoDialog from './Dialogs/UserInfoDialog'
// import UserEditDialog from './Dialogs/UserEditDialog'
// import UserDeleteDialog from './Dialogs/UserDeleteDialog'
import { CircularProgress } from '@mui/material'
import { StudentReadDTO, UserReadDTO } from '../../types/types'
import { getAllStudents } from '@/app/redux/slices/studentSlice'
import StudentInfoDialog from './StudentInfoDialog'
// import { UserReadDTO } from '../../types/types'

interface Column {
  id: `fullname` | 'email' | 'gpa' | `Options`
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'fullname', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'gpa', label: 'GPA', minWidth: 170 },
  { id: 'Options', label: 'Options', minWidth: 170, align: 'left' }
]

// function createUserData (
//   userID: string,
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string
// ): UserReadDTO {
//   return { userID, firstName, lastName, email, role }
// }


// export interface UserReadDTO {
//   userID: string // uuid
//   firstName: string
//   lastName: string
//   email: string
//   role: string
// }
// interface Data {
//   userID: string
//   firstName: string
//   lastName: string
//   email: string
//   role: string
// }

export default function StudentsListComponent () {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const StudentsApi = useAppSelector(state => state.student)
  const Students:StudentReadDTO[] = StudentsApi.students
  const dispatch = useAppDispatch()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    if (StudentsApi.status === 'succeeded' ) 
    {
      dispatch(getAllStudents())
      .then(() => {
      
        console.log('Students in student list component' , StudentsApi.students)
      } )
    }

  }, [])

  if (StudentsApi.status === 'failed') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl text-red-500'>Failed to load users</h1>
      </div>
    )
  }

  if (StudentsApi.status === `succeeded`) {
    return (
      

      <Paper style={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead  sx={{ position: 'sticky', top: 0 }} >
              <TableRow>
                {columns.map(column => (
                  <TableCell
                   sx={{ backgroundColor: '#1f2937', color: '#fff' }}
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(student => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={student.studentID}
                    >
                      {columns.map(column => {
                        let value
                        if (column.id === 'fullname') {
                          value = student
                          ? `${student.firstName} ${student.lastName}`
                          : 'N/A'                        
                        } else if (column.id === 'Options') {
                          value = (
                            <div className='flex gap-2'>
                             <StudentInfoDialog student={student} />
                               {/* <StudentEditDialog student={student} /> */}
                               {/* <StudentDeleteDialog student={student} /> */}
                            </div> 
                          )
                          } else {
                            value = student[column.id]
                          }

                        return (
                          <TableCell sx={{ backgroundColor: '#001129f9', color: '#fff' }} key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={Students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: '#001129f9', color: '#fff' }}
        />
      </Paper>
      
    )
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <CircularProgress
        size={150}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%'
        }}
      />
    </div>
  )
}
