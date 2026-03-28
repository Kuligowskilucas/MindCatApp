import colors from "@/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View, ViewToken } from "react-native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    emoji: "🐱",
    title: "Bem-vindo ao MindCat",
    description:
      "Seu companheiro de saúde mental. Acompanhe seu humor, escreva no diário e conecte-se com profissionais.",
  },
  {
    id: "2",
    emoji: "📊",
    title: "Acompanhe seu humor",
    description:
      "Registre como você está se sentindo todos os dias com a escala gatinho e acompanhe sua evolução no gráfico.",
  },
  {
    id: "3",
    emoji: "🤝",
    title: "Conecte-se com profissionais",
    description:
      "Seu psicólogo pode acompanhar seu progresso, enviar tarefas e te ajudar de forma mais próxima.",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

 async function handleFinish() {
    await AsyncStorage.setItem("onboarding_done", "true");
    router.replace("/professionalPacient");
}

  function handleNext() {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinish();
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.btn, pressed && { opacity: 0.8 }]}
          onPress={handleNext}
        >
          <Text style={styles.btnText}>
            {currentIndex === slides.length - 1 ? "Começar" : "Próximo"}
          </Text>
        </Pressable>

        {currentIndex < slides.length - 1 && (
          <Pressable onPress={handleFinish}>
            <Text style={styles.skip}>Pular</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
    alignItems: "center",
    gap: 16,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  dotActive: {
    backgroundColor: "#fff",
    width: 24,
  },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 48,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  skip: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
});