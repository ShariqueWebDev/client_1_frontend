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
      // yahan har unique query args ke hisaab se cache tag do
      providesTags: (result, error, { page, search }) => [
        { type: "Statics", id: `PAGE-${page}-SEARCH-${search}` },
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ isAdmin, userId }) => ({
        url: `/${userId}?_id=${isAdmin}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { page, search }) => [
        { type: "Statics", id: `PAGE-${page}-SEARCH-${search}` },
      ],
    }),
  }),
});

export const { useDeleteUserMutation, useGetAdminUserQuery } = dashboardUserApi;
