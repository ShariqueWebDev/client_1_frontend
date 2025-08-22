"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/product`,
    credentials: "include",
  }),
  tagTypes: ["Product", "AdminProducts"],
  endpoints: (builder) => ({
    addNewProduct: builder.mutation({
      query: ({ formData, adminId }) => ({
        url: `/create-product?_id=${adminId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Statics"],
    }),
    getAdminProducts: builder.query({
      query: ({ page, search, isAdmin }) =>
        `/admin-products?_id=${isAdmin}&page=${page}&search=${search}`,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map((p) => ({ type: "Product", id: p._id })),
              { type: "AdminProducts", id: "LIST" },
            ]
          : [{ type: "AdminProducts", id: "LIST" }],
    }),

    deleteProduct: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: `/${id}?_id=${isAdmin}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "AdminProducts", id: "LIST" }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData, isAdmin }) => ({
        url: `/${id}?_id=${isAdmin}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
        { type: "AdminProducts", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} = productApi;
