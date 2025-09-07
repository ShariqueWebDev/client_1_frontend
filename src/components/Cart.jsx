"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { calculatePercentage, formatePrice } from "../utils/features";
import { cartActions } from "../redux/actions/cart-actions";
// import { useSelector } from "react-redux";

import { useSelector, useDispatch } from "react-redux";
import { setCart, clearCart } from "../redux/reducers/cart-reducer";
import { getGuestCart, setGuestCart, clearGuestCart } from "../utils/addToCart";
// import {
//   useGetCartQuery,
//   useMergeGuestCartMutation,
//   useAddToCartMutation,
// } from "../redux/api/cartApi";

const Cart = ({ product, isSlider }) => {
  const cartItem = useSelector((state) => state.cart.items);

  if (!product) return null; // safety check

  // console.log(cartItem);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const [addToCart] = useAddToCartMutation();

  const handleAddToCart = (product) => {
    // console.log(product, "add to cart.......");

    if (!user) {
      let guestCart = getGuestCart();
      const existing = guestCart.find((i) => i.productId === product?._id);
      // console.log(guestCart, "existing product....");

      if (existing) existing.quantity += 1;
      else
        guestCart.push({
          name: product?.name,
          productId: product?._id,
          photo: product?.photo,
          price: product?.price,
          quantity: 1,
          stock: product?.stock,
        });
      setGuestCart(guestCart);
      dispatch(setCart(guestCart));
      return;
    }

    // Logged-in user
    cartActions.handleAdd({ productId: product?._id });
  };

  return (
    <div
      // href={`/products/${id}`}
      className={` relative overflow-hidden${
        isSlider ? "max-sm:max-w-[200px]" : "max-w-[300px]"
      } block group max-w-[300px] w-full max-sm:max-w-[200px]`}
    >
      {product?.stock === 0 && (
        <div
          className={` rounded-sm ${
            isSlider ? "max-sm:max-w-[200px]" : "max-w-[300px]"
          }  absolute text-white bg-black/70 flex justify-center items-center  j z-10 group max-w-[300px] w-full h-full max-sm:max-w-[200px] `}
        >
          <p className="">Out of stock</p>
        </div>
      )}
      {/* Product Card */}
      <div className="w-full lg:h-[350px] relative overflow-hidden border border-gray-200 rounded-sm lg:p-5 p-2 bg-gradient-to-br from-white via-gray-50 to-white group-hover:from-gray-200 group-hover:via-gray-400 group-hover:to-blue-900 transition-colors duration-500">
        {/* Product Image */}
        <Image
          src={product.image || product.photo}
          alt={product.name}
          width={500}
          height={700}
          className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <h3 className="mt-3 lg:font-medium lg:text-lg  text-sm font-semibold text-gray-800 lg:h-[60px] h-[40px]">
        {product?.name}
      </h3>
      <p className="text-gray-600 lg:text-sm text-xs line-clamp-2">
        {product?.description ||
          "Stylish and comfortable tee for all occasions."}
      </p>

      {/* ✅ Price + Cut Price (Fixed 999) */}
      <div className="flex items-center gap-5 mt-1">
        <span className="font-semibold text-lg text-primary-500">
          {formatePrice(product?.price)}
        </span>
        <span className="text-sm text-gray-500 line-through">
          {formatePrice(product?.mrpPrice)}
        </span>
        <span className="text-sm text-green-500  ">
          {calculatePercentage(product?.mrpPrice, product?.price)}% off
        </span>
      </div>

      {/* View More (smaller button) */}
      <div className="flex lg:flex-row flex-col justify-between">
        <button className="mt-3 px-4 py-2 bg-yellow-500 rounded-sm text-white cursor-pointer hover:bg-yellow-600 transition lg:text-sm text-xs font-medium">
          View More
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); //  bubbling roka
            e.preventDefault(); // link navigate bhi block ho gaya
            // cartActions.handleAdd({ productId: product?._id });
            handleAddToCart(product);
          }}
          className="mt-3 px-4 py-2 bg-yellow-500 rounded-sm text-white hover:bg-yellow-600 transition text-sm font-medium cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
