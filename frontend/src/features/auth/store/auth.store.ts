import { create } from "zustand";

import { removeToken } from "../utils/token";

import type { User } from "../types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;

  login: (token: string, user: User) => void;
  logout: () => void;

  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;

  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  accessToken: null,

  login: (token, user) =>
    set({
      accessToken: token,
      user,
    }),

  logout: () => {
    removeToken();

    set({
      accessToken: null,
      user: null,
    });
  },

  setUser: (user) =>
    set({
      user,
    }),

  setToken: (token) =>
    set({
      accessToken: token,
    }),

  isAuthenticated: () => !!get().accessToken,
}));