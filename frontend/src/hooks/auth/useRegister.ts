import { useMutation } from "@tanstack/react-query";

import AuthService from "@/features/auth/api/auth_service";

export function useRegister() {
  return useMutation({
    mutationFn: AuthService.register,
  });
}