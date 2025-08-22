import React from "react";
import ProtectedRoute from "../../components/ProtectedRoutes/ProtectedRoutes";
import Sidebar from "../../components/DashboardComponents/Sidebar";
import ClientWrapper from "@/components/ClientWrapper";
export default function Layout({ children }) {
  return (
    <ClientWrapper>
      <ProtectedRoute role="admin" authRequired={true}>
        <div>
          <div className="flex">
            <div className="w-[13%] max-sm:hidden min-h-screen px-7 py-5 border-r border-gray-300">
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <div className="mt-5">
                <Sidebar />
              </div>
            </div>
            <div className=" lg:w-[87%] overflow-x-auto">{children}</div>
          </div>
        </div>
      </ProtectedRoute>
    </ClientWrapper>
  );
}
