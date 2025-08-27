// AdminDashBord.tsx
import React from "react";
import AdminSidebar from "../../../Components/Navbars/AdminSidebar";

type Props = {};

const AdminDashBord = (props: Props) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <AdminSidebar /> */}

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Stats Section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,250</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700">Students</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">980</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700">Courses</h2>
            <p className="text-3xl font-bold text-purple-600 mt-2">45</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-700">Teachers</h2>
            <p className="text-3xl font-bold text-pink-600 mt-2">18</p>
          </div>
        </div>

        {/* Placeholder for Tables or Lists */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>✅ New user registered</li>
            <li>📘 Course "React Basics" updated</li>
            <li>👩‍🏫 New teacher added</li>
            <li>🎓 Student enrolled in ".NET Core API"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBord;
