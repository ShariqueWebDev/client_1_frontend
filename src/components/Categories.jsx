"use client";
import React from "react";
import Cart from "./Cart";

const Categories = ({
  tagLine,
  mainTitle,
  mainDesc,
  products = [],
  slug,
  isSlider,
}) => {
  const eight =
    products.length >= 8
      ? products.slice(0, 8)
      : Array.from({ length: 8 }, (_, i) => products[i % products.length]);

  return (
    <section className="bg-gradient-to-r from-gray-50 via-white to-gray-50">
      <div className="!my-5 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-5 gap-5">
          <div className="lg:w-[30%] w-full">
            <p className="bg-secondary w-fit text-primary-500 text-xs pb-2 font-medium rounded-sm">
              {tagLine}
            </p>
            <h1 className="heading-all text-3xl font-medium text-gray-800">
              {mainTitle}
            </h1>
          </div>
          <div className="lg:w-[40%] w-full">
            <p className="text-gray-500 content-all text-sm font-light">
              {mainDesc}
            </p>
          </div>
        </div>

        {/* Single-row, horizontally scrollable list */}
        <div className="w-full overflow-x-auto pb-6">
          <div className="flex gap-6 min-w-max">
            {eight.map((product, idx) => (
              <Cart
                key={product?.id ?? idx}
                product={product}
                isSlider={isSlider}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
