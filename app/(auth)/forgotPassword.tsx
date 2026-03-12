import Background from "@/components/Background";
import AppLogo from "@/components/ui/Logo";
import { sendResetCode, resetPassword } from "@/src/services/password";
import colors from "@/theme/colors";
import { useRouter } from "expo-router";
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

type Step = "email" | "code";

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Digite seu email.");
      return;
    }
    try {
      setLoading(true);
      await sendResetCode(email.trim());
      Alert.alert("Código enviado", "Se o email estiver cadastrado, você receberá um código de 6 dígitos.");
      setStep("code");
    } catch (error: any) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message || error?.message || "Erro desconhecido";
      console.log("Erro forgot-password:", status, msg);
      Alert.alert("Erro", `${msg} (status: ${status})`);
    } finally {      setLoading(false);
    }
  }

  async function handleReset() {
    if (!code || code.length !== 6) {
      Alert.alert("Atenção", "Digite o código de 6 dígitos.");
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    try {
      setLoading(true);
      await resetPassword(email.trim(), code, password);
      Alert.alert("Sucesso", "Senha redefinida! Faça login com sua nova senha.", [
        { text: "Ok", onPress: () => router.replace("/login") },
      ]);
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Não foi possível redefinir.";
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

        {step === "email" ? (
          <>
            <Text style={styles.title}>Recuperar senha</Text>
            <Text style={styles.desc}>
              Digite seu email e enviaremos um código de 6 dígitos para redefinir sua senha.
            </Text>

            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#888"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleSendCode}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Enviar código</Text>
              )}
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.title}>Digite o código</Text>
            <Text style={styles.desc}>
              Enviamos um código de 6 dígitos para {email}
            </Text>

            <TextInput
              placeholder="Código de 6 dígitos"
              placeholderTextColor="#888"
              style={styles.inputCode}
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
              textAlign="center"
            />

            <TextInput
              placeholder="Nova senha"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TextInput
              placeholder="Confirmar nova senha"
              placeholderTextColor="#888"
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleReset}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Redefinir senha</Text>
              )}
            </Pressable>

            <Pressable onPress={() => setStep("email")}>
              <Text style={styles.link}>Reenviar código</Text>
            </Pressable>
          </>
        )}

        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>Voltar ao login</Text>
        </Pressable>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
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
  inputCode: {
    width: "60%",
    height: 56,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: {
    backgroundColor: colors.buttonClicked,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
  },
});