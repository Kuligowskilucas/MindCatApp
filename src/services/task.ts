// src/services/task.ts
import { api } from "./http";

export type Task = {
  id: number;
  pro_id: number;
  patient_id: number;
  title: string;
  status: "active" | "done";
  completed_at: string | null;
  created_at: string;
};

export type PaginatedTasks = {
  data: Task[];
  current_page: number;
  last_page: number;
};

// pro: scope=assigned | paciente: scope=mine (default)
export async function getTasks(scope?: "mine" | "assigned"): Promise<PaginatedTasks> {
  const params: Record<string, string> = {};
  if (scope) params.scope = scope;
  const response = await api.get<PaginatedTasks>("/tasks", { params });
  return response.data;
}

// apenas pro
export async function createTask(patientId: number, title: string): Promise<Task> {
  const response = await api.post<Task>("/tasks", {
    patient_id: patientId,
    title,
  });
  return response.data;
}

// apenas paciente
export async function markTaskDone(taskId: number): Promise<Task> {
  const response = await api.patch<Task>(`/tasks/${taskId}/done`);
  return response.data;
}

// apenas pro
export async function deleteTask(taskId: number): Promise<void> {
  await api.delete(`/tasks/${taskId}`);
}

// pro: listar pacientes vinculados (pra selecionar ao criar tarefa)
export type Patient = {
  id: number;
  name: string;
  email: string;
};

export async function getPatients(): Promise<Patient[]> {
  const response = await api.get("/patients");
  return response.data.data;
}