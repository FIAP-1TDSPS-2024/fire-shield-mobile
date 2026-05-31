import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import * as Location from "expo-location";
import { requestLocationPermission } from "../utils/location";
import { criarOcorrencia } from "../services/occurence";

const TYPES = [
  "Fumaça suspeita",
  "Fogo rasteiro",
  "Fogo de grande proporção",
] as const;
type ReportType = (typeof TYPES)[number];

const TYPE_TO_URGENCY: Record<ReportType, string> = {
  "Fumaça suspeita": "alert",
  "Fogo rasteiro": "alert",
  "Fogo de grande proporção": "critical",
};

const TYPE_TO_AREA: Record<ReportType, number> = {
  "Fumaça suspeita": 0,
  "Fogo rasteiro": 5,
  "Fogo de grande proporção": 20,
};

const TYPE_TO_DISTANCE: Record<ReportType, number> = {
  "Fumaça suspeita": 0,
  "Fogo rasteiro": 1,
  "Fogo de grande proporção": 5,
};

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLocation(null);
      setLoadingLocation(true);
      (async () => {
        const granted = await requestLocationPermission();
        if (!granted) {
          setLoadingLocation(false);
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude });
        setLoadingLocation(false);
      })();
    }, []),
  );

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert("Atenção", "Selecione o tipo de ocorrência.");
      return;
    }
    if (!location) {
      Alert.alert("Atenção", "Aguardando localização GPS.");
      return;
    }

    setSubmitting(true);
    try {
      await criarOcorrencia({
        latitude: location.lat,
        longitude: location.lon,
        tipoOcorrencia: selectedType,
        detalhesAdicionais: description,
        urgencia: TYPE_TO_URGENCY[selectedType],
        area: TYPE_TO_AREA[selectedType],
        distancia: TYPE_TO_DISTANCE[selectedType],
      });
      setSubmitted(true);
      setSelectedType(null);
      setDescription("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (e: any) {
      Alert.alert("Erro", e.message ?? "Não foi possível enviar o alerta.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <SafeAreaView
        style={[styles.container, styles.centerContent]}
        edges={["top"]}
      >
        <Ionicons name="checkmark-circle" size={72} color="#2E7D32" />
        <Text style={styles.successTitle}>Alerta Enviado!</Text>
        <Text style={styles.successSub}>
          Obrigado por contribuir com o monitoramento.
        </Text>
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
        <Text style={styles.title}>Reportar Ocorrência</Text>
        <Text style={styles.subtitle}>
          Ajude a comunidade registrando focos de incêndio.
        </Text>

        <View style={styles.locationBox}>
          <Ionicons name="location-outline" size={20} color="#FF6B35" />
          {loadingLocation ? (
            <ActivityIndicator size="small" color="#FF6B35" />
          ) : location ? (
            <Text style={styles.locationText}>
              {location.lat.toFixed(5)}, {location.lon.toFixed(5)}
            </Text>
          ) : (
            <Text style={styles.locationError}>
              Permissão de localização negada
            </Text>
          )}
        </View>

        <Text style={styles.label}>Tipo de Ocorrência *</Text>
        {TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeBtn,
              selectedType === type && styles.typeBtnActive,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === type && styles.typeTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Detalhes adicionais</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Descreva o que você está vendo..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          blurOnSubmit
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialCommunityIcons
                name="alarm-light"
                size={20}
                color="#fff"
              />
              <Text style={styles.submitText}>Enviar Alerta</Text>
            </>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  centerContent: { alignItems: "center", justifyContent: "center" },
  scroll: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  locationText: { fontSize: 13, color: "#555", fontFamily: "monospace" },
  locationError: { fontSize: 13, color: "#E53935" },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 4,
  },
  typeBtn: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  typeBtnActive: { borderColor: "#FF6B35", backgroundColor: "#fff4f0" },
  typeText: { fontSize: 14, color: "#555", fontWeight: "500" },
  typeTextActive: { color: "#FF6B35", fontWeight: "bold" },
  textarea: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: "#333",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#E53935",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  successTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1b5e20",
    marginTop: 16,
    marginBottom: 8,
  },
  successSub: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
