// src/services/user.ts
import { api } from "./http";

export type UserWithProfile = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  profile: {
    id: number;
    use_ai: boolean | null;
    treatment_type: string | null;
    tdah_reminder: boolean | null;
    push_notifications: boolean | null;
    progress_bar: boolean | null;
    consent_share_with_professional: boolean;
  } | null;
};

export type UpdateProfilePayload = {
  name?: string;
  email?: string;
  password?: string;
};


export async function getMe(): Promise<UserWithProfile> {
  const response = await api.get<UserWithProfile>("/me");
  return response.data;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<void> {
  await api.put("/user/update", payload);
}