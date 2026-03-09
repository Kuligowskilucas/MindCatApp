import Background from "@/components/Background";
import Editor from "@/components/dom-components/hello-dom";
import PurpleSquare from "@/components/purpleSquare";
import AppLogo from "@/components/ui/Logo";
import {
  deleteDiaryEntry,
  DiaryEntry,
  getDiaryEntries,
  setDiaryPassword,
  storeDiaryEntry,
} from "@/src/services/diary";
import colors from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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

type Screen = "editor" | "unlock" | "entries" | "create-password";

export default function Diary() {
  // editor
  const [plainText, setPlainText] = useState("");
  const [editorState, setEditorState] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // navegação interna
  const [screen, setScreen] = useState<Screen>("editor");

  // senha
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // entradas
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [unlockedPassword, setUnlockedPassword] = useState<string | null>(null);

  // ─── SALVAR NOVA ENTRADA ───
  async function handleSave() {
    if (!plainText.trim()) {
      Alert.alert("Atenção", "Escreva algo antes de salvar.");
      return;
    }
    try {
      setSaving(true);
      await storeDiaryEntry(plainText);
      Alert.alert("Salvo!", "Sua entrada foi registrada com sucesso.");
      setPlainText("");
      setEditorState(null);
    } catch (error: any) {
      Alert.alert("Erro", error?.response?.data?.message || "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  // ─── DESBLOQUEAR COM SENHA ───
  async function handleUnlock() {
    if (!password) return;
    try {
      setLoadingEntries(true);
      const data = await getDiaryEntries(password);
      setEntries(data);
      setUnlockedPassword(password);
      setPassword("");
      setScreen("entries");
    } catch (error: any) {
      if (error?.response?.status === 403) {
        Alert.alert("Senha incorreta", "A senha do diário está errada. Tente novamente.");
      } else {
        Alert.alert("Erro", error?.response?.data?.message || "Não foi possível carregar.");
      }
    } finally {
      setLoadingEntries(false);
    }
  }

  // ─── CRIAR SENHA DO DIÁRIO ───
  async function handleCreatePassword() {
    if (newPassword.length < 8) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    try {
      setLoadingEntries(true);
      await setDiaryPassword(newPassword);
      Alert.alert("Pronto!", "Senha do diário criada. Agora você pode ver suas entradas.", [
        { text: "Ok", onPress: () => setScreen("unlock") },
      ]);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      Alert.alert("Erro", error?.response?.data?.message || "Não foi possível criar a senha.");
    } finally {
      setLoadingEntries(false);
    }
  }

  // ─── DELETAR ENTRADA ───
  function handleDelete(entry: DiaryEntry) {
    Alert.alert("Deletar entrada", "Tem certeza? Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDiaryEntry(entry.id, unlockedPassword!);
            setEntries((prev) => prev.filter((e) => e.id !== entry.id));
          } catch {
            Alert.alert("Erro", "Não foi possível deletar.");
          }
        },
      },
    ]);
  }

  // ─── TENTAR VER ENTRADAS ───
  function handleGoToEntries() {
    // se já desbloqueou nesta sessão, vai direto
    if (unlockedPassword) {
      getDiaryEntries(unlockedPassword)
        .then((data) => {
          setEntries(data);
          setScreen("entries");
        })
        .catch(() => {
          // senha pode ter mudado, pede de novo
          setUnlockedPassword(null);
          setScreen("unlock");
        });
    } else {
      setScreen("unlock");
    }
  }

  // ════════════════════════════════════════
  // TELA: CRIAR SENHA DO DIÁRIO
  // ════════════════════════════════════════
  if (screen === "create-password") {
    return (
      <Background>
        <PurpleSquare style={styles.passwordBox}>
          <Text style={styles.passwordTitle}>Criar senha do diário</Text>
          <Text style={styles.passwordDesc}>
            Essa senha protege suas entradas. Só você poderá lê-las.
          </Text>
          <TextInput
            placeholder="Nova senha (mín. 8 caracteres)"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            placeholder="Confirmar senha"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Pressable style={styles.btnPrimary} onPress={handleCreatePassword} disabled={loadingEntries}>
            {loadingEntries ? (
              <ActivityIndicator color="#7B2FBE" />
            ) : (
              <Text style={styles.btnPrimaryText}>Criar senha</Text>
            )}
          </Pressable>
          <Pressable onPress={() => setScreen("editor")}>
            <Text style={styles.linkVoltar}>Voltar ao editor</Text>
          </Pressable>
        </PurpleSquare>
      </Background>
    );
  }

  // ════════════════════════════════════════
  // TELA: DESBLOQUEAR (DIGITAR SENHA)
  // ════════════════════════════════════════
  if (screen === "unlock") {
    return (
      <Background>
        <PurpleSquare style={styles.passwordBox}>
          <Ionicons name="lock-closed" size={48} color="#fff" style={{ alignSelf: "center" }} />
          <Text style={styles.passwordTitle}>Diário protegido</Text>
          <Text style={styles.passwordDesc}>
            Digite sua senha do diário para ver suas entradas.
          </Text>
          <TextInput
            placeholder="Senha do diário"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.btnPrimary} onPress={handleUnlock} disabled={loadingEntries}>
            {loadingEntries ? (
              <ActivityIndicator color="#7B2FBE" />
            ) : (
              <Text style={styles.btnPrimaryText}>Desbloquear</Text>
            )}
          </Pressable>
          <Pressable onPress={() => setScreen("create-password")}>
            <Text style={styles.linkVoltar}>Ainda não tenho senha</Text>
          </Pressable>
          <Pressable onPress={() => setScreen("editor")}>
            <Text style={styles.linkVoltar}>Voltar ao editor</Text>
          </Pressable>
        </PurpleSquare>
      </Background>
    );
  }

  // ════════════════════════════════════════
  // TELA: LISTA DE ENTRADAS
  // ════════════════════════════════════════
  if (screen === "entries") {
    return (
      <Background>
        <PurpleSquare style={styles.entriesBox}>
          <Text style={styles.passwordTitle}>Suas entradas</Text>

          {entries.length === 0 ? (
            <Text style={styles.passwordDesc}>Nenhuma entrada ainda. Comece escrevendo!</Text>
          ) : (
            <FlatList
              data={entries}
              keyExtractor={(item) => String(item.id)}
              style={{ maxHeight: 400 }}
              renderItem={({ item }) => {
                const date = new Date(item.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <View style={styles.entryCard}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.entryDate}>{date}</Text>
                      <Text style={styles.entryContent} numberOfLines={4}>
                        {item.content}
                      </Text>
                    </View>
                    <Pressable onPress={() => handleDelete(item)} style={styles.deleteBtn}>
                      <Ionicons name="trash-outline" size={20} color="#D9534F" />
                    </Pressable>
                  </View>
                );
              }}
            />
          )}

          <Pressable style={styles.btnPrimary} onPress={() => setScreen("editor")}>
            <Text style={styles.btnPrimaryText}>Nova entrada</Text>
          </Pressable>
        </PurpleSquare>
      </Background>
    );
  }

  // ════════════════════════════════════════
  // TELA: EDITOR (padrão)
  // ════════════════════════════════════════
  return (
    <Background style={styles.container}>
      <View style={styles.areaTexto}>
        <AppLogo />
        <Text style={styles.texto}>
          Aqui é sua zona segura, apenas você e seus pensamentos
        </Text>
      </View>

      <Editor setPlainText={setPlainText} setEditorState={setEditorState} />

      <View style={styles.bottomBar}>
        <Pressable
          style={({ pressed }) => [styles.btnSave, pressed && { opacity: 0.8 }]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="save-outline" size={18} color="#fff" />
              <Text style={styles.btnSaveText}>Salvar</Text>
            </>
          )}
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btnEntries, pressed && { opacity: 0.8 }]}
          onPress={handleGoToEntries}
        >
          <Ionicons name="book-outline" size={18} color={colors.primary} />
          <Text style={styles.btnEntriesText}>Ver entradas</Text>
        </Pressable>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    width: "100%",
    height: "100%",
  },
  areaTexto: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    width: "100%",
    paddingTop: 16,
  },
  texto: {
    textAlign: "center",
    marginBottom: 8,
  },

  // ─── barra inferior ───
  bottomBar: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  btnSave: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnSaveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnEntries: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnEntriesText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 15,
  },

  // ─── telas de senha / entradas ───
  passwordBox: {
    gap: 16,
  },
  passwordTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  passwordDesc: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    opacity: 0.85,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  btnPrimary: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnPrimaryText: {
    color: "#7B2FBE",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkVoltar: {
    color: "#fff",
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 14,
    opacity: 0.85,
  },

  // ─── cards de entradas ───
  entriesBox: {
    gap: 12,
  },
  entryCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  entryDate: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  entryContent: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 8,
  },
});