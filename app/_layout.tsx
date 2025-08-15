import { useColorScheme } from '@/hooks/useColorScheme';
import colors from '@/theme/colors';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


const useAuth = () => ({user: null, loading: false});

export default function RootLayout() {

  const { user, loading } = useAuth();
  if(loading) return null;

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  console.log(user)

  return (
    <>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.secondary }}}>
        {
          
            <>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
              {/* <Stack.Screen name="professionalPaciente/[id]" /> */}
              <Stack.Screen name='(auth)' />

            </>

        }
      </Stack>
      <StatusBar style="auto" />
   </>
  );
}
