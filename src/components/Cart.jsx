"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { calculatePercentage, formatePrice } from "../utils/features";
import { cartActions } from "../redux/actions/cart-actions";
// import { useSelector } from "react-redux";

import { useSelector, useDispatch } from "react-redux";
import { setCart, clearCart } from "../redux/reducers/cart-reducer";
import { getGuestCart, setGuestCart, clearGuestCart } from "../utils/addToCart";
import toast from "react-hot-toast";
import { useClearCartItemMutation } from "@/redux/api/cartApi";
import { useRouter } from "next/navigation";
// import {
//   useGetCartQuery,
//   useMergeGuestCartMutation,
//   useAddToCartMutation,
// } from "../redux/api/cartApi";

const Cart = ({ product, isSlider, linkUrl }) => {
  const cartItem = useSelector((state) => state.cart.items);
  const [selectedSize, setSelectedSize] = useState(""); // track user selected size
  const [clearCartItem] = useClearCartItemMutation();
  const router = useRouter();

  if (!product) return null; // safety check

  // console.log(cartItem);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const [addToCart] = useAddToCartMutation();

  const handleAddToCart = (product) => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    // 🟡 Guest User
    if (!user) {
      let guestCart = getGuestCart();

      const existing = guestCart.find((item) => item.productId === product._id);

      if (existing) {
        // ❇️ Override size
        existing.size = selectedSize;

        setGuestCart(guestCart);
        dispatch(setCart(guestCart));

        toast.success("Product size updated in cart");
        return;
      }

      // ➕ Add New
      guestCart.push({
        name: product.name,
        productId: product._id,
        photos: product.photos?.length ? product.photos : [product.photo],
        size: selectedSize,
        price: product.price,
        quantity: 1,
        stock: product.stock,
      });

      setGuestCart(guestCart);
      dispatch(setCart(guestCart));

      toast.success("Product added to cart");
      return;
    }

    // 🟢 Logged-in User Cart Logic
    const existingProduct = cartItem?.find(
      (item) => String(item.productId) === String(product._id)
    );

    if (existingProduct) {
      // ❇️ Override size, no duplicate
      cartActions.handleAdd({
        productId: product._id,
        size: selectedSize,
        updateSize: true, // optional
      });

      toast.success("Product size updated in cart");
      return;
    }

    // ➕ Add New
    cartActions.handleAdd({ productId: product._id, size: selectedSize });
    toast.success("Product added to cart");
  };
  const handleClearData = () => {
    if (!selectedSize) return;
    localStorage.removeItem("checkout");
  };

  const handleCartItemData = () => {
    if (!selectedSize) return;
    clearCartItem();
  };

  const handleDirectCheckout = async (product) => {
    console.log(selectedSize, "function DATA");

    if (selectedSize === "" || !selectedSize) {
      toast.error("Please select size");
      return;
    }

    const checkoutProductData = {
      name: product.name,
      description: product.description,
      color: product.color,
      photos: product.photos,
      photoPublicId: product.photoPublicId,
      mrpPrice: product.mrpPrice,
      price: product.price,
      stock: product.stock,
      subCategory: product.subCategory,
      productId: product._id,
      size: selectedSize,
      quantity: 1,
    };
    let storeProduct = await localStorage.setItem(
      "checkout",
      JSON.stringify(checkoutProductData)
    );
    router.push("/checkout");
    console.log(storeProduct, "Store Product....");
  };

  return (
    <div
      // href={`/products/${id}`}
      className={` relative overflow-hidden${
        isSlider
          ? " max-w-[300px] max-sm:max-w-[170px] w-full"
          : "max-w-[300px] w-full "
      } block  `}
    >
      {product?.stock === 0 && (
        <Link href={`/products/${product._id}`}>
          <div
            className={` rounded-sm ${
              isSlider ? "max-sm:max-w-[200px]" : "max-w-[300px]"
            }  absolute text-white bg-black/70 flex justify-center items-center  j z-10  max-w-[300px] w-full h-full max-sm:max-w-[200px] `}
          >
            <p className="">Out of stock</p>
          </div>
        </Link>
      )}
      {/* Product Card */}
      <Link href={`/products/${product._id}`}>
        <div className="w-full lg:h-[350px] h-[200px] relative overflow-hidden border border-gray-200 rounded-sm lg:p-5 p-2 ">
          {/* Product Image */}
          <Image
            src={product.image || product.photos?.[0] || product.photo}
            alt={product.name}
            width={500}
            height={700}
            className="object-cover object-center w-full h-full  transition-transform duration-300 hover:scale-105 "
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
      </Link>
      {/* ✅ Price + Cut Price (Fixed 999) */}
      <div className="flex items-center lg:gap-5 gap-2 mt-1">
        <span className="font-semibold text-lg text-primary-500">
          {formatePrice(product?.price)}
        </span>
        <span className="text-sm text-gray-500 line-through">
          {formatePrice(product?.mrpPrice)}
        </span>
        <span className="text-sm max-sm:text-xs text-green-500  ">
          {calculatePercentage(product?.mrpPrice, product?.price)}% off
        </span>
      </div>
      <div className="mt-2">
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => {
            const isAvailable = product?.sizes?.includes(size);

            return (
              <button
                key={size}
                disabled={!isAvailable}
                type="button"
                onClick={() => isAvailable && setSelectedSize(size)}
                className={` 
                            ${
                              !isAvailable
                                ? "line-through hover:cursor-not-allowed text-gray-300"
                                : ""
                            }
                            px-3 py-1 border rounded cursor-pointer
                            ${
                              selectedSize === size
                                ? "bg-yellow-500 text-white border-yellow-500"
                                : "border-gray-300 text-gray-700 hover:border-yellow-400"
                            }
                          `}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* View More (smaller button) */}
      <div className="flex  justify-between">
        <button
          onClick={() => {
            handleDirectCheckout(product);
            handleCartItemData();
          }}
          className="mt-3 px-2 py-2 max-sm:text-[11px] bg-yellow-500 rounded-sm text-white hover:bg-yellow-600 transition text-sm font-medium cursor-pointer"
        >
          Buy Now
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); //  bubbling roka
            e.preventDefault(); // link navigate bhi block ho gaya
            // cartActions.handleAdd({ productId: product?._id });
            handleAddToCart(product);
            handleClearData();
          }}
          className="mt-3 px-2 py-2 max-sm:text-[11px] bg-yellow-500 rounded-sm text-white hover:bg-yellow-600 transition text-sm font-medium cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
