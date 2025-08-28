"use client";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import {
  setCartOpen,
  removeFromCart,
  addToCart,
  decreaseQuantity,
} from "../../redux/reducers/cart-reducer";
import Image from "next/image";

export default function CartDrawer() {
  const { items: cart, cartOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // total amount
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
        className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-b-gray-200">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => dispatch(setCartOpen(false))}
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
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
            cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between mb-4 border-b border-b-gray-200 pb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 px-2">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-gray-600 text-sm">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
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
      </div>
    </div>
  );
}
