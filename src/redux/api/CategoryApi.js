"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/category`,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    addNewCategory: builder.mutation({
      query: ({ formData, isAdmin }) => ({
        url: `/new?_id=${isAdmin}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    getAllCategories: builder.query({
      query: ({ page, search, isAdmin }) => ({
        url: `/all-categories?_id=${isAdmin}&page=${page}&search=${search}`,
      }),
      providesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ formData, id, isAdmin }) => ({
        url: `/update-category/${id}?_id=${isAdmin}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: ({ isAdmin, id }) => ({
        url: `/delete/${id}?_id=${isAdmin}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useAddNewCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
