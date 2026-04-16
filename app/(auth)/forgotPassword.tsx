import Background from "@/components/Background";
import InputField from "@/components/InputField";
import AppLogo from "@/components/ui/Logo";
import { resetPassword, sendResetCode } from "@/src/services/password";
import { validateCode, validateConfirmPassword, validateEmail, validatePassword } from "@/src/utils/validation";
import colors from "@/theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator, Alert, KeyboardAvoidingView,
  Platform, Pressable, StyleSheet, Text,
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
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  function clearError(field: string) {
    setErrors((e) => ({ ...e, [field]: null }));
  }

  async function handleSendCode() {
    const emailErr = validateEmail(email);
    setErrors({ email: emailErr });
    if (emailErr) return;

    try {
      setLoading(true);
      await sendResetCode(email.trim());
      Alert.alert("Código enviado", "Se o email estiver cadastrado, você receberá um código de 6 dígitos.");
      setStep("code");
    } catch {
      Alert.alert("Erro", "Não foi possível enviar o código. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    const codeErr = validateCode(code);
    const passErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(password, confirmPassword);
    setErrors({ code: codeErr, password: passErr, confirm: confirmErr });
    if (codeErr || passErr || confirmErr) return;

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
            <InputField
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => { setEmail(t); clearError("email"); }}
              error={errors.email}
            />
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleSendCode} disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar código</Text>}
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.title}>Digite o código</Text>
            <Text style={styles.desc}>Enviamos um código de 6 dígitos para {email}</Text>
            <InputField
              placeholder="Código de 6 dígitos"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={(t) => { setCode(t); clearError("code"); }}
              error={errors.code}
              style={styles.inputCode}
            />
            <InputField
              placeholder="Nova senha"
              secureTextEntry
              value={password}
              onChangeText={(t) => { setPassword(t); clearError("password"); }}
              error={errors.password}
            />
            <InputField
              placeholder="Confirmar nova senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); clearError("confirm"); }}
              error={errors.confirm}
            />
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleReset} disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Redefinir senha</Text>}
            </Pressable>
            <Pressable onPress={() => { setStep("email"); setErrors({}); }}>
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
  container: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#000", marginBottom: 8 },
  desc: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 24 },
  inputCode: { textAlign: "center", fontSize: 24, fontWeight: "bold", letterSpacing: 8 },
  button: {
    backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12,
    width: "100%", alignItems: "center", marginTop: 8,
  },
  buttonPressed: { backgroundColor: colors.buttonClicked },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { color: colors.primary, fontSize: 14, fontWeight: "bold", marginTop: 16 },
});