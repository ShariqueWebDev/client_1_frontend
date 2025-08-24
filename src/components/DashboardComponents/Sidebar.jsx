"use client";
import React from "react";
import { DashboardData } from "../../lib/DashboardMenu";
import Image from "next/image";
import Link from "next/link";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/auth-reducers";
import { usePathname, useRouter } from "next/navigation"; // ✅ import
import { toast } from "react-hot-toast"; // agar toast use kar rahe ho

const Sidebar = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const pathname = usePathname(); // ✅ current route
  const router = useRouter();

  const dashboardLogoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      router.push("/login");
      toast.success(`Logged out successfully`);
    } catch (error) {
      console.log("logout failed");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Top Menu */}
      <ul className="h-full">
        {DashboardData?.map((item, index) => {
          const isActive = pathname === item?.link; // ✅ check active

          return (
            <Link href={item?.link} key={index}>
              <li
                className={`px-5 py-2 mb-3 rounded-sm transition-colors duration-200 
                ${
                  isActive
                    ? "bg-yellow-500 text-white" // ✅ active tab style
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <div className="flex items-center pl-3 gap-4">
                  <div className="w-fit">
                    <Image
                      src={item?.imgPath}
                      width={50}
                      height={50}
                      alt={item.lable}
                      className="w-5 h-5 object-contain object-center"
                    />
                  </div>
                  <p className="text-sm">{item.lable}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>

      {/* Bottom Menu */}
      <ul className="border-t border-gray-300 pt-4">
        <li className="hover:bg-gray-300 bg-gray-200 px-5 py-2 mb-3 rounded-sm">
          <Link href={"/contact"}>
            <div className="flex items-center gap-4">
              <div className="w-fit">
                <Image
                  src={"/assets/dashboard/support.png"}
                  width={50}
                  height={50}
                  alt="Support"
                  className="w-5 h-5 object-contain object-center"
                />
              </div>
              <p className="text-sm">Support</p>
            </div>
          </Link>
        </li>

        {/* Logout Button */}
        <li className="hover:bg-gray-300 bg-gray-200 px-5 py-2 mb-3 rounded-sm cursor-pointer">
          <div
            className="flex items-center gap-4"
            onClick={dashboardLogoutHandler}
          >
            <div className="w-fit">
              <Image
                src={"/assets/dashboard/logout.png"}
                width={50}
                height={50}
                alt="Logout"
                className="w-4.5 object-contain object-center"
              />
            </div>
            <p className="text-sm">Logout</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
