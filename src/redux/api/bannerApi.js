"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/banner`,
  }),
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    addNewBanner: builder.mutation({
      query: ({ formData, isAdmin }) => ({
        url: `/new?_id=${isAdmin}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),
    getAllBanner: builder.query({
      query: ({ page, search, isAdmin }) =>
        `/all-banners?_id=${isAdmin}&page=${page}&search=${search}`,
      providesTags: ["Banner"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, formData, isAdmin }) => ({
        url: `/update-banner/${id}?_id=${isAdmin}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),
    deleteBanner: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: `/delete/${id}?_id=${isAdmin}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useAddNewBannerMutation,
  useGetAllBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
