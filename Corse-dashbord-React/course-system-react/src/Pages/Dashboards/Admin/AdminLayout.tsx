import * as React from 'react';
import { Outlet } from 'react-router';
import AdminSidebar from '../../../Components/Navbars/AdminSidebar';

export default function AdminLayout () {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Admin Home</h1>
        <Outlet />
      </div>
    </div>
  );
}
