import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { login, registrar } from "../services/auth";
import { setToken } from "../services/api";

type Props = {
  onLogin: () => void;
};

export default function AuthScreen({ onLogin }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    if (mode === "register" && !name) {
      Alert.alert("Atenção", "Preencha o nome completo.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "register") {
        await registrar(name, email, password);
      }

      const res = await login(email, password);
      setToken(res.token);
      onLogin();
    } catch (e: any) {
      Alert.alert(
        "Erro",
        e.message ?? "Credenciais inválidas. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoArea}>
          <MaterialCommunityIcons name="fire" size={72} color="#FF6B35" />
          <Text style={styles.appName}>Fire Shield</Text>
          <Text style={styles.tagline}>
            Monitoramento de Incêndios Florestais
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, mode === "login" && styles.tabActive]}
              onPress={() => setMode("login")}
            >
              <Text
                style={[
                  styles.tabText,
                  mode === "login" && styles.tabTextActive,
                ]}
              >
                Entrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, mode === "register" && styles.tabActive]}
              onPress={() => setMode("register")}
            >
              <Text
                style={[
                  styles.tabText,
                  mode === "register" && styles.tabTextActive,
                ]}
              >
                Cadastrar
              </Text>
            </TouchableOpacity>
          </View>

          {mode === "register" && (
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#999"
              returnKeyType="next"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {mode === "login" ? "Entrar" : "Criar Conta"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a2e" },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  logoArea: { alignItems: "center", marginBottom: 32 },
  appName: { fontSize: 28, fontWeight: "bold", color: "#FF6B35", marginTop: 8 },
  tagline: { fontSize: 13, color: "#aaa", marginTop: 4, textAlign: "center" },
  card: { backgroundColor: "#16213e", borderRadius: 16, padding: 24 },
  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#0f3460",
    borderRadius: 10,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  tabActive: { backgroundColor: "#FF6B35" },
  tabText: { color: "#aaa", fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  input: {
    backgroundColor: "#0f3460",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
    color: "#fff",
    marginBottom: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#FF6B35",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 4,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
