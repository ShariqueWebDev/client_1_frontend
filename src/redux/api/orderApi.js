"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/order`,
    // credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // state all over api method, state aur unka respose provide karta hai
      const state = getState(); // temporary any
      // console.log("Redux state in prepareHeaders:", state);
      const token = state.auth?.token;
      // console.log("token prepareHeaders:.....", token);

      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Order", "AdminOrders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/new-order",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Order"],
    }),

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
  useCreateOrderMutation,
  useGetAdminOrderQuery,
  useGetSingleOrderQuery,
  useProcessOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
