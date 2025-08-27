'use client'
// import Link from 'next/link'
import React from 'react'
import { Link } from 'react-router'

type Props = {}

export default function layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen flex '>
      {/* side bar  */}

      <aside className='w-64 bg-gray-900 text-white p-4 space-y-4 '>
        <h2 className='text-3xl font-bold mb-6'>Admin Panel</h2>

        <nav className='flex flex-col gap-2'>
          <Link
            className='hover:bg-gray-700 p-2 rounded'
            to='/dashboard/admin'
          >
            Dashbord
          </Link>

          <Link
            className='hover:bg-gray-700 px-3 py-2 rounded'
            to='/dashboard/admin/userslist'
          >
            Users
          </Link>
          <Link
            className='hover:bg-gray-700 px-3 py-2 rounded'
            to='/dashboard/admin/courseslist'
          >
            Courses
          </Link>
          <Link
            className='hover:bg-gray-700 px-3 py-2 rounded'
            to='/dashboard/admin/studentslist'
          >
            Students
          </Link>
          <Link
            className='hover:bg-gray-700 px-3 py-2 rounded'
            to='/dashboard/admin/teacherslist'
          >
            Teachers
          </Link>
        </nav>
      </aside>
      {children}
    </div>
  )
}
