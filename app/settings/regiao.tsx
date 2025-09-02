import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";

export default function Regiao() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false); // usuário bloqueou nas configs
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  const enableLocation = async () => {
    try {
      setLoading(true);
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setBlocked(!canAskAgain);
        if (!canAskAgain) {
          Alert.alert(
            "Permissão negada",
            "Para usar a localização, habilite nas configurações do sistema.",
            [{ text: "Abrir configurações", onPress: () => Linking.openSettings() }, { text: "Ok" }]
          );
        }
        setEnabled(false);
        return;
      }

      // posição atual (opcional)
      const now = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setCoords(now.coords);

      // começa a observar mudanças (opcional)
      watchRef.current?.remove();
      watchRef.current = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 5000, distanceInterval: 5 },
        (loc) => setCoords(loc.coords)
      );

      setEnabled(true);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível ativar a localização.");
    } finally {
      setLoading(false);
    }
  };

  const disableLocation = () => {
    watchRef.current?.remove();
    watchRef.current = null;
    setCoords(null);
    setEnabled(false);
  };

  useEffect(() => {
    return () => watchRef.current?.remove();
  }, []);

  return (
    <Background>
      <PurpleSquare>
        <Text style={styles.titulo}>Localização</Text>

        <Text style={styles.texto}>
          Por que precisamos da sua localização?{'\n'}
          Para que possamos mostrar psicólogos e clínicas especializadas perto de você. Sua localização ativa
          garante que a busca seja pela sua vizinhança, tornando tudo mais ágil.
        </Text>

        <View style={{ height: 28 }} />

        <OptionButton label="Manter Ativa" active={enabled} onPress={enableLocation} disabled={loading}/>

        <View style={{ height: 16 }} />

        <OptionButton
          label="Deixa desativado"
          active={!enabled}
          onPress={disableLocation}
          disabled={loading}
        />

        {loading && (
          <View style={{ marginTop: 16, alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        )}

        {blocked && (
          <Pressable onPress={() => Linking.openSettings()} style={{ marginTop: 16, alignSelf: "center" }}>
            <Text style={styles.link}>Abrir configurações do sistema</Text>
          </Pressable>
        )}

        <Text style={styles.status}>
          {enabled && coords ? `Ativa • Lat: ${coords.latitude.toFixed(4)}  Lon: ${coords.longitude.toFixed(4)}` : "Localização desativada"}
        </Text>
      </PurpleSquare>
    </Background>
  );
}

function OptionButton({label, active, onPress, disabled}: {
  label: string;
  active: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable onPress={onPress} disabled={!!disabled} style={[styles.botao, disabled && { opacity: 0.6 }]}>
      <View style={[styles.bolinha, active && styles.bolinhaAtiva]} />
      <Text style={styles.textoBotao}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  texto: {
    color: "white",
    fontSize: 16,
    lineHeight: 22,
  },
  botao: {
    alignSelf: "center",
    minWidth: "80%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  bolinha: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "white",
  },
  bolinhaAtiva: {
    backgroundColor: "white",
  },
  textoBotao: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  link: {
    color: "white",
    textDecorationLine: "underline",
  },
  status: {
    marginTop: 12,
    color: "white",
    fontSize: 12,
    textAlign: "center",
    opacity: 0.9,
  },
});
