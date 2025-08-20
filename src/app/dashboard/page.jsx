import React from "react";
import ProtectedRoute from "../../components/ProtectedRoutes/ProtectedRoutes";

const DashboardPage = () => {
  return (
    <ProtectedRoute role="admin" authRequired={true}>
      <div className="flex justify-center items-center h-[500px]">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
