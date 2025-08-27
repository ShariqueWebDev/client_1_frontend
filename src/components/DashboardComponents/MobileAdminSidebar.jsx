"use client";
import { DashboardData } from "@/lib/DashboardMenu";
import { useLogoutUserMutation } from "@/redux/api/userApi";
import { logout } from "@/redux/reducers/auth-reducers";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../redux/reducers/menu-reducers";

const MobileAdminSidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

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

  console.log(isOpenSidebar, "sidebar status");

  return (
    <div className="block lg:hidden ">
      {/* Overlay */}
      {isOpenSidebar && (
        <div
          onClick={() => setIsOpenSidebar(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-[80%] bg-white h-full fixed top-0 left-0 transform transition-transform ease-out duration-300 px-4 border-r border-gray-300 z-50 ${
          isOpenSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="flex justify-between items-center py-5 ">
          <Link
            href="/"
            className="flex items-center text-2xl md:text-3xl font-extrabold text-gray-600"
          >
            Refilly
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => setIsOpenSidebar(false)}
          >
            <X size={18} />
          </div>
        </div>
        <div className="">
          <ul className="h-full">
            {DashboardData.map((item, index) => {
              const isActive = pathname === item.link;
              return (
                <Link
                  href={item.link}
                  key={index}
                  onClick={() => setIsOpenSidebar(false)}
                >
                  <li
                    className={`px-5 py-2 pl-16 mb-3 rounded-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.imgPath}
                        width={50}
                        height={50}
                        alt={item.lable}
                        className="w-5 h-5"
                      />
                      <p className="text-sm">{item.lable}</p>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
          <ul className="border-t border-gray-300 pt-6 mt-6">
            <li
              className="hover:bg-gray-300 bg-gray-200 px-5 py-2 mb-3 rounded-sm"
              onClick={() => setIsOpenSidebar(false)}
            >
              <Link href={"/contact"}>
                <div className="flex items-center gap-4 pl-12">
                  <div className="w-fit">
                    <Image
                      src={"/assets/dashboard/support.png"}
                      width={50}
                      height={50}
                      alt="Support"
                      className="w-5 h-5 object-contain object-center"
                    />
                  </div>
                  <p className="text-sm ">Support</p>
                </div>
              </Link>
            </li>

            {/* Logout Button */}
            <li
              className="hover:bg-gray-300 bg-gray-200 px-5 py-2 mb-3 rounded-sm cursor-pointer"
              onClick={() => {
                setIsOpenSidebar(false);
                dashboardLogoutHandler();
              }}
            >
              <div className="flex items-center gap-4 pl-12">
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

        {/* Bottom menu */}
      </div>

      {/* Bottom control button */}
      <div
        className="w-full h-12 flex justify-center items-center rounded-t-xl fixed bottom-0 bg-white border-t border-gray-300 z-50 cursor-pointer"
        onClick={() => {
          setIsOpenSidebar(!isOpenSidebar);
          dispatch(closeMenu());
        }}
      >
        <div className="w-7">
          <Image
            src="/assets/dashboard/control-panel.png"
            width={50}
            height={50}
            alt="icon"
          />
        </div>
        <p className="text-sm font-semibold ml-2">Control Panel</p>
      </div>
    </div>
  );
};

export default MobileAdminSidebar;
