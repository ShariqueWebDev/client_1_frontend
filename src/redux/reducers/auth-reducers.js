// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// initial state localStorage se load karo
const userFromStorage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  isAuthenticated: !!userFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
