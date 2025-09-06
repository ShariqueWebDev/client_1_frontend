// ClientBoundary.jsx
"use client";
import ProtectedRoute from "../ProtectedRoutes/ProtectedRoutes";
import MyOrder from "./MyOrder";

export default function ClientBoundary() {
  return (
    <ProtectedRoute authRequired={true}>
      <MyOrder />
    </ProtectedRoute>
  );
}
