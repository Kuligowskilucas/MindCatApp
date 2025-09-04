import { Stack } from "expo-router";

export default function EmotionGraphicLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="summary" />
      <Stack.Screen name="pacientSummary" />
      <Stack.Screen name="angryMode" />
    </Stack>
  );
}
