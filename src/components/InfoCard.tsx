import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export default function InfoCard({ icon, label, value }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  iconWrapper: { marginBottom: 6 },
  label: { fontSize: 12, color: '#888', marginBottom: 2 },
  value: { fontSize: 16, fontWeight: 'bold', color: '#222' },
});
