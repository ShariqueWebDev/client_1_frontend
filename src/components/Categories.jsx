"use client";
import React, { useRef, useEffect } from "react";
import Cart from "./Cart";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Categories = ({
  tagLine,
  mainTitle,
  mainDesc,
  products = [],
  slug,
  isSlider,
}) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const eight =
    products.length >= 8
      ? products.slice(0, 8)
      : Array.from({ length: 8 }, (_, i) => products[i % products.length]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-100">
      {/* Decorative blurred background shapes */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 opacity-30 rounded-full blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-20 -right-16 w-96 h-96 bg-slate-300 opacity-30 rounded-full blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/3 w-64 h-64 bg-indigo-200 opacity-40 rounded-full blur-2xl"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-5 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-[30%] w-full"
          >
            <p className="bg-secondary w-fit text-primary-500 text-xs pb-2 font-medium rounded-sm">
              {tagLine}
            </p>
            <h1 className="heading-all text-3xl font-extrabold text-gray-900">
              {mainTitle}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-[40%] w-full"
          >
            <p className="text-gray-700 content-all text-sm md:text-lg">
              {mainDesc}
            </p>
          </motion.div>
        </div>

        {/* Product Row (slider style) */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pb-6 scrollbar-hide"
        >
          <div className="flex gap-6 min-w-max">
            {eight.map((product, idx) => (
              <motion.div
                key={product?.id ?? idx}
                data-aos={idx % 2 === 0 ? "zoom-out-left" : "zoom-out-right"}
                className="rounded-2xl overflow-hidden transition-all bg-white/80 backdrop-blur-sm shadow-md"
              >
                <Cart product={product} isSlider={isSlider} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Buttons instead of scrollbar */}
        <div className="flex justify-start gap-4 mt-6">
          <button
            onClick={scrollLeft}
            className="px-6 py-3 bg-gray-200 rounded-sm text-gray-800 cursor-pointer hover:bg-gray-300 transition shadow-md hover:shadow-lg"
          >
            &lt;
          </button>
          <button
            onClick={scrollRight}
            className="px-6 py-3 bg-gray-200 rounded-sm text-gray-800 cursor-pointer hover:bg-gray-300 transition shadow-md hover:shadow-lg"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Gradient Separator */}
      <div className="h-12 bg-gradient-to-b from-transparent to-white/60"></div>
    </section>
  );
};

export default Categories;
