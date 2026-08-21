import { useMutation } from "@tanstack/react-query";

import AuthService from "../api/auth_service";

import type {
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

export function useRegister() {
  return useMutation({
    mutationFn: (
      data: RegisterRequest
    ): Promise<RegisterResponse> => 
      AuthService.register(data),
  });
}