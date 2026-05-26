import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { URGENCY_COLOR, URGENCY_LABEL } from '../constants/urgency';
import InfoCard from '../components/InfoCard';
import SectionTitle from '../components/SectionTitle';
import { Occurrence } from '../types';

type Props = {
  occurrence: Occurrence;
  onBack: () => void;
};

export default function OccurrenceDetailScreen({ occurrence, onBack }: Props) {
  const color = URGENCY_COLOR[occurrence.urgency];
  const date = new Date(occurrence.reportedAt).toLocaleString('pt-BR');

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#ffffffcc" />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.urgencyBadge}>{URGENCY_LABEL[occurrence.urgency].toUpperCase()}</Text>
        <Text style={styles.headerTitle}>{occurrence.title}</Text>
        <Text style={styles.headerSub}>Reportado em {date}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.description}>{occurrence.description}</Text>

        <SectionTitle>Informações Logísticas</SectionTitle>
        <View style={styles.grid}>
          <InfoCard
            icon={<Ionicons name="location-outline" size={24} color="#666" />}
            label="Distância"
            value={`${occurrence.distance} km`}
          />
          <InfoCard
            icon={<MaterialCommunityIcons name="tree" size={24} color="#666" />}
            label="Área Afetada"
            value={`${occurrence.area} ha`}
          />
        </View>

        <View style={[styles.dispatchBanner, { backgroundColor: occurrence.firefightersDispatched ? '#1b5e2033' : '#b7000033' }]}>
          <MaterialCommunityIcons
            name={occurrence.firefightersDispatched ? 'fire-truck' : 'timer-sand'}
            size={32}
            color={occurrence.firefightersDispatched ? '#1b5e20' : '#b71c1c'}
          />
          <View>
            <Text style={[styles.dispatchTitle, { color: occurrence.firefightersDispatched ? '#1b5e20' : '#b71c1c' }]}>
              {occurrence.firefightersDispatched ? 'Bombeiros Acionados' : 'Aguardando Despacho'}
            </Text>
            <Text style={styles.dispatchSub}>
              {occurrence.firefightersDispatched
                ? 'Equipes já estão no local'
                : 'Nenhuma equipe despachada ainda'}
            </Text>
          </View>
        </View>

        <SectionTitle>Condições Climáticas</SectionTitle>
        <View style={styles.grid}>
          <InfoCard
            icon={<Ionicons name="thermometer-outline" size={24} color="#666" />}
            label="Temperatura"
            value={`${occurrence.weather.temperature}°C`}
          />
          <InfoCard
            icon={<Ionicons name="water-outline" size={24} color="#666" />}
            label="Umidade"
            value={`${occurrence.weather.humidity}%`}
          />
          <InfoCard
            icon={<MaterialCommunityIcons name="weather-windy" size={24} color="#666" />}
            label="Vento"
            value={`${occurrence.weather.windSpeed} km/h`}
          />
          <InfoCard
            icon={<Ionicons name="compass-outline" size={24} color="#666" />}
            label="Direção"
            value={occurrence.weather.windDirection}
          />
        </View>

        <SectionTitle>Reportado por</SectionTitle>
        <View style={styles.reporterRow}>
          <Ionicons name="person-circle-outline" size={32} color="#888" />
          <Text style={styles.reporterName}>{occurrence.reportedBy}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 20, paddingTop: 12 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  backText: { color: '#ffffffcc', fontSize: 15 },
  urgencyBadge: { color: '#fff', fontWeight: 'bold', fontSize: 13, letterSpacing: 1, marginBottom: 4 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerSub: { color: '#ffffffaa', fontSize: 13, marginTop: 4 },
  scroll: { padding: 16 },
  description: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  dispatchBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  dispatchTitle: { fontSize: 15, fontWeight: 'bold' },
  dispatchSub: { fontSize: 13, color: '#666', marginTop: 2 },
  reporterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    gap: 12,
    marginBottom: 20,
  },
  reporterName: { fontSize: 15, fontWeight: '600', color: '#333' },
});
