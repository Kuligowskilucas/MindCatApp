import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import { getMyProfessionals, Professional } from "@/src/services/link";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { RefreshControl } from "react-native";

export default function DoctorsScreen() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMyProfessionals();
      setProfessionals(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar seus profissionais.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return (
    <Background>
      <PurpleSquare style={styles.container}>
        <Ionicons name="people" size={40} color="#fff" style={{ alignSelf: "center" }} />
        <Text style={styles.titulo}>Meus Profissionais</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : professionals.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>
              Nenhum profissional vinculado à sua conta ainda.
            </Text>
            <Text style={styles.emptyHint}>
              Peça para seu psicólogo vincular você pelo app usando seu email de cadastro.
            </Text>
          </View>
        ) : (
          <FlatList
            data={professionals}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={24} color="#7B2FBE" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardEmail}>{item.email}</Text>
                </View>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
            }
          />
        )}
      </PurpleSquare>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  titulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyBox: {
    alignItems: "center",
    padding: 12,
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 32,
  },
  emptyText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "600",
  },
  emptyHint: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cardEmail: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.7,
    marginTop: 2,
  },
});