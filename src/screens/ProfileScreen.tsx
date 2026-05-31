import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { getMeuPerfil, editarPerfil, deletarConta } from "../services/profile";
import { clearToken } from "../services/api";
import { User } from "../types";

type Props = {
  user: User;
  onLogout: () => void;
};

export default function ProfileScreen({ user: initialUser, onLogout }: Props) {
  const [nome, setNome] = useState(initialUser.nome);
  const [localidade, setLocalidade] = useState(initialUser.localidade ?? "");
  const [email, setEmail] = useState(initialUser.email);
  const [alertRadius, setAlertRadius] = useState(
    initialUser.raioAlertasKm || 30,
  );
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    getMeuPerfil()
      .then((perfil) => {
        setNome(perfil.nome);
        setEmail(perfil.email);
        setLocalidade(perfil.localidade ?? "");
        setAlertRadius(perfil.raioAlertasKm);
      })
      .catch(() => {})
      .finally(() => setLoadingProfile(false));
  }, []);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza? Esta ação é irreversível e todos os seus dados serão removidos.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await deletarConta();
              clearToken();
              onLogout();
            } catch (e: any) {
              Alert.alert(
                "Erro",
                e.message ?? "Não foi possível excluir a conta.",
              );
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await editarPerfil(nome, localidade, alertRadius);
      setEditing(false);
      Alert.alert("Salvo", "Dados atualizados com sucesso.");
    } catch (e: any) {
      Alert.alert("Erro", e.message ?? "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  };

  const initials = nome
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  if (loadingProfile) {
    return (
      <SafeAreaView style={[styles.container, styles.center]} edges={["top"]}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={24}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          {editing ? (
            <>
              <TextInput
                style={styles.nameInput}
                value={nome}
                onChangeText={setNome}
                autoFocus
                returnKeyType="next"
                placeholder="Nome"
                placeholderTextColor="#aaa"
              />
              <TextInput
                style={styles.nameInput}
                value={localidade}
                onChangeText={setLocalidade}
                returnKeyType="done"
                placeholder="Localidade (ex: São Paulo, SP)"
                placeholderTextColor="#aaa"
              />
            </>
          ) : (
            <>
              <Text style={styles.profileName}>{nome}</Text>
              {localidade ? (
                <Text style={styles.profileLocation}>{localidade}</Text>
              ) : null}
            </>
          )}

          <Text style={styles.profileEmail}>{email}</Text>

          <TouchableOpacity
            style={[styles.editBtn, saving && styles.editBtnDisabled]}
            onPress={editing ? handleSave : () => setEditing(true)}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons
                  name={editing ? "checkmark" : "pencil-outline"}
                  size={14}
                  color="#fff"
                />
                <Text style={styles.editBtnText}>
                  {editing ? "Salvar" : "Editar Perfil"}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Raio de Alertas</Text>
          <Text style={styles.radiusValue}>{Math.round(alertRadius)} km</Text>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={100}
            step={5}
            value={alertRadius}
            onValueChange={setAlertRadius}
            minimumTrackTintColor="#FF6B35"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#FF6B35"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>5 km</Text>
            <Text style={styles.sliderLabel}>100 km</Text>
          </View>
          <Text style={styles.radiusHint}>
            Você será notificado de incêndios em até {Math.round(alertRadius)}{" "}
            km de você.
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="medal" size={24} color="#FF6B35" />
            <Text style={styles.statLabel}>Colaborador</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={18} color="#E53935" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteBtn, deleting && styles.editBtnDisabled]}
          onPress={handleDeleteAccount}
          disabled={deleting}
        >
          {deleting ? (
            <ActivityIndicator size="small" color="#E53935" />
          ) : (
            <>
              <Ionicons name="trash-outline" size={18} color="#E53935" />
              <Text style={styles.deleteText}>Excluir Conta</Text>
            </>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { alignItems: "center", justifyContent: "center" },
  scroll: { padding: 16, paddingBottom: 40 },
  profileHeader: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#FF6B35",
    marginBottom: 8,
    paddingHorizontal: 8,
    textAlign: "center",
    minWidth: 200,
  },
  profileEmail: { fontSize: 13, color: "#aaa", marginBottom: 2 },
  profileLocation: { fontSize: 13, color: "#888", marginBottom: 4 },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FF6B35",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 12,
  },
  editBtnDisabled: { opacity: 0.6 },
  editBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  radiusValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B35",
    textAlign: "center",
  },
  slider: { width: "100%", marginVertical: 4 },
  sliderLabels: { flexDirection: "row", justifyContent: "space-between" },
  sliderLabel: { fontSize: 11, color: "#aaa" },
  radiusHint: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
  },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    gap: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  statLabel: { fontSize: 12, color: "#888" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E53935",
    marginBottom: 20,
  },
  logoutText: { color: "#E53935", fontWeight: "bold", fontSize: 15 },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  deleteText: { color: "#E53935", fontSize: 14 },
});
