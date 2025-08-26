import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../api/userApi";
import { productApi } from "../api/productApi";
import { staticApi } from "../api/staticApi";
import authReducer from "../reducers/auth-reducers";
import menuReducer from "../reducers/menu-reducers";
import { orderApi } from "../api/orderApi";
import { dashboardUserApi } from "../api/dashboardUserApi";
import { bannerApi } from "../api/bannerApi";
import { categoryApi } from "../api/CategoryApi";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [staticApi.reducerPath]: staticApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardUserApi.reducerPath]: dashboardUserApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    auth: authReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      staticApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      dashboardUserApi.middleware,
      bannerApi.middleware,
      categoryApi.middleware
    ),
});
