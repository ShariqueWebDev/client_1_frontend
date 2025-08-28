import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i._id === item._id);

      if (existing) {
        // ✅ stock check karo
        if (existing.quantity < item.stock) {
          existing.quantity += 1;
        } else {
          alert("Sorry! Maximum stock reached 😞");
        }
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // agar 1 hai aur kam karo to remove
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleCart,
  setCartOpen,
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
