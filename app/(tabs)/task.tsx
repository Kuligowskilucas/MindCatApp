import PurpleSquare from "@/components/purpleSquare";
import Background from "@/components/Background";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  createTask,
  deleteTask,
  getPatients,
  getTasks,
  markTaskDone,
  Patient,
  Task,
} from "@/src/services/task";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Tasks() {
  const { user } = useAuth();
  const isPro = user?.role === "pro";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // modal de criar tarefa (pro)
  const [modalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const scope = isPro ? "assigned" : "mine";
      const data = await getTasks(scope);
      setTasks(data.data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar as tarefas.");
    } finally {
      setLoading(false);
    }
  }, [isPro]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // ─── PACIENTE: CONCLUIR TAREFA ───
  async function handleDone(task: Task) {
    Alert.alert("Concluir tarefa", `Marcar "${task.title}" como feita?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Concluir",
        onPress: async () => {
          try {
            const updated = await markTaskDone(task.id);
            setTasks((prev) =>
              prev.map((t) => (t.id === updated.id ? updated : t))
            );
          } catch {
            Alert.alert("Erro", "Não foi possível concluir.");
          }
        },
      },
    ]);
  }

  // ─── PRO: ABRIR MODAL DE CRIAR ───
  async function handleOpenCreate() {
    try {
      const list = await getPatients();
      if (list.length === 0) {
        Alert.alert("Sem pacientes", "Você ainda não tem pacientes vinculados.");
        return;
      }
      setPatients(list);
      setSelectedPatient(null);
      setNewTitle("");
      setModalVisible(true);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar pacientes.");
    }
  }

  // ─── PRO: CRIAR TAREFA ───
  async function handleCreate() {
    if (!selectedPatient) {
      Alert.alert("Atenção", "Selecione um paciente.");
      return;
    }
    if (!newTitle.trim()) {
      Alert.alert("Atenção", "Digite um título para a tarefa.");
      return;
    }
    try {
      setCreating(true);
      const task = await createTask(selectedPatient.id, newTitle.trim());
      setTasks((prev) => [task, ...prev]);
      setModalVisible(false);
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Não foi possível criar."
      );
    } finally {
      setCreating(false);
    }
  }

  // ─── PRO: DELETAR TAREFA ───
  function handleDelete(task: Task) {
    Alert.alert("Deletar tarefa", `Remover "${task.title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTask(task.id);
            setTasks((prev) => prev.filter((t) => t.id !== task.id));
          } catch {
            Alert.alert("Erro", "Não foi possível deletar.");
          }
        },
      },
    ]);
  }

  // ─── RENDER ITEM ───
  function renderTask({ item }: { item: Task }) {
    const isDone = item.status === "done";
    const date = new Date(item.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });

    return (
      <View style={[styles.card, isDone && styles.cardDone]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardTitle, isDone && styles.cardTitleDone]}>
            {item.title}
          </Text>
          <Text style={styles.cardDate}>
            {date} {isDone ? "• Concluída" : "• Pendente"}
          </Text>
        </View>

        {!isDone && !isPro && (
          <Pressable onPress={() => handleDone(item)} style={styles.actionBtn}>
            <Ionicons name="checkmark-circle-outline" size={26} color="#4CAF50" />
          </Pressable>
        )}

        {isPro && (
          <Pressable onPress={() => handleDelete(item)} style={styles.actionBtn}>
            <Ionicons name="trash-outline" size={22} color="#D9534F" />
          </Pressable>
        )}
      </View>
    );
  }

  // ─── SEPARAR ATIVAS E CONCLUÍDAS ───
  const activeTasks = tasks.filter((t) => t.status === "active");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <Background>
      <PurpleSquare style={styles.container}>
        <Text style={styles.titulo}>
          {isPro ? "Tarefas dos Pacientes" : "Suas Tarefas"}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : tasks.length === 0 ? (
          <Text style={styles.empty}>
            {isPro
              ? "Nenhuma tarefa criada ainda."
              : "Nenhuma tarefa atribuída a você."}
          </Text>
        ) : (
          <FlatList
            data={[...activeTasks, ...doneTasks]}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderTask}
            style={{ maxHeight: 500 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              activeTasks.length > 0 ? (
                <Text style={styles.sectionLabel}>
                  Pendentes ({activeTasks.length})
                </Text>
              ) : null
            }
          />
        )}

        {isPro && (
          <Pressable
            style={({ pressed }) => [
              styles.btnCriar,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleOpenCreate}
          >
            <Ionicons name="add-circle-outline" size={20} color="#7B2FBE" />
            <Text style={styles.btnCriarText}>Nova tarefa</Text>
          </Pressable>
        )}
      </PurpleSquare>

      {/* ─── MODAL: CRIAR TAREFA (PRO) ─── */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Tarefa</Text>

            <Text style={styles.modalLabel}>Paciente</Text>
            <FlatList
              data={patients}
              horizontal
              keyExtractor={(p) => String(p.id)}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: 50, marginBottom: 12 }}
              renderItem={({ item: p }) => (
                <Pressable
                  onPress={() => setSelectedPatient(p)}
                  style={[
                    styles.patientChip,
                    selectedPatient?.id === p.id && styles.patientChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.patientChipText,
                      selectedPatient?.id === p.id && { color: "#fff" },
                    ]}
                  >
                    {p.name}
                  </Text>
                </Pressable>
              )}
            />

            <Text style={styles.modalLabel}>Título</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: Fazer exercício de respiração"
              placeholderTextColor="#aaa"
              value={newTitle}
              onChangeText={setNewTitle}
              maxLength={120}
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalBtnCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#666", fontWeight: "600" }}>
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                style={styles.modalBtnConfirm}
                onPress={handleCreate}
                disabled={creating}
              >
                {creating ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Criar
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  empty: {
    color: "#fff",
    textAlign: "center",
    opacity: 0.7,
    fontSize: 15,
  },
  sectionLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },

  // cards
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cardDone: {
    opacity: 0.5,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cardTitleDone: {
    textDecorationLine: "line-through",
  },
  cardDate: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  actionBtn: {
    padding: 6,
    marginLeft: 10,
  },

  // botão criar
  btnCriar: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  btnCriarText: {
    color: "#7B2FBE",
    fontWeight: "bold",
    fontSize: 16,
  },

  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 16,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  patientChip: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  patientChipSelected: {
    backgroundColor: colors.primary,
  },
  patientChipText: {
    color: colors.primary,
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtnCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
  },
  modalBtnConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
});