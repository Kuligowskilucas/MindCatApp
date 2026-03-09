// src/services/auth.ts
import { api } from "./http";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string; // ex: "pro"
};

export type LaravelRegisterResponse = {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LaravelLoginResponse = {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
};

export async function register(payload: RegisterPayload): Promise<LaravelRegisterResponse> {
  const response = await api.post<LaravelRegisterResponse>("/register", payload);
  return response.data;
}

export async function login(payload: LoginPayload): Promise<LaravelLoginResponse> {
  const response = await api.post<LaravelLoginResponse>("/login", payload);
  return response.data;
}
