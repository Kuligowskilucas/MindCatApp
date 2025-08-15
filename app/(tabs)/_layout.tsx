import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="mainMenu"  options={{ title: "Menu" }} />
      <Tabs.Screen name="index"  options={{ title: "Início" }} />
      <Tabs.Screen name="diary"  options={{ title: "Diário" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
