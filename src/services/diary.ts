// src/services/diary.ts
import { api } from "./http";

export type DiaryEntry = {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
};

export async function storeDiaryEntry(content: string): Promise<DiaryEntry> {
  const response = await api.post<{ message: string; entry: DiaryEntry }>("/diary", { content });
  return response.data.entry;
}

export async function getDiaryEntries(diaryPassword: string): Promise<DiaryEntry[]> {
  const response = await api.get("/diary", {
    params: { diary_password: diaryPassword },
  });
  return response.data;
}

export async function deleteDiaryEntry(id: number, diaryPassword: string): Promise<void> {
  await api.delete(`/diary/${id}`, {
    data: { diary_password: diaryPassword },
  });
}

export async function setDiaryPassword(newPassword: string, currentPassword?: string): Promise<void> {
  const body: Record<string, string> = { new_password: newPassword };
  if (currentPassword) body.current_password = currentPassword;
  await api.put("/profile/diary-password", body);
}