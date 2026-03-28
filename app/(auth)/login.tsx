import React, { useState } from "react";
import {
  KeyboardAvoidingView, Platform, Pressable,
  StyleSheet, Text, Alert, ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Background from "@/components/Background";
import InputField from "@/components/InputField";
import AppLogo from "@/components/ui/Logo";
import colors from "@/theme/colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { validateEmail, validatePassword } from "@/src/utils/validation";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});

  function validate(): boolean {
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setErrors({ email: emailErr, password: passErr });
    return !emailErr && !passErr;
  }

  async function handleLogin() {
    if (!validate()) return;
    try {
      setLoading(true);
      await signIn({ email: email.trim(), password });
      router.replace("/(tabs)");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Email e/ou senha incorretos.";
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
        <Text style={styles.title}>
          Faça seu login para nos encontrarmos de novo :)
        </Text>

        <InputField
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: null })); }}
          error={errors.email}
        />
        <InputField
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: null })); }}
          error={errors.password}
        />

        <Pressable
          style={({ pressed }) => [styles.button, pressed && !loading && styles.buttonPressed]}
          onPress={handleLogin} disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </Pressable>

        <Pressable onPress={() => router.push("/forgotPassword")}>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </Pressable>
        <Text style={styles.link}>
          Ainda não tem cadastro?{" "}
          <Link href="/professionalPacient"><Text style={styles.linkBold}>Clique aqui</Text></Link>
        </Text>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonPressed: { backgroundColor: colors.buttonClicked },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: {
    color: "#000",
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },
  linkBold: { fontWeight: "bold", color: colors.primary },
});