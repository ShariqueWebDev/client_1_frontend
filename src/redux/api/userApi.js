"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/auth", // apna backend base url
    credentials: "include", // cookie allow karne ke liye
  }),
  tagTypes: ["Statics"], // yahi tag same hona chahiye
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Statics"], // register hone ke baad statics invalidate ho jayega
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    // getProfile: builder.query({
    //   query: () => "/me",
    // }),
    // api call for statics
  }),
});

// hooks export karo
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
} = userAPI;
