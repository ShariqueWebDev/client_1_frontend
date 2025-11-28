import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  buyNowProduct: null,
};

const buynowSlice = createSlice({
  name: "buy-now",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    setBuyNowProduct: (state, action) => {
      state.buyNowProduct = action.payload;
    },
    clearBuyNowProduct: (state) => {
      state.buyNowProduct = null;
    },
  },
});

export const { setCart, setBuyNowProduct, clearBuyNowProduct } =
  buynowSlice.actions;
export default buynowSlice.reducer;
