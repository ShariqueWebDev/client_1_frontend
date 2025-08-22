"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staticApi = createApi({
  reducerPath: "staticAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1/dashboard",
    credentials: "include",
  }),
  tagTypes: ["Statics"], // add tags
  endpoints: (builder) => ({
    getStatic: builder.query({
      query: () => "/static",
      providesTags: ["Statics"], // is query se ye tag link ho gaya
      //   automatic fetch initial state like useEffect side effect call
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          //   console.log(data?.stats, "Api Query Resquest......");
          // user data localStorage mein save
          localStorage.setItem("statics", JSON.stringify(data?.stats ?? null));
        } catch (err) {
          console.log("Profile fetch error:", err);
          localStorage.removeItem("statics"); // agar error aya to localStorage clear
        }
      },
    }),
  }),
});

// console.log(staticApi, "check static api structure......");

export const { useGetStaticQuery } = staticApi;
