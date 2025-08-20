"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
  role,
  authRequired = false,
}) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // 🔒 Agar authRequired hai aur user login nahi hai
    if (authRequired && !isAuthenticated) {
      router.replace("/login");
    }

    // 🔒 Agar role diya gaya hai aur user role mismatch hai
    else if (role && user?.role !== role) {
      router.replace("/not-authorized");
    }
  }, [isAuthenticated, user, role, authRequired, router]);

  // 🕒 Jab tak user data load nahi hua
  if (authRequired && (!isAuthenticated || !user)) return null;

  // 🛑 Role check
  if (role && user?.role !== role) return null;

  return children;
}
