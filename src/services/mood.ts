// src/services/mood.ts
import { api } from "./http";

export type MoodPayload = {
  mood_level: number;
  mood_description?: string;
  recorded_at?: string;
};

export type MoodEntry = {
  id: number;
  user_id: number;
  mood_level: number;
  mood_description: string | null;
  recorded_at: string;
};

export async function storeMood(payload: MoodPayload): Promise<MoodEntry> {
  const response = await api.post<MoodEntry>("/moods", payload);
  return response.data;
}

export async function getMoods(from?: string, to?: string): Promise<MoodEntry[]> {
  const params: Record<string, string> = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const response = await api.get("/moods", { params });
  return response.data.data; // paginado, .data.data pega o array
}

export async function deleteMood(id: number): Promise<void> {
  await api.delete(`/moods/${id}`);
}