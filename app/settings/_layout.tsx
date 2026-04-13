import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="perfil" options={{ title: "Perfil" }} />
      <Stack.Screen name="patients" options={{ title: "Pacientes" }} />
      <Stack.Screen name="doctors" options={{ title: "Profissionais" }} />
      <Stack.Screen name="regiao" options={{ title: "Região" }} />
      <Stack.Screen name="privacidade" options={{ title: "Privacidade" }} />
      <Stack.Screen name="sobre" options={{ title: "Sobre Nós" }} />
      <Stack.Screen name="editProfile" options={{ title: "Editar Perfil" }} />
      <Stack.Screen name="deleteAccount" options={{ title: "Deletar Conta" }} />
    </Stack>
  );
}