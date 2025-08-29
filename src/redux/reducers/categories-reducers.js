import { createSlice } from "@reduxjs/toolkit";
import { categoryApi } from "../api/CategoryApi";
const initialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      categoryApi.endpoints.getAllCategories.matchFulfilled,
      (state, action) => {
        state.categories = action.payload;
      }
    );
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
