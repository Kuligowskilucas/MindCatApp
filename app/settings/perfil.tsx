import Background from "@/components/Background";
import PurpleSquare from "@/components/purpleSquare";
import { useAuth } from "@/src/contexts/AuthContext";
import { getMe, UserWithProfile } from "@/src/services/user";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMe();
        setPerfil(data);
      } catch {
        setError("Não foi possível carregar o perfil.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Background>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Background>
    );
  }

  if (error || !perfil) {
    return (
      <Background>
        <PurpleSquare>
          <Text style={styles.nome}>{error ?? "Erro desconhecido"}</Text>
        </PurpleSquare>
      </Background>
    );
  }

  const roleLabel = perfil.role === "pro" ? "Profissional" : "Paciente";
  const createdAt = new Date(perfil.created_at).toLocaleDateString("pt-BR");

  return (
    <Background>
      <PurpleSquare style={styles.areaNome}>
        <View>
          <Text style={styles.nome}>{perfil.name}</Text>
          <Text style={styles.subtitulo}>{roleLabel}</Text>
        </View>

        <View style={styles.risco} />

        <View>
          <Text style={styles.titulo}>Informações da Conta</Text>
          <Text style={styles.informacao}>{"\u2022"} Email: {perfil.email}</Text>
          <Text style={styles.informacao}>{"\u2022"} Conta criada em: {createdAt}</Text>
        </View>

        <View style={styles.risco} />

        <View>
          <Text style={styles.titulo}>Preferências</Text>
          <Text style={styles.informacao}>
            {"\u2022"} Compartilhar dados com profissional:{" "}
            {perfil.profile?.consent_share_with_professional ? "Sim" : "Não"}
          </Text>
          <Text style={styles.informacao}>
            {"\u2022"} Notificações:{" "}
            {perfil.profile?.push_notifications ? "Ativadas" : "Desativadas"}
          </Text>
          <Text style={styles.informacao}>
            {"\u2022"} Lembrete TDAH:{" "}
            {perfil.profile?.tdah_reminder ? "Ativo" : "Inativo"}
          </Text>
        </View>
      </PurpleSquare>
    </Background>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nome: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitulo: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
    marginTop: 4,
  },
  risco: {
    width: "100%",
    height: 2,
    backgroundColor: "white",
  },
  areaNome: {
    gap: 10,
  },
  titulo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  informacao: {
    color: "white",
    fontSize: 16,
    lineHeight: 25,
  },
});