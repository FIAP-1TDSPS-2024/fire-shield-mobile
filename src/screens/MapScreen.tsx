import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { requestLocationPermission } from '../utils/location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_OCCURRENCES } from '../data/mockData';
import { URGENCY_COLOR, URGENCY_LABEL } from '../constants/urgency';
import { Occurrence, UrgencyLevel } from '../types';
import OccurrenceMapMarker from '../components/OccurrenceMapMarker';

type Filter = 'all' | UrgencyLevel;

type Props = {
  onSelectOccurrence: (occurrence: Occurrence) => void;
};

export default function MapScreen({ onSelectOccurrence }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const granted = await requestLocationPermission();
      if (!granted) return;
      const loc = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }, 800);
    })();
  }, []);

  const filtered = MOCK_OCCURRENCES.filter((o) => {
    const matchesFilter = filter === 'all' || o.urgency === filter;
    const matchesSearch = o.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: -15.7901,
          longitude: -47.9192,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
        {filtered.map((occurrence) => (
          <OccurrenceMapMarker
            key={occurrence.id}
            occurrence={occurrence}
            onPress={onSelectOccurrence}
          />
        ))}
      </MapView>

      <SafeAreaView edges={['top']} style={styles.overlay}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar ocorrência..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {(['all', 'alert', 'severe', 'critical'] as Filter[]).map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              {f !== 'all' && (
                <View style={[styles.dot, { backgroundColor: URGENCY_COLOR[f as UrgencyLevel] }]} />
              )}
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f === 'all' ? 'Todos' : URGENCY_LABEL[f as UrgencyLevel]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legenda</Text>
        {(['alert', 'severe', 'critical'] as UrgencyLevel[]).map((u) => (
          <View key={u} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: URGENCY_COLOR[u] }]} />
            <Text style={styles.legendText}>{URGENCY_LABEL[u]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#333' },
  filterRow: { paddingBottom: 8, gap: 8 },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  filterChipActive: { backgroundColor: '#1a1a2e' },
  filterText: { fontSize: 13, color: '#333', fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legend: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: '#ffffffee',
    borderRadius: 12,
    padding: 12,
    elevation: 4,
  },
  legendTitle: { fontSize: 12, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  legendText: { fontSize: 12, color: '#555' },
});
