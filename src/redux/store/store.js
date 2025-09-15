import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../api/userApi";
import { productApi } from "../api/productApi";
import { staticApi } from "../api/staticApi";
import authReducer from "../reducers/auth-reducers";
import menuReducer from "../reducers/menu-reducers";
import cartReducer from "../reducers/cart-reducer";
import bannerReducer from "../reducers/banner-reducers";
import categoriesReducer from "../reducers/categories-reducers";
import { orderApi } from "../api/orderApi";
import { dashboardUserApi } from "../api/dashboardUserApi";
import { bannerApi } from "../api/bannerApi";
import { categoryApi } from "../api/CategoryApi";
import { cartApi } from "../api/cartApi";
import { newsLetterApi } from "../api/newsletterApi";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [staticApi.reducerPath]: staticApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardUserApi.reducerPath]: dashboardUserApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [newsLetterApi.reducerPath]: newsLetterApi.reducer,
    auth: authReducer,
    menu: menuReducer,
    cart: cartReducer,
    banner: bannerReducer,
    category: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      staticApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      dashboardUserApi.middleware,
      bannerApi.middleware,
      categoryApi.middleware,
      cartApi.middleware,
      newsLetterApi.middleware
    ),
});
