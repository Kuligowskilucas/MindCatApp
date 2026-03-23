import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import WhiteSquare from "@/components/whiteSquare";
import { useAuth } from "@/src/contexts/AuthContext";
import { api } from "@/src/services/http";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";

export default function Settings() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const isPro = user?.role === "pro";

  // consentimento (só paciente)
  const [consent, setConsent] = useState(false);
  const [loadingConsent, setLoadingConsent] = useState(false);

  useEffect(() => {
    if (!isPro) {
      api.get("/profile").then((res) => {
        setConsent(!!res.data.consent_share_with_professional);
      }).catch(() => {});
    }
  }, [isPro]);

  async function toggleConsent(value: boolean) {
    try {
      setLoadingConsent(true);
      await api.put("/profile", { consent_share_with_professional: value });
      setConsent(value);
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar.");
    } finally {
      setLoadingConsent(false);
    }
  }

  function handleLogout() {
    Alert.alert("Sair", "Tem certeza que deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  }

  return (
    <Background style={styles.separacaoAreas}>
      <PurpleSquare>
        <View style={styles.areasBotoesDoutor}>
          <View style={styles.linksDoutor}>
            <Link href="/#">
              <Ionicons name="call" size={64} color="white" />
            </Link>
            <Link href="/#">
              <Ionicons name="chatbubble" size={64} color="white" />
            </Link>
            <Link href="/#">
              <Ionicons name="keypad" size={64} color="white" />
            </Link>
          </View>
          <View style={styles.risco} />

          {isPro ? (
            <Link href="/settings/patients" style={styles.listaDoutores}>
              <Text>Meus Pacientes</Text>
            </Link>
          ) : (
            <Link href="/settings/doctors" style={styles.listaDoutores}>
              <Text>Meus Profissionais</Text>
            </Link>
          )}
        </View>
      </PurpleSquare>

      <WhiteSquare style={styles.separacaoAreas}>
        <Link href="/settings/perfil" style={styles.botoesAreaBranca}>
          <Text>Perfil</Text>
        </Link>
        <Link href="/settings/privacidade" style={styles.botoesAreaBranca}>
          <Text>Privacidade</Text>
        </Link>
        <Link href="/settings/sobre" style={styles.botoesAreaBranca}>
          <Text>Sobre nós</Text>
        </Link>

        {!isPro && (
          <View style={styles.consentRow}>
            <Text style={styles.consentText}>
              Compartilhar dados com profissional
            </Text>
            <Switch
              value={consent}
              onValueChange={toggleConsent}
              disabled={loadingConsent}
              trackColor={{ false: "#ccc", true: colors.primary }}
              thumbColor="#fff"
            />
          </View>
        )}

        <Pressable
          style={({ pressed }) => [styles.botaoLogout, pressed && { opacity: 0.7 }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.botaoLogoutTexto}>Sair da conta</Text>
        </Pressable>
      </WhiteSquare>
    </Background>
  );
}

const styles = StyleSheet.create({
  areasBotoesDoutor: { flexDirection: "column" },
  linksDoutor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  risco: {
    width: "100%",
    height: 2,
    backgroundColor: "white",
    marginVertical: 24,
  },
  listaDoutores: {
    color: "white",
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 18,
    textAlign: "center",
    borderRadius: 20,
    fontWeight: "bold",
  },
  separacaoAreas: { gap: 22 },
  botoesAreaBranca: {
    color: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 30,
    textAlign: "center",
    padding: 10,
    fontSize: 16,
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  consentText: {
    color: colors.primary,
    fontSize: 14,
    flex: 1,
    fontWeight: "600",
  },
  botaoLogout: {
    backgroundColor: "#D9534F",
    borderRadius: 30,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  botaoLogoutTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});