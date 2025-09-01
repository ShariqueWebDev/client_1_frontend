"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  LogIn,
  ChevronDown,
  ListOrdered,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "@/redux/api/userApi";
import { logout } from "../redux/reducers/auth-reducers";
import { useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import toast from "react-hot-toast";
import ClientWrapper from "./ClientWrapper";
import { toggleMenu } from "../redux/reducers/menu-reducers";
import { toggleCart } from "../redux/reducers/cart-reducer";
import Image from "next/image";

export default function Navbar() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  // const {} = userAPI();
  const dispatch = useDispatch();
  const { items: cart, cartOpen } = useSelector((state) => state.cart);
  // const isOpen = useSelector((state) => state.menu.isOpen);
  const auth = useSelector((state) => state.auth) || { user: null };
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

  return (
    <nav className="w-full bg-white border-b border-gray-200  z-50 h-[70px] ">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between relative">
        {/* Left Menu (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-yellow-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 font-medium hover:text-yellow-600"
          >
            About
          </Link>
          <ClientWrapper>
            {user?.role === "admin" && (
              <Link
                href="/dashboard"
                className="text-gray-700 font-medium hover:text-yellow-600"
              >
                Dashboard
              </Link>
            )}
          </ClientWrapper>
          <Link
            href="/contact"
            className="text-gray-700 font-medium hover:text-yellow-600"
          >
            Contact Us
          </Link>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-1 md:absolute md:left-1/2 md:-translate-x-1/2">
          <div className="w-10">
            <Image
              src={"/logo/refilly.webp"}
              width={300}
              height={300}
              alt="Logo"
            />
          </div>
          <Link
            href="/"
            className="flex items-center text-2xl md:text-3xl font-extrabold text-gray-600"
          >
            Refilly
          </Link>
        </div>

        {/* Right Menu (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon */}
          <div
            onClick={() => dispatch(toggleCart())}
            // href={"/cart"}
            className="relative p-2 rounded-full cursor-pointer hover:bg-gray-100"
          >
            <ShoppingCart className="w-5 text-gray-700" />
            {/* {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )} */}
            {cart.length > 0 && (
              <span className="absolute top-0.5 -right-1 bg-red-500 text-white text-xs px-1 py-0 rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* User Auth */}
          <div className="relative">
            {/* User Button */}
            <div
              onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
              onMouseEnter={() => setIsOpenSubMenu(true)} // hover se khulega
              onMouseLeave={() => setIsOpenSubMenu(false)} // hover chhodne pe band
              className="flex text-sm items-center gap-2 px-5 py-1.5 bg-yellow-500 rounded-md hover:bg-yellow-600 text-white transition"
            >
              <ClientWrapper>
                {user ? (
                  <span className="font-medium text-white">
                    Hi, <span className="capitalize">{user?.name}</span>
                  </span>
                ) : (
                  <Link href={"/login"}>Login</Link>
                )}
                {user && <ChevronDown className="w-4 h-4 text-white" />}
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
                          <div
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="px-4 py-2 w-full hover:bg-gray-100 cursor-pointer flex justify-center items-center gap-3"
                          >
                            <span className="">
                              <LogOut size={18} />
                            </span>
                            {isLoading ? "Logging out..." : "Logout"}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </ClientWrapper>
            </div>
          </div>
        </div>

        {/* Right Side (Mobile Only) */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon */}
          <div
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
          </div>

          {/* Auth Mobile */}
          {/* <ClientWrapper>
            {user ? (
              <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">
                Logout
              </div>
            ) : (
              <div
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-800"
                aria-label="Login"
              >
                <LogIn className="w-6 h-6" />
              </div>
            )}
          </ClientWrapper> */}
          {/* Mobile Menu Button */}
          <div
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-800"
            onClick={() => dispatch(toggleMenu())}
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
          </div>
        </div>
      </div>

      <MobileMenu
        // isOpen={isOpen}
        // setIsOpen={(val) =>
        //   val ? dispatch(openMenu()) : dispatch(closeMenu())
        // }
        user={user}
        handleLogout={handleLogout}
      />
    </nav>
  );
}
