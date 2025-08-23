"use client";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../redux/reducers/menu-reducers";

const MobileMenu = ({ user, handleLogout }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.menu.isOpen);
  return (
    <div>
      {/* Mobile Slide-out Menu */}
      {isOpen && (
        <div
          className={` ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-0 z-50 bg-black/30 transition-transform duration-300 ease-linear backdrop-blur-sm`}
          onClick={() => dispatch(closeMenu())}
        >
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 flex flex-col">
            {/* Close Button */}
            <div className="flex  justify-between mb-6">
              <Link
                href="/"
                className="flex items-center text-2xl md:text-3xl font-extrabold text-gray-600"
              >
                Refilly
              </Link>
              <div
                className="mb- p-2 rounded-lg hover:bg-gray-100 self-end"
                onClick={() => dispatch(closeMenu())}
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-gray-800" />
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-4 text-sm text-gray-800 font-medium">
              <Link
                href="/"
                onClick={() => dispatch(closeMenu())}
                className="hover:text-yellow-500 border-b pb-3 border-gray-300 "
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => dispatch(closeMenu())}
                className="hover:text-yellow-500 border-b pb-3 border-gray-300 "
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => dispatch(closeMenu())}
                className="hover:text-yellow-500 border-b pb-3 border-gray-300"
              >
                Contact Us
              </Link>

              <>
                {user && user.role === "admin" && (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => dispatch(closeMenu())}
                      className="hover:text-yellow-500 border-b pb-3 border-gray-300"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </>

              {/* Auth Buttons */}
              {user ? (
                <>
                  <Link
                    href="/my-orders"
                    onClick={() => dispatch(closeMenu())}
                    className="hover:text-yellow-500 border-b pb-3 border-gray-300"
                  >
                    My Order
                  </Link>
                  <div
                    onClick={() => {
                      // logOut();
                      dispatch(closeMenu());
                      handleLogout();
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      openLogin();
                      dispatch(closeMenu());
                    }}
                    className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
