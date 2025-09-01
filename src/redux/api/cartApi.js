import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/cart`,
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/get-cart",
    }),

    addToCart: builder.mutation({
      query: ({ productId }) => ({
        url: "/add-cart",
        method: "POST",
        body: productId,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: ({ productId }) => ({
        url: "/remove-cart",
        method: "DELETE",
        body: productId,
      }),
      invalidatesTags: ["Cart"],
    }),
    increaseCartItem: builder.mutation({
      query: ({ productId }) => ({
        url: "/increase",
        method: "PUT",
        body: productId,
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseCartItem: builder.mutation({
      query: ({ productId }) => ({
        url: "/decrease",
        method: "PUT",
        body: productId,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCartItem: builder.mutation({
      query: () => ({
        url: "/clear",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useIncreaseCartItemMutation,
  useDecreaseCartItemMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
  useClearCartItemMutation,
} = cartApi;
