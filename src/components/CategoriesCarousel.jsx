"use client";
import Cart from "./Cart";
import { featuredProducts } from "@/lib/featuredProducts";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useGetAllCategoriesQuery } from "../redux/api/CategoryApi";
import { useGetRelatedProductQuery } from "../redux/api/productApi";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [query, setQuery] = useState("regular-fit");
  const [data, setData] = useState(null);
  useGetAllCategoriesQuery({
    page: 1,
    search: "",
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID,
  });

  const { data: subCatData } = useGetRelatedProductQuery({
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID,
    filterQuery: "subCategory",
    userQuery: query,
  });

  useEffect(() => {
    if (subCatData) {
      setData(subCatData);
    }
  }, [subCatData]);

  // console.log(data, query, "subcategory product");

  const categoriesData = useSelector((state) => state.category.categories) || {
    categories: [],
  };

  const capitalizeQuery = query.toString().split("-").join(" ");

  // console.log(capitalizeQuery, "Capitalize query ................");

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-100">
      {/* Category Buttons Section */}
      <div className="max-w-7xl mx-auto px-3 mb-12">
        {/* Mobile Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar md:hidden py-3">
          {categoriesData?.categories?.map((cat) => (
            <Link
              href={`/category-class/${cat.link}`}
              key={cat._id || cat.link}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex-shrink-0 w-28 h-32 flex flex-col items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer"
                data-aos="fade-up"
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
          {categoriesData?.categories?.map((cat) => (
            <Link
              href={`/category-class/${cat.link}`}
              key={cat._id || cat.link}
            >
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
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
      <div className="max-w-7xl mx-auto px-3 relative z-10">
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
          >
            Discover our premium collection, with style & energy.
          </p>

          {/* ✅ Buttons Section (right after <p>) */}
          <div className="flex justify-center gap-6 mt-6">
            <div
              onClick={() => setQuery("regular-fit")}
              data-aos="fade-right"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-all hover:scale-105 !duration-300 cursor-pointer"
            >
              Regular Fit
            </div>
            <div
              onClick={() => setQuery("oversize-fit")}
              data-aos="fade-left"
              className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-800 transition-all hover:scale-105 !duration-300 cursor-pointer"
            >
              Oversize Fit
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.products?.map?.((product, index) => (
            <motion.div
              key={product?._id || index}
              className="hover:shadow-2xl rounded-2xl overflow-hidden transition-all bg-white/80 backdrop-blur-sm"
            >
              {/* <Link href={`/products/${product._id}`}> */}
              <Cart product={product} />
              {/* </Link> */}
            </motion.div>
          ))}
        </div>
        <Link href={`/sub-category/${query}`}>
          <div className="capitalize bg-yellow-500 hover:bg-yellow-600 text-white w-fit px-5 py-2 rounded-sm text-sm mt-16 cursor-pointer mx-auto">
            Visit {capitalizeQuery}
          </div>
        </Link>
      </div>
    </section>
  );
}
