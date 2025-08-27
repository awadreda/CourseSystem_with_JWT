import * as React from "react";
import { Link } from "react-router";

export interface IHomeNavbarProps { }

export default function HomeNavbar(props: IHomeNavbarProps) {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <div className="text-2xl font-bold tracking-wide">
          MyPlatform
        </div>

                
        {/* Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Home Page
          </Link>

          <Link
            to="/AdminHome/AdminUI"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Admin
          </Link>

          <Link
            to="/studentUI"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Student
          </Link>

          <Link
            to="/teacherUI"
            className="hover  :text-blue-400 transition-colors duration-300"
          >
            Teacher
          </Link>
        </div>
      </div>
    </nav>
  );
}
