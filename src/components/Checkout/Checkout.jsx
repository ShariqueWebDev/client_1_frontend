"use client";
import React, { useEffect, useState } from "react";
import { useGetCartQuery } from "../../redux/api/cartApi";
import { useSelector } from "react-redux";
import { formatePrice } from "../../utils/features";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  useCreateOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation,
  useValidatePincodeMutation,
} from "../../redux/api/orderApi";
import { cartActions } from "../../redux/actions/cart-actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import LoginWithCheckout from "../Checkout/LoginWithCheckout";
import FirebaseOtp from "../Checkout/FirebaseOtp";

import Image from "next/image";

// Zod schema
const orderSchema = z.object({
  address: z.string().min(10, "Address is required"),
  city: z.string().min(3, "City is required"),
  state: z.string().min(3, "State is required"),
  country: z.string().min(3, "Country is required"),
  pinCode: z.string().regex(/^[0-9]{6}$/, "Pin Code should be 6 digits"),
  phoneNo: z.string().regex(/^[7-9]\d{9}$/, "Enter a valid phone number"),
});

const Checkout = () => {
  const [cartMobile, setCartMobile] = useState(false);
  const [pin, setPin] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { items: cart, isLoading } = useSelector((state) => state.cart);
  const { data, isSuccess } = useGetCartQuery(undefined, { skip: !user });
  const [validatePincode, { data: pinData, error, isLoading: pinLoading }] =
    useValidatePincodeMutation();

  useEffect(() => {
    if (!pin) return;

    const timer = setTimeout(() => {
      validatePincode({ pin });
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [pin]);

  const router = useRouter();

  console.log(cart, "Checkout Page......");

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  // Order creation mutations
  const [createOrder, { isLoading: orderLoading, isSuccess: orderSucceed }] =
    useCreateOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();

  const isCartLoading = isLoading || (user && !isSuccess);

  // Total calculation
  const total = cart.reduce(
    (acc, item) =>
      acc + (user ? item?.productId?.price : item?.price) * item.quantity,
    0
  );

  // console.log(cart, "cart data..");

  // Autofill City, District, State from DB
  useEffect(() => {
    if (pinData?.success) {
      setValue("city", pinData.data.city || "");
      setValue("state", pinData.data.state || "");
      setValue("country", "India");
    }
  }, [pinData, setValue]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup to remove script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle order success
  useEffect(() => {
    if (orderSucceed) {
      cartActions.handleClear();
      router.replace("/my-orders");
    }
  }, [orderSucceed, router]);

  // Form submission
  const onSubmit = async (formData) => {
    console.log(formData, cart, "form data.............");

    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    if (isNaN(total) || total <= 0) {
      toast.error("Invalid cart total");
      return;
    }

    if (paymentMethod === "COD") {
      try {
        await createOrder({
          shippingInfo: formData,
          orderItems: cart,
          subtotal: total,
          tax: 0,
          shippingCharges: 40,
          discount: 0,
          total: total,
          paymentInfo: {
            id: "COD_" + Date.now(),
            status: "Pending",
            method: "Cash On Delivery",
          },
          user: user?._id,
        }).unwrap();

        toast.success("Order placed with COD!");
        cartActions.handleClear();
        router.replace("/my-orders");
      } catch (err) {
        toast.error("COD order failed");
        console.error("COD order error:", err);
      }
      return; // ✅ ensure Razorpay block never runs
    }

    // ✅ Razorpay flow
    try {
      const response = await createRazorpayOrder(total).unwrap();
      const razorpayData = response.data;

      if (!razorpayData?.id || !razorpayData?.amount) {
        toast.error("Failed to create Razorpay order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: razorpayData.amount,
        currency: "INR",
        name: "Refilly",
        description: "Order Payment",
        order_id: razorpayData.id,
        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                shippingInfo: formData,
                orderItems: cart,
                subtotal: total,
                tax: 0,
                shippingCharges: 40,
                discount: 0,
                total: total,
              },
            }).unwrap();

            toast.success("Payment successful!");
            cartActions.handleClear();
            router.replace("/my-orders");
          } catch (err) {
            toast.error("Payment verification failed");
            console.error("Verification error:", err);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: formData.phoneNo,
        },
        theme: { color: "#F37254" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      toast.error("Payment failed");
      console.error("Razorpay order creation error:", err);
    }
  };

  // Conditional rendering after Hooks
  if (isCartLoading) {
    return <LoaderComponent status="Loading cart..." />;
  }

  if (!user) {
    return <LoginWithCheckout />;
  }

  return (
    <div className="flex lg:flex-row flex-col min-h-screen">
      {/* Left Side Form */}
      <div className="lg:w-[55%] w-full max-sm:px-3 px-20 py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-1 max-sm:hidden">
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

          <div className="flex lg:flex-row flex-col gap-3 items-center">
            <div className="w-full">
              <input
                disabled={cart.length === 0}
                {...register("city")}
                placeholder="City"
                className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
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
                className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
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
                className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
              />
              {errors.country && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div className="w-full relative">
              <input
                {...register("pinCode")}
                type="number"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setValue("pinCode", e.target.value); // 👈 important
                }}
                className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
                placeholder="Pin Code"
              />

              {/* Loading */}
              {pinLoading && (
                <p className="text-blue-500 absolute top-1.5 text-sm right-7 mt-1">
                  Checking...
                </p>
              )}

              {/* Invalid */}
              {error && !pinLoading && pin.length > 0 && (
                <p className="text-red-500 absolute top-1.5 text-sm right-7 mt-1">
                  Invalid Pincode
                </p>
              )}

              {/* Valid */}
              {/* {pinData?.success && !pinLoading && (
                <p className="text-green-600 absolute top-1.5 text-sm right-5 mt-1">
                  Valid Pincode
                </p>
              )} */}
            </div>
          </div>
          <input
            type="text"
            maxLength={10}
            {...register("phoneNo")}
            placeholder="Phone Number"
            className="border p-2 w-full rounded border-gray-300 focus:outline-none text-sm"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // only numbers
            }}
          />

          {errors.phoneNo && (
            <p className="text-red-500 -mt-2 text-sm">
              {errors.phoneNo.message}
            </p>
          )}

          {/* Payment Method */}
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

          <button
            disabled={cart.length === 0}
            type="submit"
            className={`${
              cart.length === 0
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-yellow-600"
            } bg-yellow-500 text-white py-1.5 px-3 text-sm rounded`}
          >
            Place Order
          </button>
        </form>
        {/* <FirebaseOtp /> */}
      </div>

      {/* Right Side Cart Summary */}
      <div className={`lg:w-[45%] max-sm:hidden w-full lg:px-5`}>
        <div className="overflow-y-auto h-screen hide-scrollbar p-4 w relative">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
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
                      src={prod?.photos?.[0]}
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
                        <p className="text-gray-400 text-xs">
                          Size: {item?.size}
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

      {/* Mobile Cart Popup */}
      <div
        className={`fixed bottom-0 bg-white w-full z-10 transform transition-transform duration-300 ${
          cartMobile ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Close Button */}
        <div className="absolute top-0 z-10 flex justify-between items-center px-4 pb-3 pt-4 bg-white border-b border-gray-300 cursor-pointer w-full">
          <div className="flex items-center gap-1">
            <Image
              src={"/logo/refilly.webp"}
              width={40}
              height={200}
              alt="Refilly"
            />
            <p className="text-2xl font-semibold text-gray-700">Refilly</p>
          </div>
          <div onClick={() => setCartMobile(false)}>
            <X size={17} />
          </div>
        </div>

        {/* Cart Content */}
        <div className="overflow-y-auto h-screen hide-scrollbar p-4 pt-24 pb-14 relative">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-[120px]">
                <Image
                  src={"/assets/empty-cart.webp"}
                  width={500}
                  height={500}
                  alt="empty cart image"
                />
              </div>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => {
              const prod = user ? item?.productId : item;
              console.log(prod, "mobile checkout.....");

              return (
                <div className="relative" key={prod?._id}>
                  <div className="flex items-center gap-3 border-b border-b-gray-200 pb-2">
                    <Image
                      width={200}
                      height={200}
                      src={prod?.photos[0]}
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
                        <p className="text-gray-400 text-xs">
                          Size: {item?.size}
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

      {/* Toggle Button */}
      <div
        className="fixed gap-2 md:hidden bottom-0 z-20 flex justify-center items-center w-full py-3 border bg-white border-t border-gray-300 rounded-tl-xl rounded-tr-xl cursor-pointer"
        onClick={() => setCartMobile(!cartMobile)}
      >
        <Image
          src={"/assets/order-summary.png"}
          width={22}
          height={22}
          alt="order summary"
        />
        <p className="text-sm">Order summary</p>
      </div>
    </div>
  );
};

export default Checkout;
