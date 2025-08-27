// AdminSidebar.tsx
import * as React from "react";
import { Link, useNavigate } from "react-router";

export interface IAdminSidebarProps {}

export default function AdminSidebar(props: IAdminSidebarProps) {

  let navgate = useNavigate();
  return (
    <div className="bg-gray-900 text-white w-64 hidden md:flex flex-col p-6">
      {/* Logo */}
      <div className="text-2xl font-bold mb-10">Admin Panel</div>

      {/* Links */}
      <nav className="flex flex-col space-y-3">
        <Link
          to="AdminUI"
          className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>
        <Link
          to="userListDashbord"
          className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          Users
        </Link>
        <Link
          to="studentsListDashbord"
          className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          Students
        </Link>
        <Link
          to="coursesListDashbord"
          className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          Courses
        </Link>
        <Link
          to="teachersListDashbord"
          className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
          Teachers
        </Link>
        <button
         onClick={() => navgate("/")}
          className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition"
        >
       logout
        </button>
      </nav>
    </div>
  );
}
  