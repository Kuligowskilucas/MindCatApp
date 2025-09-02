import { useColorScheme } from '@/hooks/useColorScheme';
import colors from '@/theme/colors';
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable } from "react-native";
import 'react-native-reanimated';


const useAuth = () => ({user: null, loading: false});

export default function RootLayout() {

  const router = useRouter();
  const { user, loading } = useAuth();
  if(loading) return null;

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),});

  if (!loaded) {
    return null;
  }
  console.log(user)

  return (
    <>
      <Stack
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
        {
          
            <>
              <Stack.Screen name="(tabs)"/>
              {/* <Stack.Screen name="(modals)" options={{ presentation: "modal" }} /> */}
              {/* <Stack.Screen name="professionalPaciente/[id]" /> */}
              {/* <Stack.Screen name='(auth)' /> */}

            </>

        }
      </Stack>
      <StatusBar style="auto" />
   </>
  );
}
