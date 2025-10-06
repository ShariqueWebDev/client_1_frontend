"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/review`, // apna backend base url
    prepareHeaders: (headers, { getState }) => {
      // state all over api method, state aur unka respose provide karta hai
      const state = getState(); // temporary any
      // console.log("Redux state in prepareHeaders:", state);
      const token = state.auth?.token;

      console.log("token prepareHeaders:.....", token);

      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    // credentials: "include", // cookie allow karne ke liye
  }),
  tagTypes: ["Reviews"], // yahi tag same hona chahiye
  endpoints: (builder) => ({
    addCustomerReview: builder.mutation({
      query: (body) => ({
        url: "/addreview",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReviews: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/deletereview/${productId}/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),

    getReviewById: builder.query({
      query: (productId) => ({
        url: `/${productId}`,
      }),
      providesTags: ["Reviews"],
    }),

    getAllReviews: builder.query({
      query: () => ({
        url: "/allreviews",
      }),
      providesTags: ["Reviews"],
    }),
    // getProfile: builder.query({
    //   query: () => "/me",
    // }),
    // api call for statics
  }),
});

// hooks export karo
export const {
  useAddCustomerReviewMutation,
  useDeleteReviewsMutation,
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
} = reviewApi;
