"use client";
import { orderApi, useGetUserOrderQuery } from "../../redux/api/orderApi";
import { useLogoutUserMutation } from "../../redux/api/userApi";
import Image from "next/image";
import dayjs from "dayjs";
import { logout } from "../../redux/reducers/auth-reducers";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";

export default function MyOrder() {
  const { data, isLoading } = useGetUserOrderQuery();
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderApi.util.invalidateTags(["Order"]));
  }, []);

  console.log(data?.orders, "user order data......");

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
        {data?.orders?.length === 0 ? (
          <div className="h-full flex justify-center items-center text-gray-500">
            No order found!
          </div>
        ) : (
          data?.orders?.map((item) => {
            // console.log(data?.orders, "parent order data.......");

            return (
              <Link href={`/single-order/${item?._id}`} key={item?._id}>
                <div key={item?._id} className=" ">
                  <div className="mb-3">
                    Ordered on:{" "}
                    {dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm")}
                  </div>
                  {item?.orderItems?.map?.((order, index) => {
                    console.log(order?.size, "order item........");

                    return (
                      <div className="relative " key={index}>
                        {/* <Link href={`/single-order/1`}> */}
                        <div className="flex items-center gap-3 mb-4 border-b border-b-gray-200 pb-2">
                          <Image
                            width={300}
                            height={300}
                            src={
                              order?.productId?.photos?.[0] ||
                              "/assets/tshirt-mockup.png"
                            } // fallback image
                            alt={order?.productId?.name || "Product Image"} // fallback alt text
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="px-2">
                            <p className="font-medium text-xs mb-1 max-w-[200px] line-clamp-2">
                              {order?.productId?.name}
                            </p>
                            <div className="flex items-center gap-5">
                              <p className="text-gray-400 text-xs">
                                Quantity: {order?.quantity}
                              </p>
                            </div>
                            <p className="text-gray-400 text-xs mt-1">
                              Status:{" "}
                              <span className="text-gray-700">
                                {item?.status}
                              </span>
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              Size:{" "}
                              <span className="text-gray-700">
                                {order?.size}
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* </Link> */}
                      </div>
                    );
                  })}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
