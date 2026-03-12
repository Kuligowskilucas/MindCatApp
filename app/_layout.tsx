import colors from '@/theme/colors';
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Pressable } from "react-native";
import 'react-native-reanimated';


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

  useEffect(() => {
    if (loading) return;

    const inAuth = segments[0] === '(auth)';

    if (!user && !inAuth) {
      // user deslogou ou token expirou → vai pro login limpando a stack
      router.replace("/(auth)/login");
    } else if (user && inAuth) {
      // user logou → sai da área de auth
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);

  if (loading) return null;

  return (
    <Stack
      initialRouteName="(auth)"
      screenOptions={{
        headerStyle: { backgroundColor: colors.secondary },
        headerTintColor: '#fff',
        headerTitleStyle: { color: 'transparent' },
        headerShown: true,
        headerBackTitle: "Voltar",
        headerRight: () => (
          <Pressable onPress={() => router.push('/settings')} style={{ marginRight: 15 }}>
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