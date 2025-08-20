"use client";
import React from "react";
import { DashboardData } from "../../lib/DashboardMenu";
import Image from "next/image";
import Link from "next/link";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/auth-reducers";

const Sidebar = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const dashboardLogoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      router.push("/login");
      toast.success(`${user.name} logged out`);
    } catch (error) {
      console.log("logout failed");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Top Menu */}
      <ul className="h-full">
        {DashboardData?.map((item, index) => {
          return (
            <Link href={item?.link} key={index}>
              <li>
                <div className="flex items-center gap-4 mb-5">
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
        <li>
          <Link href={"/contact"}>
            <div className="flex items-center gap-4 mb-5">
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
        <li className="cursor-pointer">
          <div
            className="flex items-center gap-4 mb-5"
            onClick={dashboardLogoutHandler}
          >
            <div className="w-fit">
              <Image
                src={"/assets/dashboard/logout.png"}
                width={50}
                height={50}
                alt="Logout"
                className="w-5 h-5 object-contain object-center"
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
