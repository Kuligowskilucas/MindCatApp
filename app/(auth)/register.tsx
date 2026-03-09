import Background from "@/components/Background";
import AppLogo from "@/components/ui/Logo";
import colors from "@/theme/colors";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      const response = await register({
        name,
        email,
        password,
        role: userRole,
      });

      Alert.alert("Sucesso", response.message || "Cadastro realizado!", [
        { text: "Ok", onPress: () => router.replace("/login") },
      ]);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Não foi possível realizar o cadastro. Tente novamente.";
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

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#888"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && !loading && styles.buttonPressed,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </Pressable>

        <Text style={styles.linkText}>
          Já tem cadastro?{" "}
          <Link href="/login">
            <Text style={styles.linkBold}>Clique aqui</Text>
          </Link>
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
  badge: {
    backgroundColor: colors.primary,
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: "bold",
    overflow: "hidden",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
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
  buttonPressed: {
    backgroundColor: colors.buttonClicked,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#000",
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },
  linkBold: {
    fontWeight: "bold",
    color: colors.primary,
  },
});