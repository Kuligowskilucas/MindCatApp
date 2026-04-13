import Background from "@/components/Background";
import InputField from "@/components/InputField";
import PurpleSquare from "@/components/purpleSquare";
import { useAuth } from "@/src/contexts/AuthContext";
import { api } from "@/src/services/http";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DeleteAccountScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const CONFIRM_WORD = "DELETAR";

  function handleDelete() {
    if (confirmText !== CONFIRM_WORD) {
      setError(`Digite "${CONFIRM_WORD}" para confirmar.`);
      return;
    }

    Alert.alert(
      "Última confirmação",
      "Essa ação é PERMANENTE. Todos os seus dados serão apagados e não poderão ser recuperados. Tem certeza absoluta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, deletar minha conta",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await api.delete("/user/delete");
              await signOut();
            } catch (err: any) {
              const msg =
                err?.response?.data?.message || "Não foi possível deletar a conta.";
              Alert.alert("Erro", msg);
              setLoading(false);
            }
          },
        },
      ]
    );
  }

  return (
    <Background>
      <PurpleSquare style={styles.container}>
        <Ionicons
          name="warning"
          size={48}
          color="#FF6B6B"
          style={{ alignSelf: "center" }}
        />
        <Text style={styles.titulo}>Deletar Conta</Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Ao deletar sua conta, todos os seus dados serão removidos permanentemente:
          </Text>
          <Text style={styles.warningItem}>• Registros de humor</Text>
          <Text style={styles.warningItem}>• Entradas do diário</Text>
          <Text style={styles.warningItem}>• Tarefas e vínculos com profissionais</Text>
          <Text style={styles.warningItem}>• Todas as informações do perfil</Text>
        </View>

        <Text style={styles.confirmLabel}>
          Digite <Text style={styles.confirmWord}>{CONFIRM_WORD}</Text> para confirmar:
        </Text>

        <InputField
          placeholder={CONFIRM_WORD}
          value={confirmText}
          onChangeText={(t) => {
            setConfirmText(t);
            setError(null);
          }}
          error={error}
          autoCapitalize="characters"
          style={styles.inputOverride}
        />

        <Pressable
          style={({ pressed }) => [
            styles.btnDelete,
            confirmText !== CONFIRM_WORD && styles.btnDisabled,
            pressed && confirmText === CONFIRM_WORD && { opacity: 0.8 },
          ]}
          onPress={handleDelete}
          disabled={loading || confirmText !== CONFIRM_WORD}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.btnDeleteText}>Deletar minha conta</Text>
            </>
          )}
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.linkVoltar}>Cancelar e voltar</Text>
        </Pressable>
      </PurpleSquare>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  titulo: {
    color: "#FF6B6B",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  warningBox: {
    backgroundColor: "rgba(255,107,107,0.15)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,107,107,0.3)",
  },
  warningText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  warningItem: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.85,
    marginBottom: 4,
    marginLeft: 4,
  },
  confirmLabel: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  confirmWord: {
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  inputOverride: {
    borderColor: "rgba(255,107,107,0.5)",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  btnDelete: {
    backgroundColor: "#D9534F",
    borderRadius: 25,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnDeleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkVoltar: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 14,
    opacity: 0.8,
  },
});