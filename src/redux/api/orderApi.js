"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/order`,
    credentials: "include",
  }),
  tagTypes: ["Order", "AdminOrders"],
  endpoints: (builder) => ({
    getAdminOrder: builder.query({
      query: ({ isAdmin }) => `/all-orders?_id=${isAdmin}`,
    }),
    getSingleOrder: builder.query({
      query: ({ orderId, isAdmin }) =>
        `/single-order/${orderId}?_id=${isAdmin}`,
    }),
    getProcessOrder: builder.query({
      query: ({ orderId, isAdmin }) => `/process/${orderId}?_id=${isAdmin}`,
    }),
    deleteOrder: builder.mutation({
      query: ({ orderId, isAdmin }) => ({
        url: `delete/${orderId}?_id=${isAdmin}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdminOrderQuery,
  useGetSingleOrderQuery,
  useGetProcessOrderQuery,
  useDeleteOrderMutation,
} = orderApi;
