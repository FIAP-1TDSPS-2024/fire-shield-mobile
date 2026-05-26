import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SectionTitle from '../components/SectionTitle';

type Tip = {
  icon: React.ReactNode;
  title: string;
  body: string;
};

const SURVIVAL_TIPS: Tip[] = [
  {
    icon: <MaterialCommunityIcons name="face-mask" size={28} color="#555" />,
    title: 'Proteja as Vias Aéreas',
    body: 'Cubra nariz e boca com um pano úmido. Agache-se próximo ao chão onde o ar é mais limpo.',
  },
  {
    icon: <MaterialCommunityIcons name="run-fast" size={28} color="#555" />,
    title: 'Evacue Imediatamente',
    body: 'Não tente salvar pertences. Siga as rotas de fuga sinalizadas e afaste-se da direção do vento.',
  },
  {
    icon: <MaterialCommunityIcons name="car" size={28} color="#555" />,
    title: 'No Carro',
    body: 'Feche janelas e ative a recirculação do ar. Se o fogo bloquear a saída, pare em área aberta e permaneça no veículo.',
  },
  {
    icon: <Ionicons name="battery-dead-outline" size={28} color="#555" />,
    title: 'Economize Bateria',
    body: 'Deixe o celular para contatos de emergência. Informe sua localização a familiares.',
  },
];

export default function EmergencyScreen() {
  const call = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.alertBanner}>
          <MaterialCommunityIcons name="alarm-light" size={40} color="#FF6B35" />
          <Text style={styles.alertTitle}>Central de Emergência</Text>
          <Text style={styles.alertSub}>Em caso de risco imediato, ligue agora</Text>
        </View>

        <View style={styles.callRow}>
          <TouchableOpacity style={[styles.callBtn, { backgroundColor: '#E53935' }]} onPress={() => call('193')}>
            <MaterialCommunityIcons name="fire-truck" size={32} color="#fff" />
            <Text style={styles.callNumber}>193</Text>
            <Text style={styles.callLabel}>Corpo de Bombeiros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.callBtn, { backgroundColor: '#1565C0' }]} onPress={() => call('199')}>
            <Ionicons name="business" size={32} color="#fff" />
            <Text style={styles.callNumber}>199</Text>
            <Text style={styles.callLabel}>Defesa Civil</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.samuBtn} onPress={() => call('192')}>
          <MaterialCommunityIcons name="ambulance" size={32} color="#fff" />
          <View>
            <Text style={styles.samuNumber}>192 — SAMU</Text>
            <Text style={styles.samuSub}>Atendimento Médico de Urgência</Text>
          </View>
        </TouchableOpacity>

        <SectionTitle>Guia de Sobrevivência</SectionTitle>
        {SURVIVAL_TIPS.map((tip, i) => (
          <View key={i} style={styles.tipCard}>
            {tip.icon}
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
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scroll: { padding: 16 },
  alertBanner: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  alertTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  alertSub: { color: '#aaa', fontSize: 13 },
  callRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  callBtn: {
    flex: 1,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    gap: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  callNumber: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  callLabel: { fontSize: 12, color: '#ffffffcc', textAlign: 'center' },
  samuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    gap: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  samuNumber: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  samuSub: { fontSize: 12, color: '#ffffffcc' },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  tipContent: { flex: 1 },
  tipTitle: { fontSize: 14, fontWeight: 'bold', color: '#222', marginBottom: 4 },
  tipBody: { fontSize: 13, color: '#555', lineHeight: 19 },
});
