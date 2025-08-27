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

// import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
// import { getAllUsers } from '@/app/redux/slices/userSlice'
// import UserInfoDialog from './Dialogs/UserInfoDialog'
// import UserEditDialog from './Dialogs/UserEditDialog'
// import UserDeleteDialog from './Dialogs/UserDeleteDialog'
import { CircularProgress } from '@mui/material'
// import { StudentReadDTO, TeacherDTO, TeacherUpdateBasicInfoDto, UserReadDTO } from '../../types/types'
// import { getAllStudents } from '@/app/redux/slices/studentSlice'
// import { getAllTeachersAsync } from '@/app/redux/slices/teacherSlice'
import TeacherInfoDialog from './TeacherDialog/TeacherInfoDialog'
import TeacherEditDialog from './TeacherDialog/TeacherEditDialog'
import TeacherDeleteDialog from './TeacherDialog/TeacherDeleteDialog'
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks'
import { getAllTeachersAsync } from '../../../Redux/slices/teacherSlice'
import type { TeacherDTO } from '../../../types/types'
// import { UserReadDTO } from '../../types/types'

interface Column {
  id: `fullname` | 'email'  | `Options`
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'fullname', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  // { id: 'gpa', label: 'GPA', minWidth: 170 },
  { id: 'Options', label: 'Options', minWidth: 170, align: 'left' }
]

export default function TeachersListComponent () {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const TeachersApi = useAppSelector(state => state.teacher)
  const Teachers:TeacherDTO[] = TeachersApi.teachers
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
    
    if(TeachersApi.status === 'succeeded')
    {

      dispatch(getAllTeachersAsync())
      .then(() => {
        
        console.log('Teacher in Teacher list component' , Teachers)
      } )
      .catch((error) => {
        console.error('Error fetching teachers:', error)
      })
    }

  }, [])

  if (TeachersApi.status === 'failed') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl text-red-500'>Failed to load Teachers</h1>
      </div>
    )
  }

  if (TeachersApi.status === `succeeded`) {
    return (
      

      <Paper style={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead  sx={{ position: 'sticky', top: 0  ,zIndex: 1}} >
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
              {Teachers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(teacher => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={teacher.teacherID}
                    >
                      {columns.map(column => {
                        let value
                        if (column.id === 'fullname') {
                          value = teacher.teacherID
                          ? `${teacher.firstName} ${teacher.lastName}`
                          : 'N/A'                        
                        } else if (column.id === 'Options') {
                          value = (
                            <div className='flex gap-2'>
                             <TeacherInfoDialog teacher={teacher} />
                               <TeacherEditDialog  teacher={teacher} />
                               <TeacherDeleteDialog   teacher={teacher} />
                            </div> 
                          )
                          } else {
                            value = teacher[column.id]
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
          count={Teachers.length}
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
