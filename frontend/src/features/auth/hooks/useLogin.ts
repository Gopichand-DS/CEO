import { useMutation } from "@tanstack/react-query";

import AuthService from "../api/auth_service";

import { setToken } from "../utils/token";

import { useAuthStore } from "../store/auth.store";

import type {
  LoginRequest,
  LoginResponse,
} from "../types/auth";

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (
      data: LoginRequest
    ): Promise<LoginResponse> =>
      AuthService.login(data),

    onSuccess(data) {
      setToken(data.access_token);

      login(
        data.access_token,
        data.user
      );
    },

    onError(error) {
      console.error(error);
    },
  });
}