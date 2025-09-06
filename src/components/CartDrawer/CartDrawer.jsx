"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCart,
  clearCart,
  setCartOpen,
  isloadingHandler,
} from "../../redux/reducers/cart-reducer";
import {
  getGuestCart,
  setGuestCart,
  clearGuestCart,
} from "../../utils/addToCart";
import {
  useGetCartQuery,
  useMergeGuestCartMutation,
} from "../../redux/api/cartApi";
import Image from "next/image";
import { formatePrice } from "@/utils/features";
import { cartActions } from "@/redux/actions/cart-actions";
import { AiOutlineDelete } from "react-icons/ai";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import Link from "next/link";

export default function CartDrawer() {
  const { user } = useSelector((state) => state.auth);
  const {
    items: cart,
    cartOpen,
    isLoading,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { data, refetch, isSuccess } = useGetCartQuery(undefined, {
    skip: !user,
  });
  const [mergeGuestCart] = useMergeGuestCartMutation();
  const isCartLoading = isLoading || (user && !isSuccess);

  // Sync API cart to Redux
  useEffect(() => {
    if (isSuccess && data?.cart) dispatch(setCart(data.cart.items));
    if (!user) {
      dispatch(isloadingHandler(false));
    }
  }, [isSuccess, data]);

  // Merge guest cart on login
  useEffect(() => {
    if (user) {
      const guestCart = getGuestCart();
      if (guestCart.length > 0) {
        mergeGuestCart({ guestItems: guestCart })
          .unwrap()
          .then(async (res) => {
            // Merge success → Redux update immediately
            dispatch(setCart(res.cart.items));
            clearGuestCart();

            // 🔥 Force fresh data from DB
            const fresh = await refetch();
            if (fresh?.data?.cart) {
              dispatch(setCart(fresh.data.cart.items));
            }
          });
      } else {
        // No guest cart, sirf DB reload karo
        refetch().then((fresh) => {
          if (fresh?.data?.cart) {
            dispatch(setCart(fresh.data.cart.items));
          }
        });
      }
    } else {
      // Guest mode
      const guestCart = getGuestCart();
      dispatch(setCart(guestCart));
    }
  }, [user, dispatch, mergeGuestCart, refetch]);

  const increaseCart = (product) => {
    // console.log(product?.productId, "increase cart fucntin");
    dispatch;
    if (!user) {
      let guestCart = getGuestCart() || [];
      const existing = guestCart.find(
        (i) => i.productId === product?.productId
      );

      if (existing) {
        // agar already hai to quantity badhao
        if (existing.quantity <= existing?.stock) {
          existing.quantity += 1;
        } else {
          return console.log("You reached max stock!");
        }
      } else {
        // agar pehli baar add ho raha hai
        guestCart.push({
          productId: product?._id,
          quantity: 1,
          name: product?.name,
          photo: product?.photo,
          price: product?.price,
          stock: product?.stock,
        });
      }

      // update localStorage + redux state
      setGuestCart(guestCart);
      dispatch(setCart(guestCart));
    } else {
      cartActions.handleIncrease({
        productId: product?.productId?._id,
      });
    }
  };

  // decrease cart
  const decreaseCart = (product) => {
    if (!user) {
      let guestCart = getGuestCart() || [];
      const existing = guestCart.find(
        (i) => i.productId === product?.productId
      );

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          // agar quantity 1 thi aur aur kam kiya to remove kar do
          guestCart = guestCart.filter(
            (i) => i.productId !== product?.productId
          );
        }
      }

      setGuestCart(guestCart);
      dispatch(setCart(guestCart));
    } else {
      cartActions.handleDecrease({ productId: product?.productId?._id });
    }
  };

  // remove cart
  const removeCart = (product) => {
    if (!user) {
      let guestCart = getGuestCart() || [];
      const removeProduct = guestCart.filter(
        (i) => i.productId !== product?.productId
      );
      setGuestCart(removeProduct);
      dispatch(setCart(removeProduct));
    } else {
      cartActions.handleRemove({ productId: product?.productId?._id });
    }
  };

  // clear all cart
  const clearCartAll = () => {
    if (!user) {
      // Guest Cart ke liye
      setGuestCart([]);
      dispatch(setCart([]));
    } else {
      // Logged-in User Cart ke liye
      cartActions.handleClear();
    }
  };

  // total amount
  const total = cart.reduce(
    (acc, item) => acc + item?.productId?.price * item.quantity,
    0
  );

  const guestTotal = cart.reduce(
    (acc, item) => acc + item?.price * item.quantity,
    0
  );

  // console.log(cart, "cart data..");
  // console.log(data, "only data..");

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
              onClick={() => {
                // cartActions.handleClear();
                clearCartAll();
              }}
            >
              Clear All
            </p>
          )}
        </div>

        {/* Cart Items */}

        <div className="overflow-y-auto h-screen hide-scrollbar p-4 relative">
          {isCartLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-[3px] z-50 flex justify-center items-baseline">
              <LoaderComponent
                status="Loading..."
                size={20}
                color={"white"}
                className={"text-sm !bg-transparent "}
                textClass={"!text-gray-200"}
              />
            </div>
          )}
          {cart.length === 0 ? (
            <>
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
            </>
          ) : (
            cart?.map((item) => {
              const prod = item?.productId;

              return (
                <div
                  className="relative"
                  key={prod?._id || item?.productId || `guest-${index}`}
                >
                  <div className="flex items-center justify- gap-3 mb-4  border-b border-b-gray-200 pb-2 cursor-pointer">
                    <Image
                      width={200}
                      height={200}
                      src={
                        !user
                          ? item?.photo || "/assets/tshirt-mockup.png"
                          : prod?.photo || "/assets/tshirt-mockup.png"
                      }
                      alt={
                        !user
                          ? item?.name || "No name"
                          : prod?.name || "No name"
                      }
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div className=" px-2">
                      <p className="font-medium text-xs mb-1 max-w-[200px] line-clamp-2 max-sm:max-w-[160px]">
                        {!user ? item?.name : prod?.name}
                      </p>
                      <div className="flex  items-center gap-5">
                        <p className="text-gray-600 text-sm font-semibold">
                          {formatePrice(!user ? item?.price : prod?.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex h-[20px] items-center mt-1">
                          <button
                            onClick={() =>
                              // cartActions?.handleDecrease({
                              //   productId: prod?._id,
                              // })
                              decreaseCart(item)
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
                              // cartActions?.handleIncrease({
                              //   productId: prod?._id,
                              // });
                              increaseCart(item);
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
                        // cartActions.handleRemove({ productId: prod?._id });
                        removeCart(item);
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
            <span>₹{!user ? guestTotal : total}</span>
          </div>

          <Link href={"/checkout"} onClick={() => dispatch(setCartOpen(false))}>
            <div className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 cursor-pointer transition text-center">
              Proceed to Checkout
            </div>
          </Link>
        </div>

        {/*Drawer Footer */}
      </div>
    </div>
  );
}
