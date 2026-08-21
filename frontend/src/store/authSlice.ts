import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  company_id: number;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("access_token"),
  isAuthenticated: !!localStorage.getItem("access_token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{
        access_token: string;
        token_type: string;
        user: User;
      }>
    ) => {
      state.loading = false;
      state.accessToken = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;

      localStorage.setItem(
        "access_token",
        action.payload.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user)
      );
    },

    loginFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    restoreSession: (state) => {
      const token = localStorage.getItem("access_token");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.accessToken = token;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  restoreSession,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;