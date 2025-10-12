"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/product`,
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
  tagTypes: ["Product", "AdminProducts", "Products"],
  endpoints: (builder) => ({
    addNewProduct: builder.mutation({
      query: ({ formData, adminId }) => ({
        url: `/create-product?_id=${adminId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Statics", "Products"],
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
      invalidatesTags: [{ type: "AdminProducts", id: "LIST" }, "Products"],
    }),

    // deleteImage: builder.mutation({
    //   query: () => ({
    //     url: `/delete-image`,
    //     method: "PUT",
    //   }),
    //   // invalidatesTags: [{ type: "AdminProducts", id: "LIST" }, "Products"],
    // }),

    updateProduct: builder.mutation({
      query: ({ id, formData, isAdmin }) => ({
        url: `/${id}?_id=${isAdmin}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
        { type: "AdminProducts", id: "LIST" },
        "Products",
      ],
    }),
    getLowStockProducts: builder.query({
      query: ({ isAdmin, threshold = 5, page = 1, limit = 10, search = "" }) =>
        `/low-stock?_id=${isAdmin}&threshold=${threshold}&page=${page}&limit=${limit}&search=${search}`,
      providesTags: ["Products", "Product"], // cache invalidation
    }),
    getAllProductWithFilter: builder.query({
      query: ({
        isAdmin,
        userQuery,
        filterQuery,
        priceRange,
        subcategory,
        search,
        page,
      }) =>
        `/all?_id=${isAdmin}&${filterQuery}=${userQuery}&price=${priceRange}&subCategory=${subcategory}&search=${search}&page=${page}`, // ✅ arrow function implicit return
    }),
    searchAllProduct: builder.query({
      query: ({ search }) => `/search-all?search=${search}`, //  arrow function implicit return
    }),
    getRelatedProduct: builder.query({
      query: ({ isAdmin, userQuery, filterQuery }) =>
        `/all?_id=${isAdmin}&${filterQuery}=${userQuery}`, // arrow function implicit return
    }),

    getSingleProductDetails: builder.query({
      query: ({ slug }) => `/${slug}`,
    }),

    getRecommendedProducts: builder.query({
      query: ({ id }) => `/recommended/${id}`,
    }),
  }),
});

export const {
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAdminProductsQuery,
  useGetLowStockProductsQuery,
  useGetAllProductWithFilterQuery,
  useGetSingleProductDetailsQuery,
  useGetRecommendedProductsQuery,
  useGetRelatedProductQuery,
  useSearchAllProductQuery,
} = productApi;
