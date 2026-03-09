import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import WhiteSquare from "@/components/whiteSquare";
import { useAuth } from "@/src/contexts/AuthContext";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const { signOut } = useAuth();
  const router = useRouter();

  function handleLogout() {
    Alert.alert("Sair", "Tem certeza que deseja sair da sua conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/(auth)/login");
        },
      },
    ]);
  }

  return (
    <Background style={styles.separacaoAreas}>
      <PurpleSquare>
        <View style={styles.areasBotoesDoutor}>
          <View style={styles.linksDoutor}>
            <Link href={"/#"}>
              <Ionicons name="call" size={64} color="white" />
            </Link>
            <Link href={"/#"}>
              <Ionicons name="chatbubble" size={64} color="white" />
            </Link>
            <Link href={"/#"}>
              <Ionicons name="keypad" size={64} color="white" />
            </Link>
          </View>
          <View style={styles.risco} />
          <Link href={"/#"} style={styles.listaDoutores}>
            <Text>Lista de doutores</Text>
          </Link>
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

        <Pressable
          style={({ pressed }) => [
            styles.botaoLogout,
            pressed && { opacity: 0.7 },
          ]}
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
  areasBotoesDoutor: {
    flexDirection: "column",
  },
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
  separacaoAreas: {
    gap: 22,
  },
  botoesAreaBranca: {
    color: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 30,
    textAlign: "center",
    padding: 10,
    fontSize: 16,
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