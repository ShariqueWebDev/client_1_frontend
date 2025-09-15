"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsLetterApi = createApi({
  reducerPath: "newLetter",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/newsletter`,
  }),
  tagTypes: ["newsEmail"],
  endpoints: (builder) => ({
    createNewsletter: builder.mutation({
      query: ({ formData }) => ({
        url: "/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["newsEmail"],
    }),
    getAllNewsletter: builder.query({
      query: ({ isAdmin, search, page, limit }) => ({
        url: `/all?_id=${isAdmin}&search=${search}&page=${page}&limit=${limit}`,
      }),
      providesTags: ["newsEmail"],
    }),
    deleteNewsLetter: builder.mutation({
      query: ({ isAdmin, _id }) => ({
        url: `/${_id}?_id=${isAdmin}`,
        method: "DELETE",
      }),
      invalidatesTags: ["newsEmail"],
    }),
  }),
});

export const {
  useCreateNewsletterMutation,
  useGetAllNewsletterQuery,
  useDeleteNewsLetterMutation,
} = newsLetterApi;
