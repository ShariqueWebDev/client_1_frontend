"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Refilley</h2>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for premium fashion at unbeatable prices.
            Stylish, affordable, and delivered to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="/shop" className="hover:text-yellow-400">Shop</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-yellow-400">FAQ</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><Link href="/returns" className="hover:text-yellow-400">Returns Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-yellow-400">Shipping Info</Link></li>
            <li><Link href="/terms" className="hover:text-yellow-400">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Join Our Newsletter</h3>
          <p className="text-sm mb-4">Get updates on new arrivals and exclusive offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l bg-gray-800 text-white text-sm focus:outline-none w-full"
            />
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 rounded-r">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-screen-xl mx-auto px-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Refilley | All Rights Reserved
        </p>
        <div className="flex gap-4 text-gray-400">
          <Link href="#"><FaFacebookF className="hover:text-yellow-400 cursor-pointer" /></Link>
          <Link href="#"><FaTwitter className="hover:text-yellow-400 cursor-pointer" /></Link>
          <Link href="#"><FaInstagram className="hover:text-yellow-400 cursor-pointer" /></Link>
          <Link href="#"><FaYoutube className="hover:text-yellow-400 cursor-pointer" /></Link>
        </div>
      </div>
    </footer>
  );
}
