"use client";
import React from "react";
import Cart from "./Cart";
import { featuredProducts } from "@/lib/featuredProducts"; // ✅ fixed path

export default function Products() {
  return (
    <section className="bg-gradient-to-r from-gray-50 via-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="heading-all text-3xl md:text-4xl font-semibold text-gray-800">
            Featured <span className="text-primary-500">Products</span>
          </h1>
          <p className="text-gray-500 content-all text-sm md:text-base mt-3">
            Explore our premium collection curated just for you
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <Cart key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
