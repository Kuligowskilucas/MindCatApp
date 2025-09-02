import colors from '@/theme/colors';
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";


export default function TabsLayout() {


  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.secondary, 
          borderTopWidth: 0,               
          elevation: 0,                    
        },
        tabBarActiveTintColor: "#fff",    
        tabBarInactiveTintColor: "#ccc",  
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600"},
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "index") iconName = "home-outline";
          else if (route.name === "diary") iconName = "book-outline";
          else iconName = "menu-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="mainMenu"  options={{ title: "Menu" }} />
      <Tabs.Screen name="index"  options={{ title: "Início" }} />
      <Tabs.Screen name="diary"  options={{ title: "Diário" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
