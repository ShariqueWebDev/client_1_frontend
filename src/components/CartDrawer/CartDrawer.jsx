"use client";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import {
  setCartOpen,
  clearCart,
  toggleCart,
} from "../../redux/reducers/cart-reducer";
import { cartActions } from "../../redux/actions/cart-actions";
import Image from "next/image";
import { useGetCartQuery } from "@/redux/api/cartApi";
import { formatePrice } from "@/utils/features";
import { useEffect, useState } from "react";
import { Delete } from "lucide-react";
import { AiOutlineDelete } from "react-icons/ai";

export default function CartDrawer() {
  // const [userId, setUserId] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { items: cart, cartOpen } = useSelector((state) => state.cart);
  const { data, isSuccess, refetch } = useGetCartQuery(undefined, {
    skip: !user,
  });

  const dispatch = useDispatch();

  console.log(cart, "cart drawer items.......");

  useEffect(() => {
    if (isSuccess && data?.items) {
      dispatch(setCart(data.items));
    }
  }, [isSuccess, data, dispatch]);

  // Logout hone pe cart clear karo
  useEffect(() => {
    if (!user) {
      dispatch(clearCart());
    } else {
      refetch();
    }
  }, [user, dispatch, refetch]);

  // total amount
  const total = cart.reduce(
    (acc, item) => acc + item?.productId?.price * item.quantity,
    0
  );

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const userDet = localStorage.getItem("user");
  //     if (userDet) {
  //       try {
  //         const parsed = JSON.parse(userDet); // agar object hai
  //         setUserId(parsed?._id); // ya jo field chahiye
  //       } catch (err) {
  //         console.error("Invalid JSON in localStorage", err);
  //       }
  //     }
  //   }
  // }, []);

  // console.log(userId, "userId");
  console.log(cart, "cart data..");
  console.log(data, "only data..");

  return (
    <div
      className={`fixed inset-0 z-40 transition ${
        cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => dispatch(setCartOpen(false))}
      ></div>

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-[360px] bg-white shadow-xl  flex flex-col justify-between transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="">
          <div className="flex items-center justify-between p-4 border-b border-b-gray-200">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button
              onClick={() => dispatch(setCartOpen(false))}
              className="px-1 text-sm rounded hover:bg-gray-200 cursor-pointer"
            >
              ✕
            </button>
          </div>
          {!cart.length <= 0 && (
            <p
              className="text-right pt-2   border-gray-200 px-4 text-xs cursor-pointer "
              onClick={() => cartActions.handleClear()}
            >
              Clear All
            </p>
          )}
        </div>

        {/* Cart Items */}

        <div className="overflow-y-auto h-full p-4">
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
            cart?.map((item) => {
              const prod = item?.productId;
              console.log(item?.productId?._id, "single cart data.........");

              return (
                <div className="relative" key={prod?._id}>
                  <div className="flex items-center justify- gap-3 mb-4  border-b border-b-gray-200 pb-2 cursor-pointer">
                    <Image
                      width={200}
                      height={200}
                      src={prod?.photo || "/assets/tshirt-mockup.png"}
                      alt={prod?.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className=" px-2">
                      <p className="font-medium text-xs mb-1 max-w-[200px] line-clamp-2 max-sm:max-w-[160px]">
                        {prod?.name}
                      </p>
                      <div className="flex  items-center gap-5">
                        <p className="text-gray-600 text-sm font-semibold">
                          {formatePrice(prod?.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex h-[20px] items-center mt-1">
                          <button
                            onClick={() =>
                              cartActions?.handleDecrease({
                                productId: prod?._id,
                              })
                            }
                            className="px-2 h-full text-sm bg-yellow-500 text-white rounded-tl-sm rounded-bl-sm cursor-pointer"
                          >
                            {item?.quantity > 1 ? "-" : <AiOutlineDelete />}
                          </button>
                          <span className="text-sm bg-gray-200 px-2 ">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() => {
                              cartActions?.handleIncrease({
                                productId: prod?._id,
                              });
                            }}
                            className="px-2 text-sm bg-yellow-500 text-white rounded-tr-sm rounded-br-sm  cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-red-500 bg-gray-100 p-0.5 text-[10px] rounded-[2px] hover:underline absolute right-0 top-0 cursor-pointer"
                      onClick={() => {
                        cartActions.handleRemove({ productId: prod?._id });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="p-4 border-t border-t-gray-200 space-y-3">
          {/* ✅ Total Price */}
          <div className="flex items-center justify-between font-semibold text-gray-800">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <button
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 cursor-pointer transition"
            onClick={() => alert("Checkout Coming Soon 🚀")}
          >
            Proceed to Checkout
          </button>
        </div>

        {/*Drawer Footer */}
      </div>
    </div>
  );
}
