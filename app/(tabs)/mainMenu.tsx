import Background from "@/components/Background";
import MainMenuButton from "@/components/mainMenuButton";
import MoodChart from "@/components/MoodChart";
import PurpleSquare from "@/components/purpleSquare";
import { useAuth } from "@/src/contexts/AuthContext";
import { StyleSheet, Text, View } from "react-native";

export default function MainMenu() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <Background center style={styles.containerPrincipal}>
      <PurpleSquare>
        <Text style={styles.greeting}>Olá, {firstName}!</Text>
        <MoodChart />
      </PurpleSquare>

      <View style={styles.areaBotao}>
        <MainMenuButton
          link="/emotionGraphic"
          icon={require("@/assets/images/calendario.png")}
          title="Como foi seu dia?"
        >
          Conte como foi seu dia
        </MainMenuButton>
        <MainMenuButton
          link="/diary"
          icon={require("@/assets/images/diario.png")}
          title="Diário"
        >
          Desabafe e deixe o gatinho te ajudar
        </MainMenuButton>
        <MainMenuButton
          link="/diary"
          icon={require("@/assets/images/livro.png")}
          title="Atividades"
        >
          Recomendação do gatinho para hoje
        </MainMenuButton>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    gap: 15,
  },
  greeting: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  areaBotao: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
});