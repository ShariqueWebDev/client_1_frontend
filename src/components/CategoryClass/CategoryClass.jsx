"use client";
import React, { useState, useEffect } from "react";
import { useGetAllProductWithFilterQuery } from "../../redux/api/productApi";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import Cart from "../Cart";
import Link from "next/link";

const CategoryClass = ({ slug }) => {
  // Filters states
  const [priceRange, setPriceRange] = useState(""); // slider
  const [subcategory, setSubcategory] = useState(""); // dropdown
  const [search, setSearch] = useState(""); // search input
  const [page, setPage] = useState(1); // pagination

  // Debounced states
  const [debouncedPrice, setDebouncedPrice] = useState(priceRange);
  const [debouncedSubcategory, setDebouncedSubcategory] = useState(subcategory);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce effects
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedPrice(priceRange), 1500);
    return () => clearTimeout(timer);
  }, [priceRange]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSubcategory(subcategory), 500);
    return () => clearTimeout(timer);
  }, [subcategory]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 1500);
    return () => clearTimeout(timer);
  }, [search]);

  // API Call with debounced filters + pagination
  const { data, isLoading, isFetching } = useGetAllProductWithFilterQuery({
    isAdmin: process.env.NEXT_PUBLIC_ADMIN_ID,
    userQuery: slug,
    filterQuery: "category",
    priceRange: debouncedPrice,
    subcategory: debouncedSubcategory,
    search: debouncedSearch,
    page,
    limit: 8, // items per page
  });

  console.log(data, "filter data.....");

  const title = String(slug).split("-").join(" ").toUpperCase();

  return (
    <div className=" flex lg:flex-row flex-col w-full min-h-screen ">
      {/* <h2 className="text-xl font-bold mb-4">{title}</h2> */}

      {/* Sidebar Filters */}
      <div className="flex flex-col gap-4 lg:py-10 py-5 px-5 lg:w-[18%] w-full !h-full lg:sticky top-0">
        <h3 className="">Filters</h3>
        <hr className="mb-2 text-gray-300" />
        {/* Price Range Slider */}
        <div className="flex flex-col gap-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 text-sm p-2 rounded focus:outline-none focus:ring-0 mb-3"
          />
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="border border-gray-300 text-gray-500 p-2 rounded text-sm focus:outline-none focus:ring-0 mb-3"
          >
            <option value="">Select Subcategory</option>
            <option value="oversize-fit">Oversize-Fit</option>
            <option value="regular-fit">Regular-Fit</option>
          </select>

          <label className="text-sm font-medium text-gray-600">
            Price Range: ₹{priceRange || 0}
          </label>
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
        </div>

        {/* Subcategory Dropdown */}
      </div>
      {/* <div className="w-[20px] h-screen bg-black"></div> */}

      {/* Products Grid */}
      {isLoading || isFetching ? (
        <div>
          <LoaderComponent />
        </div>
      ) : (
        <div className="flex flex-col lg:w-[82%] w-full  justify-between lg:py-10 py-5 border-l border-gray-300">
          {/* Agar products empty hain */}
          {data?.products?.length === 0 ? (
            <div className="flex w-full justify-center items-center h-full">
              <p className="text-gray-500 text-lg font-medium text-center w-full">
                No Products Found
              </p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <h2 className="text-lg lg:text-3xl font-semibold text-center lg:mb-10 mb-5">
                {title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:px-10 px-3">
                {data?.products?.map((product) => (
                  <Link href={`/products/${product?._id}`} key={product?._id}>
                    <Cart
                      key={product._id}
                      product={product}
                      isSlider={false}
                      id={product?._id}
                    />
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 text-sm mt-16">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-white rounded disabled:opacity-50 bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                >
                  Prev
                </button>
                <span>Page {page}</span>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={data?.products?.length < 8} // disable if last page
                  className="px-3 py-1 text-white rounded disabled:opacity-50 bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Pagination */}
    </div>
  );
};

export default CategoryClass;
