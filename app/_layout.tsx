import colors from "@/theme/colors";
import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <AuthProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

function RootNavigator() {
  const router = useRouter();
  const segments = useSegments();
  const { user, loading } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    async function check() {
      const done = await AsyncStorage.getItem("onboarding_done");
      if (!done) setShowOnboarding(true);
      setCheckingOnboarding(false);
    }
    check();
  }, []);

  useEffect(() => {
    if (loading || checkingOnboarding) return;

    const inAuth = segments[0] === "(auth)";

    if (!user && !inAuth) {
      if (showOnboarding) {
        router.replace("/(auth)/onboarding");
      } else {
        router.replace("/(auth)/login");
      }
    } else if (user && inAuth) {
      router.replace("/(tabs)");
    }
  }, [user, loading, segments, checkingOnboarding, showOnboarding]);

  if (loading || checkingOnboarding) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      initialRouteName="(auth)"
      screenOptions={{
        headerStyle: { backgroundColor: colors.secondary },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "transparent" },
        headerShown: true,
        headerBackTitle: "Voltar",
        headerRight: () => (
          <Pressable
            onPress={() => router.push("/settings")}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </Pressable>
        ),
        contentStyle: { backgroundColor: colors.primary },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="emotionGraphic" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
      <Stack.Screen name="professionalPaciente/[id]" />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}