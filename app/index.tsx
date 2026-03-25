import { useAuth } from "@/src/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, loading: authLoading } = useAuth();
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

  if (authLoading || checkingOnboarding) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) return <Redirect href="/(tabs)" />;
  if (showOnboarding) return <Redirect href="/(auth)/onboarding" />;
  return <Redirect href="/(auth)/login" />;
}