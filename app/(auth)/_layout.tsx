import { Stack } from "expo-router";



export default function AuthLayout(){
  return(
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="professionalPacient" options={{ headerShown: false }}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword"/>
    </Stack>
  )
}