import { createSlice } from "@reduxjs/toolkit";
import { bannerApi } from "../api/bannerApi";

const initialState = {
  banners: [],
};

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanner: (state, action) => {
      state.banners = action.payload;
    },
  },
  extraReducers: (builder) => {
    // RTK Query ke fulfilled response se slice update
    builder.addMatcher(
      bannerApi.endpoints.getAllBanner.matchFulfilled,
      (state, action) => {
        state.banners = action.payload;
      }
    );
  },
});

export const { setBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
