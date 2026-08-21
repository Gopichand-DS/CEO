import api from "@/lib/axios";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from "../types/auth";

class AuthService {
  async register(
    data: RegisterRequest
  ): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      "/auth/register",
      data
    );

    return response.data;
  }

  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      data
    );

    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/users/me");

    return response.data;
  }
}

export default new AuthService();