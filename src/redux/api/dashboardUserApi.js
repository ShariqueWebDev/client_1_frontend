"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const dashboardUserApi = createApi({
  reducerPath: "dashboardUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_SERVER}/api/v1/user`,
    credentials: "include",
  }),
  tagTypes: ["Statics"], // yahi tag same hona chahiye
  endpoints: (builder) => ({
    getAdminUser: builder.query({
      query: ({ isAdmin, page = 1, limit = 10, search = "" }) => ({
        url: `/get-all-user?_id=${isAdmin}&page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Statics"],
    }),
    deleteUser: builder.mutation({
      query: ({ isAdmin, userId }) => ({
        url: `/${userId}?_id=${isAdmin}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Statics"],
    }),
  }),
});

export const { useDeleteUserMutation, useGetAdminUserQuery } = dashboardUserApi;
