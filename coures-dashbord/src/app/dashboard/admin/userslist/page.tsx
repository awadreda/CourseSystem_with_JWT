'use client'

import React from 'react'
import UsersListComponent from '../../../../../Components/UsersComponents/UsesListComponent'
import UserInfoDialog from '../../../../../Components/UsersComponents/Dialogs/UserInfoDialog'
import UserDeleteDialog from '../../../../../Components/UsersComponents/Dialogs/UserDeleteDialog'
import UserEditDialog from '../../../../../Components/UsersComponents/Dialogs/UserEditDialog'

type Props = {}

const UserList = (props: Props) => {
  return (
    <div className='flex p-3 w-full gap-5  flex-col justify-center bg-black'>
      <h2 className=' mt-10  text-4xl font-bold'>UsersList</h2>

      <UserInfoDialog />
      <UserDeleteDialog userId='12345' />
      <UserEditDialog
        user={{
          userID: '12345',
          firstName: '',
          lastName: '',
          email: '',
          role: ''
        }}
      />

      <UsersListComponent />
    </div>
  )
}

export default UserList
