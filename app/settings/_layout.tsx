import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="perfil" options={{ title: "Perfil" }} />
      <Stack.Screen name="regiao" options={{ title: "Região" }} />
      <Stack.Screen name="privacidade" options={{ title: "Privacidade" }} />
      <Stack.Screen name="sobre" options={{ title: "Sobre Nós" }} />
    </Stack>
  );
}
