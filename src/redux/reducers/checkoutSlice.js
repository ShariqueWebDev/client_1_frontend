import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkoutMode: "none", // "buynow" | "cart"
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutMode: (state, action) => {
      state.checkoutMode = action.payload;
    },
    clearCheckoutMode: (state) => {
      state.checkoutMode = "none";
    },
  },
});

export const { setCheckoutMode, clearCheckoutMode } = checkoutSlice.actions;
export default checkoutSlice.reducer;
