"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  LogIn,
  X,
  User,
  ChevronDown,
  ListOrdered,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/redux/api/userApi";
import { logout } from "../redux/reducers/auth-reducers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(true);
  // const {} = userAPI();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth) || {};
  const { user } = auth;

  const router = useRouter();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      router.push("/login");
      toast.success(`${user.name} logged out`);
    } catch (error) {
      console.log("logout failed");
    }
  };
  let openLogin;

  return (
    <nav className="w-full bg-white border-b border-gray-200  z-50 h-[70px] ">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        {/* Left Menu (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="">
            <span className="text-gray-700 font-medium hover:text-yellow-600">
              Home
            </span>
          </Link>
          <Link href="/about" className="">
            <span className="text-gray-700 font-medium hover:text-yellow-600">
              About
            </span>
          </Link>
          {user?.role === "admin" && (
            <Link href="/dashboard" className="">
              <span className="text-gray-700 font-medium hover:text-yellow-600">
                Dashboard
              </span>
            </Link>
          )}
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl md:text-3xl font-extrabold text-gray-600">
            Refilly
          </span>
        </Link>

        {/* Right Menu (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon */}
          <Link href={"/cart"}>
            <button
              // onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full cursor-pointer hover:bg-gray-100"
            >
              <ShoppingCart className="w-5 text-gray-700" />
              {/* {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )} */}
              <span className="absolute top-0.5 -right-1 bg-red-500 text-white text-xs px-1 py-0 rounded-full">
                5
              </span>
            </button>
          </Link>

          {/* User Auth */}
          <div className="relative">
            {/* User Button */}
            <button
              onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
              onMouseEnter={() => setIsOpenSubMenu(true)} // hover se khulega
              onMouseLeave={() => setIsOpenSubMenu(false)} // hover chhodne pe band
              className="flex text-sm items-center gap-2 px-5 py-1.5 bg-yellow-500 rounded-md hover:bg-yellow-600 text-white transition"
            >
              {user ? (
                <span className="font-medium text-gray-700">
                  Hi, <span className="capitalize">{user?.name}</span>
                </span>
              ) : (
                <Link href={"/login"}>
                  <div className="">Login</div>
                </Link>
              )}
              {user && <ChevronDown className="w-4 h-4 text-gray-600" />}
              {/* Dropdown Menu */}
              {user && isOpenSubMenu && (
                <div className=" absolute right-0 top-6 mt-2  !z-[1000] ">
                  <div className="w-40 bg-white border border-gray-300 my-0.5 rounded-md shadow-lg">
                    <ul className=" text-sm text-gray-700">
                      <li>
                        <Link
                          href="/my-orders"
                          className="px-4 py-2 hover:bg-gray-100 flex justify-center items-center gap-3"
                        >
                          <span className="">
                            <ListOrdered size={18} />
                          </span>
                          My Orders
                        </Link>
                      </li>
                      {/* <hr className="text-gray-300" /> */}
                      <li>
                        <button
                          onClick={handleLogout}
                          disabled={isLoading}
                          className="px-4 py-2 w-full hover:bg-gray-100 flex justify-center items-center gap-3"
                        >
                          <span className="">
                            <LogOut size={18} />
                          </span>
                          {isLoading ? "Logging out..." : "Logout"}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Right Side (Mobile Only) */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            // onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {/* {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )} */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              5
            </span>
          </button>

          {/* Auth Mobile */}
          {user ? (
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">
              Logout
            </button>
          ) : (
            <button
              onClick={openLogin}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-800"
              aria-label="Login"
            >
              <LogIn className="w-6 h-6" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-800"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col">
            {/* Close Button */}
            <button
              className="mb-6 p-2 rounded-lg hover:bg-gray-100 self-end"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Links */}
            <nav className="flex flex-col gap-4 text-gray-800 font-medium">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-500"
              >
                About
              </Link>

              {/* Auth Buttons */}
              {user ? (
                <button
                  onClick={() => {
                    // logOut();
                    setIsOpen(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    openLogin();
                    setIsOpen(false);
                  }}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
