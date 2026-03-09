import Background from "@/components/Background";
import colors from "@/theme/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ProfessionalPacient() {
  const router = useRouter();

  function goToRegister(role: "pro" | "patient") {
    router.push({ pathname: "/register", params: { role } });
  }

  return (
    <Background style={styles.container}>
      <Image
        source={require("../../assets/images/homepage/icone.png")}
        contentFit="contain"
        style={styles.image}
      />
      <Text style={styles.text}>
        Primeiramente precisamos saber se você é um profissional ou um paciente
      </Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => goToRegister("pro")}
      >
        <Text style={styles.buttonText}>Profissional</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button_2, pressed && styles.buttonPressed]}
        onPress={() => goToRegister("patient")}
      >
        <Text style={styles.buttonText}>Paciente</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>Já tenho conta? Fazer login</Text>
      </Pressable>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    paddingTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    marginTop: 12,
    paddingVertical: 12,
    width: 200,
    alignItems: "center",
  },
  button_2: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 50,
    marginTop: 12,
    paddingVertical: 12,
    width: 200,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: colors.buttonClicked,
    borderColor: colors.buttonClicked,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: colors.primary,
    marginTop: 24,
    fontSize: 14,
    fontWeight: "bold",
  },
});