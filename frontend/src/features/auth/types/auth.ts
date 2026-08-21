export interface RegisterRequest {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  designation: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  message: string;
  company_id: number;
  user_id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  designation: string;
  company_id: number;
  is_active: boolean;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

