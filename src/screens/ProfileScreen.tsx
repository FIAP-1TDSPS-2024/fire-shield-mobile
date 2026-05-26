import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { MOCK_USER, MOCK_USER_REPORTS } from '../data/mockData';

type Props = {
  onLogout: () => void;
};

export default function ProfileScreen({ onLogout }: Props) {
  const [name, setName] = useState(MOCK_USER.name);
  const [editing, setEditing] = useState(false);
  const [alertRadius, setAlertRadius] = useState(MOCK_USER.alertRadiusKm);

  const handleSave = () => {
    setEditing(false);
    Alert.alert('Salvo', 'Dados atualizados com sucesso.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </Text>
          </View>
          {editing ? (
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              autoFocus
            />
          ) : (
            <Text style={styles.profileName}>{name}</Text>
          )}
          <Text style={styles.profileEmail}>{MOCK_USER.email}</Text>
          <Text style={styles.profileLocation}>
            {MOCK_USER.city}, {MOCK_USER.state}
          </Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={editing ? handleSave : () => setEditing(true)}
          >
            <Text style={styles.editBtnText}>{editing ? '💾  Salvar' : '✏️  Editar Perfil'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔔 Raio de Alertas</Text>
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
            Você será notificado de incêndios em até {Math.round(alertRadius)} km de você.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Meus Reportes</Text>
          {MOCK_USER_REPORTS.length === 0 ? (
            <Text style={styles.emptyReports}>Nenhum reporte enviado ainda.</Text>
          ) : (
            MOCK_USER_REPORTS.map((report) => (
              <View key={report.id} style={styles.reportItem}>
                <View style={styles.reportIcon}>
                  <Text style={{ fontSize: 20 }}>
                    {report.type === 'Fogo de grande proporção' ? '🔥' : report.type === 'Fogo rasteiro' ? '🌿' : '💨'}
                  </Text>
                </View>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportType}>{report.type}</Text>
                  <Text style={styles.reportDate}>
                    {new Date(report.reportedAt).toLocaleDateString('pt-BR')}
                  </Text>
                  {report.description ? (
                    <Text style={styles.reportDesc} numberOfLines={1}>{report.description}</Text>
                  ) : null}
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{MOCK_USER_REPORTS.length}</Text>
            <Text style={styles.statLabel}>Reportes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>🏅</Text>
            <Text style={styles.statLabel}>Colaborador</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Dias ativo</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { padding: 16 },
  profileHeader: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  nameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B35',
    marginBottom: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    minWidth: 180,
  },
  profileEmail: { fontSize: 13, color: '#aaa', marginBottom: 2 },
  profileLocation: { fontSize: 13, color: '#888', marginBottom: 16 },
  editBtn: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#222', marginBottom: 12 },
  radiusValue: { fontSize: 28, fontWeight: 'bold', color: '#FF6B35', textAlign: 'center' },
  slider: { width: '100%', marginVertical: 4 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabel: { fontSize: 11, color: '#aaa' },
  radiusHint: { fontSize: 12, color: '#777', textAlign: 'center', marginTop: 8 },
  emptyReports: { fontSize: 14, color: '#aaa', textAlign: 'center', padding: 8 },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInfo: { flex: 1 },
  reportType: { fontSize: 14, fontWeight: '600', color: '#333' },
  reportDate: { fontSize: 12, color: '#888', marginTop: 2 },
  reportDesc: { fontSize: 12, color: '#aaa', marginTop: 1 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#1a1a2e', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#888' },
  logoutBtn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E53935',
    marginBottom: 20,
  },
  logoutText: { color: '#E53935', fontWeight: 'bold', fontSize: 15 },
});
