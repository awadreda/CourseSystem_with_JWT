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
import UserInfoDialog from './Dialogs/UserInfoDialog'
import UserEditDialog from './Dialogs/UserEditDialog'
import UserDeleteDialog from './Dialogs/UserDeleteDialog'
import { CircularProgress } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../../Redux/hooks'
import { getAllUsers } from '../../../Redux/slices/userSlice'
// import { UserReadDTO } from '../../types/types'

interface Column {
  id: `fullname` | 'email' | 'role' | `Options`
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: number) => string
}

const columns: Column[] = [
  { id: 'fullname', label: 'Full Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 170 },
  { id: 'Options', label: 'Options', minWidth: 170, align: 'left' }
]

function createUserData (
  userID: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string
): UserReadDTO {
  return { userID, firstName, lastName, email, role }
}

// export const users: UserReadDTO[] = [
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000001',
//     firstName: 'Ahmed',
//     lastName: 'Samir',
//     email: 'ahmed.samir@example.com',
//     role: 'Admin'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000002',
//     firstName: 'Mona',
//     lastName: 'Hassan',
//     email: 'mona.hassan@example.com',
//     role: 'Student'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000003',
//     firstName: 'Youssef',
//     lastName: 'Ali',

//     email: 'youssef.ali@example.com',
//     role: 'Teacher'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000004',
//     firstName: 'Fatma',
//     lastName: 'Omar',
//     email: 'fatma.omar@example.com',
//     role: 'Student'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000005',
//     firstName: 'Khaled',
//     lastName: 'Saeed',
//     email: 'khaled.saeed@example.com',
//     role: 'Admin'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000006',
//     firstName: 'Ahmed',
//     lastName: 'Samir',
//     email: 'ahmed.samir@example.com',
//     role: 'Admin'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000007',
//     firstName: 'Mona',
//     lastName: 'Hassan',
//     email: 'mona.hassan@example.com',
//     role: 'Student'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000008',
//     firstName: 'Youssef',
//     lastName: 'Ali',
//     email: 'youssef.ali@example.com',
//     role: 'Teacher'
//   },
//   {
//     userID: 'e3b0c442-98fc-1fcf-bc4c-000000000009',
//     firstName: 'Fatma',
//     lastName: 'Omar',
//     email: 'fatma.omar@example.com',
//     role: 'Student'
//   }
// ]

export interface UserReadDTO {
  userID: string // uuid
  firstName: string
  lastName: string
  email: string
  role: string
}
interface Data {
  userID: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export default function UsersListComponent () {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const UsersApi = useAppSelector(state => state.user)
  const users: UserReadDTO[] = UsersApi.users
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
    if (UsersApi.status === 'succeeded') dispatch(getAllUsers())
  }, [])

  if (UsersApi.status === 'failed') {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className='text-2xl text-red-500'>Failed to load users</h1>
      </div>
    )
  }

  if (UsersApi.status === `succeeded`) {
    return (
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={user.userID}
                    >
                      {columns.map(column => {
                        let value
                        if (column.id === 'fullname') {
                          value = `${user.firstName} ${user.lastName}`
                        } else if (column.id === 'Options') {
                          value = (
                            <div className='flex gap-2'>
                              <UserInfoDialog user={user} />
                              <UserEditDialog user={user} />
                              <UserDeleteDialog user={user} />
                            </div>
                          )
                        } else {
                          value = user[column.id]
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
