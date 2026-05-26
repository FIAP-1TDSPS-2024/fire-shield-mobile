import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const TYPES = ['Fumaça suspeita', 'Fogo rasteiro', 'Fogo de grande proporção'] as const;
type ReportType = (typeof TYPES)[number];

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoadingLocation(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude });
      setLoadingLocation(false);
    })();
  }, []);

  const pickImage = async (source: 'camera' | 'library') => {
    const fn =
      source === 'camera'
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;
    const result = await fn({ mediaTypes: 'images', allowsEditing: true, quality: 0.7 });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!selectedType) {
      Alert.alert('Atenção', 'Selecione o tipo de ocorrência.');
      return;
    }
    if (!location) {
      Alert.alert('Atenção', 'Aguardando localização GPS.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setSelectedType(null);
    setDescription('');
    setImageUri(null);
  };

  if (submitted) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]} edges={['top']}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Alerta Enviado!</Text>
        <Text style={styles.successSub}>Obrigado por contribuir com o monitoramento.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Reportar Ocorrência</Text>
        <Text style={styles.subtitle}>Ajude a comunidade registrando focos de incêndio.</Text>

        <View style={styles.locationBox}>
          <Text style={styles.locationIcon}>📍</Text>
          {loadingLocation ? (
            <ActivityIndicator size="small" color="#FF6B35" />
          ) : location ? (
            <Text style={styles.locationText}>
              {location.lat.toFixed(5)}, {location.lon.toFixed(5)}
            </Text>
          ) : (
            <Text style={styles.locationError}>Permissão de localização negada</Text>
          )}
        </View>

        <Text style={styles.label}>Tipo de Ocorrência *</Text>
        {TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.typeBtn, selectedType === type && styles.typeBtnActive]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={[styles.typeText, selectedType === type && styles.typeTextActive]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Foto (opcional)</Text>
        <View style={styles.mediaRow}>
          <TouchableOpacity style={styles.mediaBtn} onPress={() => pickImage('camera')}>
            <Text style={styles.mediaIcon}>📷</Text>
            <Text style={styles.mediaBtnText}>Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaBtn} onPress={() => pickImage('library')}>
            <Text style={styles.mediaIcon}>🖼️</Text>
            <Text style={styles.mediaBtnText}>Galeria</Text>
          </TouchableOpacity>
        </View>
        {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.removeImage} onPress={() => setImageUri(null)}>
              <Text style={styles.removeImageText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.label}>Detalhes adicionais</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Descreva o que você está vendo..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>🚨  Enviar Alerta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centerContent: { alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  locationIcon: { fontSize: 20 },
  locationText: { fontSize: 13, color: '#555', fontFamily: 'monospace' },
  locationError: { fontSize: 13, color: '#E53935' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 4 },
  typeBtn: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  typeBtnActive: { borderColor: '#FF6B35', backgroundColor: '#fff4f0' },
  typeText: { fontSize: 14, color: '#555', fontWeight: '500' },
  typeTextActive: { color: '#FF6B35', fontWeight: 'bold' },
  mediaRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  mediaBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  mediaIcon: { fontSize: 24, marginBottom: 4 },
  mediaBtnText: { fontSize: 13, color: '#666' },
  imagePreviewContainer: { position: 'relative', marginBottom: 16 },
  imagePreview: { width: '100%', height: 200, borderRadius: 12 },
  removeImage: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#000000aa',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  textarea: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitBtn: {
    backgroundColor: '#E53935',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  successIcon: { fontSize: 64, marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: 'bold', color: '#1b5e20', marginBottom: 8 },
  successSub: { fontSize: 15, color: '#555', textAlign: 'center', paddingHorizontal: 32 },
});
