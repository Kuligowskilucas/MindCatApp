// app/index.tsx
import { Redirect } from 'expo-router';

// se quiser, pode importar o mesmo useAuth que você usa no _layout
const useAuth = () => ({ user: null, loading: false });

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;   // ou "/(auth)/login"
  }

  return <Redirect href="/(tabs)" />;
}
