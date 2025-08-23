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

    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/send-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
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
  useSendOtpMutation,
  useResetPasswordMutation,
  // useGetProfileQuery,
} = userAPI;
