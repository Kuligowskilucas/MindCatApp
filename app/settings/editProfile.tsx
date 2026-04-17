import Background from "@/components/Background";
import InputField from "@/components/InputField";
import PurpleSquare from "@/components/purpleSquare";
import { useAuth } from "@/src/contexts/AuthContext";
import { updateProfile } from "@/src/services/user";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "@/src/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  function clearError(field: string) {
    setErrors((e) => ({ ...e, [field]: null }));
  }

  function validate(): boolean {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);

    let passErr: string | null = null;
    let confirmErr: string | null = null;

    // só valida senha se o usuário digitou algo
    if (password || confirmPassword) {
      passErr = validatePassword(password);
      confirmErr = validateConfirmPassword(password, confirmPassword);
    }

    setErrors({ name: nameErr, email: emailErr, password: passErr, confirm: confirmErr });
    return !nameErr && !emailErr && !passErr && !confirmErr;
  }

  async function handleSave() {
    if (!validate()) return;

    const payload: Record<string, string> = {};

    if (name.trim() !== user?.name) payload.name = name.trim();
    if (email.trim() !== user?.email) payload.email = email.trim();
    if (password) payload.password = password;

    if (Object.keys(payload).length === 0) {
      Alert.alert("Nada pra salvar", "Nenhuma alteração foi feita.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile(payload);
      Alert.alert("Sucesso", "Perfil atualizado! Faça login novamente para ver as mudanças.", [
        { text: "Ok", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Não foi possível atualizar.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <PurpleSquare style={styles.container}>
            <Ionicons name="person-circle" size={60} color="#fff" style={{ alignSelf: "center" }} />
            <Text style={styles.titulo}>Editar Perfil</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Nome</Text>
              <InputField
                placeholder="Seu nome"
                value={name}
                onChangeText={(t) => { setName(t); clearError("name"); }}
                error={errors.name}
                style={styles.inputOverride}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Email</Text>
              <InputField
                placeholder="Seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(t) => { setEmail(t); clearError("email"); }}
                error={errors.email}
                style={styles.inputOverride}
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Alterar senha</Text>
            <Text style={styles.sectionHint}>Deixe em branco se não quiser mudar</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Nova senha</Text>
              <InputField
                placeholder="Digite a nova senha"
                secureTextEntry
                value={password}
                onChangeText={(t) => { setPassword(t); clearError("password"); }}
                error={errors.password}
                style={styles.inputOverride}
              />
              <Text style={{ fontSize: 12, color: "#fff", opacity: 0.8, marginTop: -12, marginBottom: 12, marginLeft: 4 }}>
                Mínimo 8 caracteres com maiúscula, minúscula e número.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Confirmar nova senha</Text>
              <InputField
                placeholder="Repita a senha"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); clearError("confirm"); }}
                error={errors.confirm}
                style={styles.inputOverride}
              />
            </View>

            <Pressable
              style={({ pressed }) => [styles.btnSave, pressed && { opacity: 0.8 }]}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#7B2FBE" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#7B2FBE" />
                  <Text style={styles.btnSaveText}>Salvar alterações</Text>
                </>
              )}
            </Pressable>

            <Pressable onPress={() => router.back()}>
              <Text style={styles.linkVoltar}>Cancelar</Text>
            </Pressable>
          </PurpleSquare>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  container: {
    gap: 4,
  },
  titulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  section: {
    marginBottom: 4,
  },
  label: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
    marginLeft: 4,
  },
  inputOverride: {
    borderColor: "rgba(255,255,255,0.4)",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginVertical: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHint: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
  },
  btnSave: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  btnSaveText: {
    color: "#7B2FBE",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkVoltar: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 8,
  },
});