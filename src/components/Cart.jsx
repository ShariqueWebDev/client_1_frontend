"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Cart = ({ product, isSlider }) => {
  return (
    <Link
      href={`/products/1`}
      className={`${
        isSlider ? "max-sm:max-w-[200px]" : " max-w-[300px]"
      } w-full block group`}
    >
      {/* Product Image */}
      <div className="w-full lg:h-[350px]  relative overflow-hidden border border-gray-200 rounded-sm lg:p-5 p-2">
        <Image
          src={"/assets/anime.png"}
          alt={"Animie Tshirt"}
          width={500}
          height={700}
          className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <h3 className="mt-3 font-medium text-xl  text-gray-800">
        {product.name}
      </h3>
      <p className="text-gray-600 lg:text-sm text-xs ">
        {product.description ||
          "Stylish and comfortable tee for all occasions."}
      </p>
      <p className="font-semibold text-lg mt-1 text-primary-500">
        {product.price}
      </p>

      {/* View More (inside card, styled) */}
      <span className="text-primary-500 lg:text-sm text-xs font-medium hover:underline mt-2 inline-block">
        View More
      </span>
    </Link>
  );
};

export default Cart;
