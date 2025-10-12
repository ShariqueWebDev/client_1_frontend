"use client";
import React from "react";
import {
  orderApi,
  useGetSingleOrderQuery,
  usePutCancelOrderMutation,
} from "../../redux/api/orderApi";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import Image from "next/image";
import { logout } from "../../redux/reducers/auth-reducers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";

import { formatePrice } from "../../utils/features";
import toast from "react-hot-toast";

export default function MyOrder() {
  const { slug } = useParams();
  const { data, isLoading, refetch } = useGetSingleOrderQuery({
    orderId: slug,
  });
  const [putCancelOrder, { isLoading: isCancelling }] =
    usePutCancelOrderMutation();
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  const handleCancelOrder = async (orderId) => {
    try {
      // Step 1: Optimistic update
      dispatch(
        orderApi.util.updateQueryData(
          "getSingleOrder",
          { orderId },
          (draft) => {
            if (draft?.single_order) {
              draft.single_order.status = "Cancelled";
            }
          }
        )
      );

      // Step 2: API call
      const response = await putCancelOrder({ orderId }).unwrap();
      toast.success("Your order has cancelled");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to cancel order");

      // Step 3: Rollback (force refetch)
      dispatch(orderApi.util.invalidateTags(["Order"]));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      router.push("/login");
      toast.success(`${user.name} logged out`);
    } catch (error) {
      console.log("logout failed");
    }
  };
  // console.log(data?.single_order, slug, "single order data......");

  const steps = [
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStatus = data?.single_order?.status;
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="lg:px-20 px-4 flex lg:flex-row flex-col lg:gap-10 my-10 min-h-screen">
      <div className="lg:w-[30%] w-full h-full lg:sticky top-5">
        <div className="p-5 h-fit bg-gray-200 rounded-sm">
          <div className="text-xl font-semibold capitalize">{user?.name}</div>
          <div className="flex items-center gap-1 text-sm mt-1">
            <span className="">Email: </span>
            <span className="text-gray-500">{user?.email}</span>
          </div>
        </div>
        {/* <div
          className="text-center mt-2 bg-yellow-500 rounded-sm text-white py-2 text-sm font-medium cursor-pointer"
          onClick={() => handleLogout()}
        >
          Logout
        </div> */}
      </div>

      <div className="lg:w-[70%] w-full max-sm:mt-10">
        <div className="mb-5">
          <div className="flex lg:flex-row gap-5   justify-between flex-col border border-gray-200 rounded-sm p-5">
            <div className="w-full p-5 rounded-sm bg-gray-100">
              <div className="max-sm:text-sm">Ordered on </div>
              <div className="lg:text-sm text-xs mt-2 text-gray-600 ">
                {new Date(data?.single_order?.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="w-full p-5 rounded-sm bg-gray-100">
              <div className="max-sm:text-sm">Total amount</div>
              <div className="lg:text-sm text-xs mt-2 text-gray-600 ">
                {formatePrice(
                  data?.single_order?.subtotal +
                    data?.single_order?.shippingCharges
                )}
              </div>
            </div>
            <div className="w-full p-5 rounded-sm bg-gray-100">
              <div className="max-sm:text-sm">Payment method</div>
              <div className="lg:text-sm text-xs mt-2 text-gray-600 ">
                {data?.single_order?.paymentInfo?.method}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="w-full p-5 rounded-sm border border-gray-200">
            <div className="max-sm:text-sm">Shippment Status </div>
            <div className={`lg:text-sm text-xs mt-2 text-gray-500 `}>
              Status: {data?.single_order?.status}
            </div>
            <div className="">
              <div className="my-8">
                <div className="flex items-center">
                  {steps.map((step, index) => (
                    <div key={index} className="flex-1 flex items-center">
                      {/* Circle */}
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 text-sm
            ${
              index <= currentIndex
                ? "bg-green-700 border-green-700 text-white"
                : "bg-gray-200 border-gray-300 text-gray-500"
            }
          `}
                      >
                        {index + 1}
                      </div>

                      {/* Step Label */}
                      <div className="absolute mt-20 text-xs text-center w-20 -ml-6">
                        <span
                          className={`  ${
                            index <= currentIndex
                              ? "text-green-600 font-medium"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-1 ${
                            index < currentIndex
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {data?.single_order?.status === "Cancelled" &&
          (isCancelling ? (
            <div className="my-3 text-sm text-gray-400">Loading...</div>
          ) : (
            <div className="text-red-500 text-sm my-3">
              {data?.single_order?.paymentInfo?.method === "Razorpay"
                ? "Your order has been cancelled successfully and a refund has been initiated to your original payment method. Refunds may take 5–7 business days to reflect."
                : ` We’ve processed your cancellation request. Your order is now
              cancelled.`}
            </div>
          ))}

        <button
          disabled={
            isCancelling ||
            data?.single_order?.status === "Cancelled" ||
            data?.single_order.status === "Delivered"
          }
          onClick={() => handleCancelOrder(slug)}
          className={`bg-yellow-500 hover:bg-yellow-600 w-fit px-4 py-2 mb-5 text-white lg:text-sm text-xs rounded-sm ${
            isCancelling ? "opacity-50 cursor-not-allowed" : ""
          } ${
            data?.single_order?.status === "Cancelled"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {isCancelling ? "Cancelling..." : "Cancel Order"}
        </button>
        <div key={data?.single_order?._id} className=" ">
          {data?.single_order?.orderItems?.map((order, index) => (
            <div className="relative " key={index}>
              <div className="flex items-center gap-3 mb-4 border-b border-b-gray-200 pb-2">
                <Image
                  width={500}
                  height={500}
                  src={order?.productId?.photos?.[0]}
                  alt={order?.name}
                  className="w-32 h-36 object-cover rounded"
                />
                <div className="px-2">
                  <p className="font-medium text-xs lg:text-lg mb-1 max-w-[250px] line-clamp-2">
                    {order?.productId?.name}
                  </p>
                  <p className="text-gray-400 lg:text-sm text-xs mt-1 mb-1">
                    Price:{" "}
                    <span className="text-gray-700">
                      {formatePrice(order?.productId?.price)}
                    </span>
                  </p>
                  <div className="flex items-center gap-5">
                    <p className="text-gray-400 lg:text-sm text-xs">
                      Quantity:{" "}
                      <span className="text-gray-800">{order?.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <div className="max-sm:text-sm mt-10 mb-5">Shippment Address </div>
          <div className="flex lg:flex-row gap-5   justify-between flex-col border border-gray-200 rounded-sm p-5 ">
            <div className=" flex-1 w-full p-5 rounded-sm bg-gray-100">
              <div className="max-sm:text-sm">Delivery address </div>
              <div className="lg:text-sm text-xs mt-2 text-gray-600 ">
                {data?.single_order?.user?.name}
              </div>
              <div className="lg:text-sm text-xs mt-2 text-gray-600 ">
                {data?.single_order?.shippingInfo?.address}{" "}
                {data?.single_order?.shippingInfo?.city}
              </div>
            </div>
            <div className="flex-1  w-full p-5 rounded-sm bg-gray-100">
              <div className="max-sm:text-sm">Price Details</div>
              <div className="lg:text-sm text-xs mt-2 text-gray-600 ">
                Item total ({data?.single_order?.orderItems?.length}):{" "}
                {formatePrice(data?.single_order?.subtotal)}
              </div>
              <div className="lg:text-sm text-xs mt-2 text-gray-600 ">
                Shipping charges:{" "}
                {formatePrice(data?.single_order?.shippingCharges)}
              </div>

              <div className="lg:text-sm text-xs mt-3 pt-3 border-t border-gray-300 text-gray-600 mt- ">
                Payable total:{" "}
                <span className="text-gray-800">
                  {" "}
                  {formatePrice(
                    data?.single_order?.shippingCharges +
                      data?.single_order?.subtotal
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
