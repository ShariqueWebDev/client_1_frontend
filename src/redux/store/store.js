import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../api/userApi";
import authReducer from "../reducers/auth-reducers";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
});
