import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import WhiteSquare from "@/components/whiteSquare";
import { storeMood } from "@/src/services/mood";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import colors from '@/theme/colors';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

type Mood = 1 | 2 | 3 | 4 | 5;

const icons = [
  require("../../assets/images/imagensGrafico/botaoBravo.png"),
  require("../../assets/images/imagensGrafico/botaoTriste.png"),
  require("../../assets/images/imagensGrafico/botaoNormal.png"),
  require("../../assets/images/imagensGrafico/botaoFeliz.png"),
  require("../../assets/images/imagensGrafico/botaoMuitoFeliz.png"),
] as const;

const moodLabels: Record<Mood, string> = {
  1: "Bravo",
  2: "Triste",
  3: "Normal",
  4: "Feliz",
  5: "Muito Feliz",
};

export default function EmotionGraphic() {
  const router = useRouter();
  const [mood, setMood] = useState<Mood | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    if (!mood) return;

    try {
      setLoading(true);
      await storeMood({ mood_level: mood });
      setSaved(true);
      Alert.alert("Registrado!", "Seu humor de hoje foi salvo com sucesso.", [
        { text: "Ok", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      if (error?.response?.status === 409) {
        Alert.alert("Opa!", "Você já registrou seu humor hoje. Volte amanhã!");
      } else {
        const msg =
          error?.response?.data?.message ||
          "Não foi possível salvar. Tente novamente.";
        Alert.alert("Erro", msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <PurpleSquare>
        <Text style={styles.descricao}>Como está seu humor hoje?</Text>
        <Text style={styles.descricao}>
          Pode nos contar sem medo, a escala gatinho vai te ajudar
        </Text>

        <WhiteSquare>
          <View style={styles.areaGrafico}>
            {icons.map((img, index) => {
              const val = (index + 1) as Mood;
              const selected = mood === val;
              return (
                <Pressable
                  key={val}
                  onPress={() => !saved && setMood(val)}
                  style={[
                    styles.tamanhoBotao,
                    selected && styles.selected,
                    !selected && mood !== null && styles.unselected,
                  ]}
                >
                  <Image
                    style={styles.imagemGrafico}
                    source={img}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            })}
          </View>
        </WhiteSquare>

        <Text style={styles.moodLabel}>
          {mood ? moodLabels[mood] : "Selecione como você está"}
        </Text>

        {mood && !saved && (
          <Pressable
            style={({ pressed }) => [
              styles.botaoSalvar,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#7B2FBE" />
            ) : (
              <Text style={styles.botaoSalvarTexto}>Salvar</Text>
            )}
          </Pressable>
        )}

        {saved && (
          <Text style={styles.moodLabel}>Humor registrado hoje!</Text>
        )}
      </PurpleSquare>
    </Background>
  );
}

const styles = StyleSheet.create({
  descricao: {
    color: "white",
    fontSize: 16,
    lineHeight: 25,
    textAlign: "center",
    marginBottom: 24,
  },
  areaGrafico: {
    flexDirection: "row",
  },
  tamanhoBotao: {
    width: "20%",
    height: 60,
  },
  selected: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  unselected: {
    opacity: 0.4,
  },
  imagemGrafico: {
    width: "100%",
    height: "100%",
  },
  moodLabel: {
    color: "white",
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  botaoSalvar: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignSelf: "center",
  },
  botaoSalvarTexto: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});