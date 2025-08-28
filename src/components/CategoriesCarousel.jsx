"use client";
import React, { useEffect } from "react";
import Cart from "./Cart";
import { featuredProducts } from "@/lib/featuredProducts";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

// Example category data (replace with your real images & links)
const categories = [
  { id: 1, name: "Basic Tees", image: "/assets/tshirt1.png" },
  { id: 2, name: "Anime Prints", image: "/assets/anime.png" },
  { id: 3, name: "Aesthetic Prints", image: "/assets/aesthetic.png" },
  { id: 4, name: "Minimal Prints", image: "/assets/minimal.png" },
  { id: 5, name: "Quotes Tees", image: "/assets/quotes.png" },
  { id: 6, name: "Wonderlust", image: "/assets/tshirt4.png" },
  { id: 7, name: "Cartoon Prints", image: "/assets/cartoon.png" },
  { id: 8, name: "Marvel Prints", image: "/assets/tshirt3.png" },
];

export default function Products() {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-100">
      {/* Category Buttons Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Mobile Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar md:hidden py-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex-shrink-0 w-28 h-32 flex flex-col items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer"
              data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 object-contain rounded-md"
              />
              <span className="mt-2 text-xs font-semibold text-gray-700 text-center">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer"
              data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 object-contain rounded-md"
              />
              <span className="mt-2 text-sm font-semibold text-gray-700 text-center">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-all text-3xl md:text-5xl font-extrabold text-gray-900"
          >
            Featured <span className="text-indigo-600">Products</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-gray-700 content-all text-sm md:text-lg mt-4"
          >
            Discover our premium collection, with style & energy.
          </motion.p>

          {/* ✅ Buttons Section (right after <p>) */}
          <div className="flex justify-center gap-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all"
            >
              Regular Fit
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-800 transition-all"
            >
              Oversize Fit
            </motion.button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              data-aos={index % 2 === 0 ? "zoom-out-left" : "zoom-out-right"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hover:shadow-2xl rounded-2xl overflow-hidden transition-all bg-white/80 backdrop-blur-sm"
            >
              <Cart product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
