"use client";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const MobileMenu = ({ isOpen, setIsOpen, user }) => {
  return (
    <div>
      {/* Mobile Slide-out Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col">
            {/* Close Button */}
            <div
              className="mb-6 p-2 rounded-lg hover:bg-gray-100 self-end"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-800" />
            </div>

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
                <div
                  onClick={() => {
                    // logOut();
                    setIsOpen(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Logout
                </div>
              ) : (
                <div
                  onClick={() => {
                    openLogin();
                    setIsOpen(false);
                  }}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
