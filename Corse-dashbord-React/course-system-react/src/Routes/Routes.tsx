import { Home } from "@mui/icons-material";
import { createBrowserRouter, Outlet } from "react-router";
import StudentsList from "../Pages/Dashboards/Admin/studentslist/StudentsList";
import CoursesList from "../Pages/Dashboards/Admin/courseslist/CoursesList";
import UserList from "../Pages/Dashboards/Admin/userslist/UserList";
import StudentInfoPage from "../Pages/Dashboards/student/StudentInfoPage";
import TeacherInfoPage from "../Pages/Dashboards/teacher/TeacherInfoPage";
import HomePage from "../Pages/HomePage/HomePage";
import AdminDashBord from "../Pages/Dashboards/Admin/AdminDashBord";
import AdminSidebar from "../Components/Navbars/AdminSidebar";
import AdminLayout from "../Pages/Dashboards/Admin/AdminLayout";
import TeachersList from "../Pages/Dashboards/Admin/teacherslist/TeachersList";
import CourseListTOAssgin from "../Pages/Dashboards/Courses/CourseListTOAssgin";
import CourseDetails from "../Pages/Dashboards/Courses/CourseDetails";



const router = createBrowserRouter([

  {
    path: '/'
    , element: <HomePage/>,


  },

  {
    path: '/AdminHome'
    , element:(

       <AdminLayout/>
    ),
    children: [
      {
        
        path: 'AdminUI'
        , element: <AdminDashBord/>,
      },

      {

        path:'userListDashbord',
        element: <UserList />,
      },
      {
        path:'studentsListDashbord',
        element: <StudentsList />,

      },
      {
        path:'teachersListDashbord',
        element: <TeachersList />,
      },
      {
        path:'coursesListDashbord',element:<CoursesList/>,
      }
          
    

    ]         
  } 
    ,
    {
      path:'studentUI',
      element:<StudentInfoPage/>,
    } 

    ,{
      path:'teacherUI'
      ,element:<TeacherInfoPage/>
    }

    ,{
      path :'CoursesList',
      element:<CourseListTOAssgin/>
    }

    ,{
      path : "CoursesList/:courseId",
      element:<CourseDetails/>
    }








]);


export default router;


