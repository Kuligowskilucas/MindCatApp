// src/services/password.
import { api } from "./http";

export async function sendResetCode(email: string): Promise<void> {
  await api.post("/forgot-password", { email });
}

export async function resetPassword(email: string, code: string, password: string): Promise<void> {
  await api.post("/reset-password", { email, code, password });
}