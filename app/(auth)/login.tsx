import React, { useState } from "react";
import {
  KeyboardAvoidingView, Platform, Pressable,
  StyleSheet, Text, TextInput, Alert, ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Background from "@/components/Background";
import AppLogo from "@/components/ui/Logo";
import colors from "@/theme/colors";
import { useAuth } from "@/src/contexts/AuthContext";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }
    try {
      setLoading(true);
      await signIn({ email, password });
      router.replace("/(tabs)");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        "Email e/ou senha incorretos.";
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

        <TextInput
          placeholder="E-mail" placeholderTextColor="#888"
          style={styles.input} keyboardType="email-address"
          autoCapitalize="none" value={email} onChangeText={setEmail}
        />
        <TextInput
          placeholder="Senha" placeholderTextColor="#888"
          style={styles.input} secureTextEntry
          value={password} onChangeText={setPassword}
        />

        <Pressable
          style={({ pressed }) => [styles.button, pressed && !loading && styles.buttonPressed]}
          onPress={handleLogin} disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
        </Pressable>

        <Text style={styles.link}>Esqueci minha senha</Text>
        <Text style={styles.link}>
          Ainda não tem cadastro?
          <Link href="/professionalPacient"><Text style={styles.linkBold}> Clique aqui</Text></Link>
        </Text>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#fff',
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
    width: '100%',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.buttonClicked,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#000',
    fontSize: 14,
    marginTop: 16,
    textAlign: 'center',
  },
  linkBold: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
