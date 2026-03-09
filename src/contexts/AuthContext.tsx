import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "../services/http";
import { login as loginService, LoginPayload } from "../services/auth";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (payload: LoginPayload) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Ao abrir o app, tenta recuperar o token salvo
  useEffect(() => {
    async function loadStoredToken() {
      const token = await SecureStore.getItemAsync("auth_token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const { data } = await api.get("/user"); // rota que retorna o user autenticado
          setUser(data);
        } catch {
          // token expirado ou inválido
          await SecureStore.deleteItemAsync("auth_token");
        }
      }
      setLoading(false);
    }
    loadStoredToken();
  }, []);

  async function signIn(payload: LoginPayload) {
    const response = await loginService(payload);
    await SecureStore.setItemAsync("auth_token", response.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
    setUser(response.user);
  }

  async function signOut() {
    try {
      await api.post("/logout");
    } catch { /* ignora erro de rede */ }
    await SecureStore.deleteItemAsync("auth_token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);