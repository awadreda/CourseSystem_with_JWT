import React from 'react'
import TeachersListComponent from '../../../../../Components/TeacherComponents/TeachersList';

type Props = {}

const TeachersList
 = (props: Props) => {
  return(

    <div className='flex p-3 w-full gap-5  flex-col justify-center bg-black'>
          <h2 className=' mt-10  text-4xl font-bold'>StudentList</h2>
          <div className='flex justify-end pr-2 w-full'>
            {/* <AddNewUserDialog />
            <Button
              variant='contained'
              color='primary'
              onClick={handleToastClick}
              title='lol'
            >
              click me
            </Button> */}
          </div>
    
          <TeachersListComponent />
        </div>
  )
}

export default TeachersList
