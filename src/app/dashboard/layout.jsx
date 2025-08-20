import React from "react";
import ProtectedRoute from "../../components/ProtectedRoutes/ProtectedRoutes";
import Sidebar from "../../components/DashboardComponents/Sidebar";

export default function Layout({ children }) {
  return (
    <ProtectedRoute role="admin" authRequired={true}>
      <div className=" ">
        <div className="flex">
          <div className="w-[13%] min-h-screen px-7 py-5 border-r border-gray-300">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <div className="mt-5">
              <Sidebar />
            </div>
          </div>
          <div className=" w-[87%]">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
