import {
  getGuestCart,
  saveGuestCart,
  clearGuestCart,
} from "../utils/addToCart";
import { cartApi } from "../redux/api/cartApi";

export const addToCartHandler = async (product, user, dispatch) => {
  if (user) {
    // ✅ Logged-in → server
    await dispatch(
      cartApi.endpoints.addToCart.initiate({ productId: product._id })
    );
  } else {
    // 🟡 Guest → localStorage
    let guestCart = getGuestCart();
    const existing = guestCart.find((i) => i._id === product._id);

    if (!existing) {
      guestCart.push({ ...product, quantity: 1 });
    }
    saveGuestCart(guestCart);

    // Optionally: update Redux cart state too
    dispatch(cartSlice.actions.setCart(guestCart));
  }
};

export const mergeGuestCart = async (dispatch, token) => {
  const guestItems = getGuestCart();
  if (guestItems.length === 0) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/v1/cart/merge`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: guestItems }),
      }
    );

    const data = await res.json();
    if (data.success) {
      dispatch(cartSlice.actions.setCart(data.cart.items));
      clearGuestCart();
    }
  } catch (err) {
    console.error("Guest cart merge failed", err);
  }
};
