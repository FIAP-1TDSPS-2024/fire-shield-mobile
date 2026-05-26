import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  icon: string;
  message: string;
};

export default function EmptyState({ icon, message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 80 },
  icon: { fontSize: 48, marginBottom: 12 },
  message: { fontSize: 16, color: '#999' },
});
