import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../api/cartApi";

const initialState = {
  items: [],
  isLoading: false,
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    setCartOpen: (state, action) => {
      state.cartOpen = action.payload;
    },

    setCart: (state, action) => {
      state.items = action.payload;
    },
    // addToCart: (state, action) => {
    //   const item = action.payload;
    //   const existing = state.items.find((i) => i._id === item._id);
    //   if (existing) {
    //     // agar product already cart me hai, to kuch mat karo
    //     // sirf ek notification ya alert dikhado
    //     alert("Product already in cart. You can change quantity in cart.");
    //   } else {
    //     // sirf ek product add hoga with quantity 1
    //     state.items.push({ ...item, quantity: 1 });
    //   }
    // },
    // increaseQuantity: (state, action) => {
    //   const item = state.items.find((i) => i._id === action.payload);
    //   if (item) {
    //     if (item.quantity < item.stock) {
    //       item.quantity += 1;
    //     } else {
    //       alert("Sorry! Maximum stock reached 😞");
    //     }
    //   }
    // },
    // decreaseQuantity: (state, action) => {
    //   const item = state.items.find((i) => i._id === action.payload);
    //   if (item) {
    //     if (item.quantity > 1) {
    //       item.quantity -= 1;
    //     } else {
    //       // agar 1 hai aur kam karo to remove
    //       state.items = state.items.filter((i) => i._id !== action.payload);
    //     }
    //   }
    // },
    // removeFromCart: (state, action) => {
    //   state.items = state.items.filter((i) => i._id !== action.payload);
    // },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(cartApi.endpoints.getCart.matchPending, (state) => {
        state.isLoading = true; // call start hote hi loading true
      })
      .addMatcher(
        cartApi.endpoints.getCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.cart.items;
          state.isLoading = false; // success ke baad loading false
        }
      )
      .addMatcher(cartApi.endpoints.getCart.matchRejected, (state) => {
        state.isLoading = false; // fail ke baad bhi loading false
      })
      .addMatcher(
        cartApi.endpoints.addToCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.cart.items;
        }
      )
      .addMatcher(
        cartApi.endpoints.removeFromCart.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.cart.items;
        }
      )
      .addMatcher(
        cartApi.endpoints.increaseCartItem.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.cart.items;
        }
      )
      .addMatcher(
        cartApi.endpoints.decreaseCartItem.matchFulfilled,
        (state, { payload }) => {
          state.items = payload.cart.items;
        }
      )
      .addMatcher(cartApi.endpoints.clearCartItem.matchFulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { toggleCart, setCartOpen, clearCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
