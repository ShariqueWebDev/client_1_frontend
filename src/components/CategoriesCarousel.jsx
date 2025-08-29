"use client";
import Cart from "./Cart";
import { featuredProducts } from "@/lib/featuredProducts";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useGetAllCategoriesQuery } from "../redux/api/CategoryApi";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

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
  useGetAllCategoriesQuery({
    page: 1,
    search: "",
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID,
  });

  const categoriesData = useSelector((state) => state.category.categories) || {
    categories: [],
  };

  console.log(categoriesData?.categories, "Categories data ................");

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-100">
      {/* Category Buttons Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        {/* Mobile Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar md:hidden py-3">
          {categoriesData?.categories?.map((cat, index) => (
            <Link href={`/category-class/${cat.link}`}>
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex-shrink-0 w-28 h-32 flex flex-col items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer"
                data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              >
                <Image
                  width={300}
                  height={500}
                  src={cat.photo}
                  alt={cat.name}
                  className="w-16 h-16 object-contain rounded-md"
                />
                <span className="mt-2 text-xs font-semibold text-gray-700 text-center">
                  {cat.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-4">
          {categoriesData?.categories?.map((cat, index) => (
            <Link href={`/category-class/${cat.link}`}>
              <div
                key={cat.id}
                // whileHover={{ scale: 1.05 }}
                // transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
                data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              >
                <Image
                  width={500}
                  height={700}
                  src={cat.photo}
                  alt={cat.name}
                  className="w-16 h-16 object-contain rounded-md"
                />
                <span className="mt-2 text-sm font-semibold text-gray-700 text-center">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h1
            className="heading-all text-3xl md:text-5xl font-extrabold text-gray-900"
            data-aos="fade-up"
          >
            Featured <span className="text-indigo-600">Products</span>
          </h1>
          <p
            className="text-gray-700 content-all text-sm md:text-lg mt-4"
            data-aos="fade-up"
            s
          >
            Discover our premium collection, with style & energy.
          </p>

          {/* ✅ Buttons Section (right after <p>) */}
          <div className="flex justify-center gap-6 mt-6">
            <div
              data-aos="fade-right"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all hover:scale-105 !duration-300 cursor-pointer"
            >
              Regular Fit
            </div>
            <div
              data-aos="fade-left"
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-800 transition-all hover:scale-105 !duration-300 cursor-pointer"
            >
              Oversize Fit
            </div>
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
