// src/services/link.ts
import { api } from "./http";

export type PatientSearchResult = {
  id: number;
  name: string;
  email: string;
  consent: boolean;
};

export async function searchPatientByEmail(email: string): Promise<PatientSearchResult> {
  const response = await api.get<PatientSearchResult>("/patients/search", {
    params: { email },
  });
  return response.data;
}

export async function linkPatient(patientId: number): Promise<void> {
  await api.post("/links", { patient_id: patientId });
}

export async function unlinkPatient(patientId: number): Promise<void> {
  await api.delete(`/links/${patientId}`);
}