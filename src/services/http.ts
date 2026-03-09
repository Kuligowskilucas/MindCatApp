// src/services/http.ts
import axios from "axios";
import { API_URL } from "../constants/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
