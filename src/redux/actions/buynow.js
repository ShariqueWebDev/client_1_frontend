import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buttonType: "CheckoutBtn",
  buyNowProduct: null,
};

const buynowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setButtonType: (state, action) => {
      state.buttonType = action.payload;
    },
    setBuyNowProduct: (state, action) => {
      state.buyNowProduct = action.payload;
    },
    clearBuyNowProduct: (state) => {
      state.buyNowProduct = null;
    },
  },
});

export const { setButtonType, setBuyNowProduct, clearBuyNowProduct } =
  buynowSlice.actions;
export default buynowSlice.reducer;
