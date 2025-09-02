"use client";
import React, { useEffect, useState } from "react";
import { useGetCartQuery } from "../../redux/api/cartApi";
import { useDispatch, useSelector } from "react-redux";
import { formatePrice } from "../../utils/features";
import { AiOutlineDelete } from "react-icons/ai";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useCreateOrderMutation } from "../../redux/api/orderApi";
import axios from "axios";

import LoaderComponent from "../LoaderComponent/LoaderComponent";
import LoginWithCheckout from "../Checkout/LoginWithCheckout";
import Image from "next/image";

// import {clearCart} from "../../redux/reducers/cart-reducer"
import { cartActions } from "../../redux/actions/cart-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { productApi } from "../../redux/api/productApi";

// Zod schema
const orderSchema = z.object({
  address: z.string().min(10, "Address is required"),
  city: z.string().min(3, "City is required"),
  state: z.string().min(3, "State is required"),
  country: z.string().min(3, "Country is required"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "Pin Code should be 6 digits"),
  phoneNo: z.string().regex(/^[0-9]{10}$/, "Phone should be exactly 10 digits"),
});

const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const { items: cart, isLoading } = useSelector((state) => state.cart);
  const { data, isSuccess } = useGetCartQuery(undefined, { skip: !user });
  const router = useRouter();

  //  for order creation
  const [createOrder, { isLoading: orderLoading, isSuccess: orderSucceed }] =
    useCreateOrderMutation();

  const isCartLoading = isLoading || (user && !isSuccess);

  //  total calculate
  const total = cart.reduce(
    (acc, item) =>
      acc + (user ? item?.productId?.price : item?.price) * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("Razorpay"); // default cash on delivery

  //  React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  // onSubmit
  const onSubmit = async (formData) => {
    try {
      //  payment info prepare
      let paymentInfo = {
        id: "",
        status: paymentMethod === "COD" ? "Pending" : "Paid",
        method: paymentMethod === "COD" ? "Cash On Delivery" : "Razorpay",
      };

      if (paymentMethod === "Razorpay") {
        paymentInfo.id = "pay_" + new Date().getTime();
      }

      //  order items prepare
      const orderItems = cart.map((item) => ({
        productId: item?.productId?._id,
        name: item?.productId?.name,
        price: item?.productId?.price,
        quantity: item.quantity,
        photo: item?.productId?.photo,
      }));

      //  payload
      const payload = {
        shippingInfo: formData,
        orderItems,
        user: user?._id || null,
        subtotal: total,
        tax: 0,
        shippingCharges: 50,
        discount: 0,
        total: total + 50,
        paymentInfo,
      };

      // ✅ RTK Query call
      const res = await createOrder(payload).unwrap();
      if (res) {
        toast.success(res.message || "Order placed successfully!");
      }
      resetField();
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Order failed");
    }
  };

  useEffect(() => {
    // 2️⃣ Order successful
    if (orderSucceed) {
      cartActions.handleClear(); // cart clear kar do
    }
  }, [cart, isCartLoading, orderSucceed]);

  useEffect(() => {
    // 2️⃣ Order successful
    if (orderSucceed) {
      router.replace("/my-orders");
    }
  }, [orderSucceed]);

  //   if (!isCartLoading && cart.length === 0) {
  //     return <LoaderComponent status="Checkout Loading..." />;
  //   }

  return (
    <div className="flex lg:flex-row flex-col ">
      {/* Left Side Form */}
      <div className="lg:w-[55%] w-full lg:p-24 p-4">
        {!user ? (
          <LoginWithCheckout />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex  items-center gap-1">
              <Image
                src={"/logo/refilly.webp"}
                width={40}
                height={200}
                alt="Refilly"
              />
              <p className="text-2xl font-semibold text-gray-700">Refilly</p>
            </div>
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

            <input
              disabled={cart.length === 0}
              {...register("address")}
              placeholder="Full Address"
              className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
            />
            {errors.address && (
              <p className="text-red-500 -mt-2 text-sm">
                {errors.address.message}
              </p>
            )}

            <div className="flex lg:flex-row flex-col gap-3 items-center ">
              <div className="w-full">
                <input
                  disabled={cart.length === 0}
                  {...register("city")}
                  placeholder="City"
                  className="border p-2 w-full rounded  border-gray-300 focus:outline-none text-sm"
                />
                {errors.city && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="w-full">
                <input
                  disabled={cart.length === 0}
                  {...register("state")}
                  placeholder="State"
                  className="border p-2 w-full rounded  border-gray-300 focus:outline-none text-sm"
                />
                {errors.state && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex lg:flex-row flex-col gap-3 items-center">
              <div className="w-full">
                <input
                  disabled={cart.length === 0}
                  {...register("country")}
                  placeholder="Country"
                  className="border p-2 w-full rounded  border-gray-300 focus:outline-none text-sm"
                />
                {errors.country && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <input
                  disabled={cart.length === 0}
                  {...register("pinCode")}
                  placeholder="Pin Code"
                  className="border p-2 w-full rounded  border-gray-300 focus:outline-none text-sm"
                />
                {errors.pinCode && (
                  <p className="text-red-500 mt-2 text-sm">
                    {errors.pinCode.message}
                  </p>
                )}
              </div>
            </div>
            <input
              disabled={cart.length === 0}
              {...register("phoneNo")}
              placeholder="Phone Number"
              className="border p-2 w-full rounded  border-gray-300 focus:outline-none text-sm"
            />
            {errors.phoneNo && (
              <p className="text-red-500 -mt-2 text-sm">
                {errors.phoneNo.message}
              </p>
            )}

            {/*  Payment Method */}
            <div className="flex gap-4 mt-4 mb-6 lg:text-sm text-xs">
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={cart.length === 0}
                  type="radio"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <label>Cash on Delivery</label>
              </div>
              <div className="flex gap-1.5 items-center">
                <input
                  disabled={cart.length === 0}
                  type="radio"
                  value="Razorpay"
                  checked={paymentMethod === "Razorpay"}
                  onChange={() => setPaymentMethod("Razorpay")}
                />
                <label>Razorpay</label>
              </div>
            </div>

            {/* <Link href={"/my-orders"} className=""> */}
            <button
              disabled={cart.length === 0}
              type="submit"
              className={` ${
                cart.length === 0
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-yellow-600 "
              } bg-yellow-500 text-white py-1.5 px-3 text-sm rounded `}
            >
              Place Order
            </button>
            {/* </Link> */}
          </form>
        )}
      </div>

      {/* Right Side Cart Summary */}
      <div className="lg:w-[45%] w-full lg:px-5">
        <div className="overflow-y-auto h-screen hide-scrollbar p-4 w relative">
          {isCartLoading && <LoaderComponent status="Loading..." />}
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center ">
              <div className="w-[120px]">
                <Image
                  src={"/assets/empty-cart.webp"}
                  width={500}
                  height={500}
                  alt="empty cart image"
                />
              </div>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => {
              const prod = user ? item?.productId : item;
              return (
                <div className="relative" key={prod?._id}>
                  <div className="flex items-center gap-3 mb-4 border-b border-b-gray-200 pb-2">
                    <Image
                      width={200}
                      height={200}
                      src={prod?.photo}
                      alt={prod?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="px-2">
                      <p className="font-medium text-xs mb-1 max-w-[200px] line-clamp-2">
                        {prod?.name}
                      </p>
                      <div className="flex items-center gap-5">
                        <p className="text-gray-600 text-sm font-semibold">
                          {formatePrice(prod?.price)}
                        </p>
                        <p className="text-gray-400 text-xs">
                          Quantity: {item?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div className="p-4 sticky -bottom-4 bg-white">
            <div className="flex items-center justify-between font-semibold text-gray-800">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
