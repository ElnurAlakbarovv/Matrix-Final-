import React from "react";
import AdminHeader from "../adminNavbar/AdminHeader";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
