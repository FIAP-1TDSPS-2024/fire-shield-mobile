import React from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  children: string;
};

export default function SectionTitle({ children }: Props) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
    marginTop: 4,
  },
});
