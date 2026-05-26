import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  icon: React.ReactNode;
  message: string;
};

export default function EmptyState({ icon, message }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 80 },
  iconWrapper: { marginBottom: 12 },
  message: { fontSize: 16, color: '#999' },
});
