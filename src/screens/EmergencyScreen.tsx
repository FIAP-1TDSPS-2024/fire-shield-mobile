import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionTitle from "../components/SectionTitle";

const SURVIVAL_TIPS = [
  {
    icon: "😷",
    title: "Proteja as Vias Aéreas",
    body: "Cubra nariz e boca com um pano úmido. Agache-se próximo ao chão onde o ar é mais limpo.",
  },
  {
    icon: "🏃",
    title: "Evacue Imediatamente",
    body: "Não tente salvar pertences. Siga as rotas de fuga sinalizadas e afaste-se da direção do vento.",
  },
  {
    icon: "🚗",
    title: "No Carro",
    body: "Feche janelas e ative a recirculação do ar. Se o fogo bloquear a saída, pare em área aberta e permaneça no veículo.",
  },
  {
    icon: "📵",
    title: "Economize Bateria",
    body: "Deixe o celular para contatos de emergência. Informe sua localização a familiares.",
  },
];

export default function EmergencyScreen() {
  const call = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.alertBanner}>
          <Text style={styles.alertIcon}>🚨</Text>
          <Text style={styles.alertTitle}>Central de Emergência</Text>
          <Text style={styles.alertSub}>
            Em caso de risco imediato, ligue agora
          </Text>
        </View>

        <View style={styles.callRow}>
          <TouchableOpacity
            style={[styles.callBtn, { backgroundColor: "#E53935" }]}
            onPress={() => call("193")}
          >
            <Text style={styles.callIcon}>🚒</Text>
            <Text style={styles.callNumber}>193</Text>
            <Text style={styles.callLabel}>Corpo de Bombeiros</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.callBtn, { backgroundColor: "#1565C0" }]}
            onPress={() => call("199")}
          >
            <Text style={styles.callIcon}>🏛️</Text>
            <Text style={styles.callNumber}>199</Text>
            <Text style={styles.callLabel}>Defesa Civil</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.samuBtn} onPress={() => call("192")}>
          <Text style={styles.samuIcon}>🚑</Text>
          <View>
            <Text style={styles.samuNumber}>192 — SAMU</Text>
            <Text style={styles.samuSub}>Atendimento Médico de Urgência</Text>
          </View>
        </TouchableOpacity>

        <SectionTitle>Guia de Sobrevivência</SectionTitle>
        {SURVIVAL_TIPS.map((tip, i) => (
          <View key={i} style={styles.tipCard}>
            <Text style={styles.tipIcon}>{tip.icon}</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipBody}>{tip.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scroll: { padding: 16 },
  alertBanner: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  alertIcon: { fontSize: 36, marginBottom: 8 },
  alertTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  alertSub: { color: "#aaa", fontSize: 13, marginTop: 4 },
  callRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  callBtn: {
    flex: 1,
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  callIcon: { fontSize: 28, marginBottom: 4 },
  callNumber: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  callLabel: {
    fontSize: 12,
    color: "#ffffffcc",
    marginTop: 2,
    textAlign: "center",
  },
  samuBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E7D32",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    gap: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  samuIcon: { fontSize: 28 },
  samuNumber: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  samuSub: { fontSize: 12, color: "#ffffffcc" },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  tipIcon: { fontSize: 28 },
  tipContent: { flex: 1 },
  tipTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  tipBody: { fontSize: 13, color: "#555", lineHeight: 19 },
  shelterCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  shelterLeft: { marginRight: 12 },
  shelterIcon: { fontSize: 24 },
  shelterInfo: { flex: 1 },
  shelterName: { fontSize: 14, fontWeight: "600", color: "#222" },
  shelterAddress: { fontSize: 12, color: "#888", marginTop: 2 },
  shelterDistance: {
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  shelterDistanceText: { fontSize: 12, fontWeight: "bold", color: "#2E7D32" },
});
