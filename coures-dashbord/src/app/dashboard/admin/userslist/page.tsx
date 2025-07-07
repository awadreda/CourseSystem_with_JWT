 'use client'

import React from 'react'
import UsersListComponent from '../../../../../Components/UsersComponents/UsesListComponent'

type Props = {}

const UserList = (props: Props) => {
  return (
    <div className='flex p-3 w-full gap-5  flex-col justify-center bg-black'>
        <h2 className=' mt-10  text-4xl font-bold'>UsersList</h2>
      

      <UsersListComponent />
    </div>
  )
}

export default UserList
