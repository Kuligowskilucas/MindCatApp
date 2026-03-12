import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import { getPatients, Patient } from "@/src/services/task";
import { linkPatient, searchPatientByEmail, unlinkPatient } from "@/src/services/link";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function PatientsScreen() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [searching, setSearching] = useState(false);

  const loadPatients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar pacientes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  async function handleSearch() {
    if (!searchEmail.trim()) {
      Alert.alert("Atenção", "Digite o email do paciente.");
      return;
    }
    try {
      setSearching(true);
      const result = await searchPatientByEmail(searchEmail.trim());

      if (!result.consent) {
        Alert.alert(
          "Sem consentimento",
          `${result.name} ainda não autorizou o compartilhamento de dados com profissionais. Peça para o paciente ativar nas configurações do app.`
        );
        return;
      }

      Alert.alert(
        "Paciente encontrado",
        `Vincular ${result.name} (${result.email})?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Vincular",
            onPress: async () => {
              try {
                await linkPatient(result.id);
                setSearchEmail("");
                loadPatients();
                Alert.alert("Sucesso", `${result.name} vinculado(a)!`);
              } catch (error: any) {
                Alert.alert(
                  "Erro",
                  error?.response?.data?.message || "Não foi possível vincular."
                );
              }
            },
          },
        ]
      );
    } catch (error: any) {
      if (error?.response?.status === 404) {
        Alert.alert("Não encontrado", "Nenhum paciente com esse email.");
      } else {
        const status = error?.response?.status;
        const msg = error?.response?.data?.message || error?.message || "Erro desconhecido";
        console.log("Erro na busca:", status, msg);
        Alert.alert("Erro", `${msg} (status: ${status})`);
      }
    } finally {
      setSearching(false);
    }
  }

  function handleUnlink(patient: Patient) {
    Alert.alert("Desvincular", `Remover ${patient.name} dos seus pacientes?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Desvincular",
        style: "destructive",
        onPress: async () => {
          try {
            await unlinkPatient(patient.id);
            setPatients((prev) => prev.filter((p) => p.id !== patient.id));
          } catch {
            Alert.alert("Erro", "Não foi possível desvincular.");
          }
        },
      },
    ]);
  }

  return (
    <Background>
      <PurpleSquare style={styles.container}>
        <Text style={styles.titulo}>Meus Pacientes</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Email do paciente"
            placeholderTextColor="#aaa"
            value={searchEmail}
            onChangeText={setSearchEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Pressable style={styles.searchBtn} onPress={handleSearch} disabled={searching}>
            {searching ? (
              <ActivityIndicator color="#7B2FBE" size="small" />
            ) : (
              <Ionicons name="search" size={22} color="#7B2FBE" />
            )}
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : patients.length === 0 ? (
          <Text style={styles.empty}>
            Nenhum paciente vinculado. Use a busca acima para encontrar e vincular.
          </Text>
        ) : (
          <FlatList
            data={patients}
            keyExtractor={(item) => String(item.id)}
            style={{ maxHeight: 400 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardEmail}>{item.email}</Text>
                </View>
                <Pressable onPress={() => handleUnlink(item)} style={styles.unlinkBtn}>
                  <Ionicons name="close-circle-outline" size={24} color="#D9534F" />
                </Pressable>
              </View>
            )}
          />
        )}
      </PurpleSquare>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  titulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  searchBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    color: "#fff",
    textAlign: "center",
    opacity: 0.7,
    fontSize: 14,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cardName: { color: "#fff", fontSize: 16, fontWeight: "600" },
  cardEmail: { color: "#fff", fontSize: 13, opacity: 0.7, marginTop: 2 },
  unlinkBtn: { padding: 6, marginLeft: 10 },
});