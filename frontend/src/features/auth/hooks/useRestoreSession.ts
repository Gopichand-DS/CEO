import { useEffect } from "react";

import AuthService from "../api/auth_service";

import { useAuthStore } from "../store/auth.store";

import { getToken } from "../utils/token";

export default function useRestoreSession() {
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const setToken = useAuthStore(
    (state) => state.setToken
  );

  useEffect(() => {
    async function restore() {
      const token = getToken();

      if (!token) return;

      try {
        setToken(token);

        const user =
          await AuthService.getCurrentUser();

        setUser(user);
      } catch {
        localStorage.removeItem(
          "mini_ceo_access_token"
        );

        setUser(null);

        setToken(null);
      }
    }

    restore();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- zustand actions are stable references; this effect should run once on mount
  }, []);
}