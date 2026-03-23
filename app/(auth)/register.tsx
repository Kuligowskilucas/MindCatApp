import Background from "@/components/Background";
import InputField from "@/components/InputField";
import AppLogo from "@/components/ui/Logo";
import colors from "@/theme/colors";
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "@/src/utils/validation";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator, Alert, KeyboardAvoidingView,
  Platform, Pressable, StyleSheet, Text,
} from "react-native";
import { register } from "../../src/services/auth";

export default function RegisterScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const userRole = role === "pro" ? "pro" : "patient";
  const roleLabel = userRole === "pro" ? "Profissional" : "Paciente";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string | null;
    email?: string | null;
    password?: string | null;
    confirm?: string | null;
  }>({});

  function clearError(field: string) {
    setErrors((e) => ({ ...e, [field]: null }));
  }

  function validate(): boolean {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);
    setErrors({ name: nameErr, email: emailErr, password: passErr, confirm: confirmErr });
    return !nameErr && !emailErr && !passErr && !confirmErr;
  }

  async function handleRegister() {
    if (!validate()) return;
    try {
      setLoading(true);
      const response = await register({ name: name.trim(), email: email.trim(), password, role: userRole });
      Alert.alert("Sucesso", response.message || "Cadastro realizado!", [
        { text: "Ok", onPress: () => router.replace("/login") },
      ]);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Não foi possível realizar o cadastro.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <AppLogo />
        <Text style={styles.badge}>Cadastro como {roleLabel}</Text>
        <Text style={styles.title}>
          Muito bom te ter aqui, faça seu cadastro para a gente se conhecer :)
        </Text>

        <InputField
          placeholder="Nome"
          value={name}
          onChangeText={(t) => { setName(t); clearError("name"); }}
          error={errors.name}
        />
        <InputField
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(t) => { setEmail(t); clearError("email"); }}
          error={errors.email}
        />
        <InputField
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(t) => { setPassword(t); clearError("password"); }}
          error={errors.password}
        />
        <InputField
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(t) => { setConfirmPassword(t); clearError("confirm"); }}
          error={errors.confirm}
        />

        <Pressable
          style={({ pressed }) => [styles.button, pressed && !loading && styles.buttonPressed]}
          onPress={handleRegister} disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
        </Pressable>

        <Text style={styles.linkText}>
          Já tem cadastro?{" "}
          <Link href="/login"><Text style={styles.linkBold}>Clique aqui</Text></Link>
        </Text>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  badge: {
    backgroundColor: colors.primary, color: "#fff", paddingHorizontal: 16,
    paddingVertical: 6, borderRadius: 20, fontSize: 13, fontWeight: "bold",
    overflow: "hidden", marginBottom: 12,
  },
  title: { fontSize: 16, textAlign: "center", color: "#000", marginBottom: 24 },
  button: {
    backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12,
    width: "100%", alignItems: "center", marginTop: 8,
  },
  buttonPressed: { backgroundColor: colors.buttonClicked },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  linkText: { color: "#000", fontSize: 14, marginTop: 16, textAlign: "center" },
  linkBold: { fontWeight: "bold", color: colors.primary },
});