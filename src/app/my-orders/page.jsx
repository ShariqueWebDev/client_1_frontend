import React from "react";
import MyOrder from "../../components/MyOrder/MyOrder";
import ProtectedRoute from "../../components/ProtectedRoutes/ProtectedRoutes";

const MyOrdersPage = () => {
  return (
    <div className="">
      <ProtectedRoute authRequired={true}>
        <MyOrder />
      </ProtectedRoute>
    </div>
  );
};

export default MyOrdersPage;
