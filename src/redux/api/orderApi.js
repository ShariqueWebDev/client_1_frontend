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
      query: ({ isAdmin, page, limit, search }) =>
        `/all-orders?_id=${isAdmin}&page=${page}&limit=${limit}&search=${
          search || ""
        }`,
    }),

    getSingleOrder: builder.query({
      query: ({ orderId, isAdmin }) =>
        `/single-order/${orderId}?_id=${isAdmin}`,
    }),
    processOrder: builder.mutation({
      query: ({ orderId, isAdmin }) => ({
        url: `/process/${orderId}?_id=${isAdmin}`,
        method: "GET", // backend me GET hai, even then mutation use karo
      }),
      invalidatesTags: ["Orders"], // table refetch ho jaaye status update ke baad
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
  useProcessOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
