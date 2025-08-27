'use client'

import React from 'react'
// import UsersListComponent from '../../../../../Components/UsersComponents/UsesListComponent'
// import UserInfoDialog from '../../../../../Components/UsersComponents/Dialogs/UserInfoDialog'
// import UserDeleteDialog from '../../../../../Components/UsersComponents/Dialogs/UserDeleteDialog'
// import UserEditDialog from '../../../../../Components/UsersComponents/Dialogs/UserEditDialog'
// import AddNewUserDialog from '../../../../../Components/UsersComponents/Dialogs/AddNewUserDialog'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import AddNewUserDialog from '../../../../Components/AdminDashBordComponent/UsersComponents/Dialogs/AddNewUserDialog'
import UsersListComponent from '../../../../Components/AdminDashBordComponent/UsersComponents/UsesListComponent'
// import AddNewUserDialog from '../../../Components/AdminDashBordComponent/UsersComponents/Dialogs/AddNewUserDialog'
// import UsersListComponent from '../../../Components/AdminDashBordComponent/UsersComponents/UsesListComponent'

type Props = {}

const UserList = (props: Props) => {
  const handleToastClick = () => {
    toast.success('Toast is working'  , {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
      
    }
    )
  }
  return (
    <div className='flex p-3 w-full gap-5  flex-col justify-center bg-black'>
      <h2 className=' mt-10  text-4xl font-bold'>UsersList</h2>
      <div className='flex justify-end pr-2 w-full'>
        <AddNewUserDialog />
        <Button
          variant='contained'
          color='primary'
          onClick={handleToastClick}
          title='lol'
        >
          click me
        </Button>
      </div>

      <UsersListComponent />
    </div>
  )
}

export default UserList
