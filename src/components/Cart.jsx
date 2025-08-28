"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cart = ({ product, isSlider }) => {
  if (!product) return null; // safety check

  return (
    <Link
      href={`/products/${product.id}`}
      className={`${
        isSlider ? "max-sm:max-w-[200px]" : "max-w-[300px]"
      } w-full block group`}
    >
      {/* Product Card */}
      <div className="w-full lg:h-[350px] relative overflow-hidden border border-gray-200 rounded-sm lg:p-5 p-2 bg-gradient-to-br from-white via-gray-50 to-white group-hover:from-gray-200 group-hover:via-gray-400 group-hover:to-blue-900 transition-colors duration-500">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={700}
          className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <h3 className="mt-3 font-medium text-xl text-gray-800">{product.name}</h3>
      <p className="text-gray-600 lg:text-sm text-xs">
        {product.description ||
          "Stylish and comfortable tee for all occasions."}
      </p>

      {/* ✅ Price + Cut Price (Fixed 999) */}
      <div className="flex items-center gap-2 mt-1">
        <span className="font-semibold text-lg text-primary-500">
          {product.price}
        </span>
        <span className="text-sm text-gray-500 line-through">₹999</span>
      </div>

      {/* View More (smaller button) */}
      <div className="flex justify-between">
        <button className="mt-3 px-4 py-2 bg-yellow-500 rounded-sm text-gray-800 cursor-pointer hover:bg-yellow-600 transition text-sm font-medium">
          View More
        </button>
        <button className="mt-3 px-4 py-2 bg-yellow-500 rounded-sm text-gray-800 cursor-pointer hover:bg-yellow-600 transition text-sm font-medium">
          Add to cart
        </button>
      </div>
    </Link>
  );
};

export default Cart;
