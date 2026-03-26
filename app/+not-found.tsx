import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import colors from "@/theme/colors";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";

export default function NotFoundScreen() {
  return (
      <>
        <Stack.Screen options={{ title: "Ops!" }} />
        <Background>
          <PurpleSquare style={styles.container}>
            <Text style={styles.emoji}>🐱❓</Text>
            <Text style={styles.title}>Página não encontrada</Text>
            <Text style={styles.desc}>
              O gatinho procurou, mas essa tela não existe.
            </Text>
            <Link href="/" style={styles.link}>
              <Text style={styles.linkText}>Voltar para o início</Text>
            </Link>
          </PurpleSquare>
        </Background>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    opacity: 0.8,
  },
  link: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  linkText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },
});