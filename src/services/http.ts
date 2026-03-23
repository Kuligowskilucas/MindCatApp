// src/services/http.ts
import axios from "axios";
import { API_URL } from "../constants/api";
import { Alert } from "react-native";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Flag pra evitar múltiplos alerts ao mesmo tempo
let isShowingAlert = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Sem resposta do servidor (sem internet, timeout, etc)
    if (!error.response) {
      if (!isShowingAlert) {
        isShowingAlert = true;
        const message = error.code === "ECONNABORTED"
          ? "A requisição demorou demais. Verifique sua conexão."
          : "Sem conexão com o servidor. Verifique sua internet.";

        Alert.alert("Erro de conexão", message, [
          { text: "Ok", onPress: () => { isShowingAlert = false; } },
        ]);
      }
      return Promise.reject(error);
    }

    // Erros específicos do servidor
    const { status } = error.response;

    if (status === 401) {
      // Token expirado — o AuthContext vai lidar com o redirect
      // Não mostra alert aqui pra não duplicar
      return Promise.reject(error);
    }

    if (status === 503) {
      if (!isShowingAlert) {
        isShowingAlert = true;
        Alert.alert(
          "Servidor indisponível",
          "O servidor está em manutenção. Tente novamente em alguns minutos.",
          [{ text: "Ok", onPress: () => { isShowingAlert = false; } }]
        );
      }
      return Promise.reject(error);
    }

    if (status >= 500 && status !== 503) {
      if (!isShowingAlert) {
        isShowingAlert = true;
        Alert.alert(
          "Erro no servidor",
          "Algo deu errado do nosso lado. Tente novamente.",
          [{ text: "Ok", onPress: () => { isShowingAlert = false; } }]
        );
      }
      return Promise.reject(error);
    }

    // 4xx (400, 403, 404, 409, 422) — deixa o componente tratar
    return Promise.reject(error);
  }
);