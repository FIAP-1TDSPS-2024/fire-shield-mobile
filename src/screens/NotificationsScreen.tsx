import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { requestLocationPermission } from "../utils/location";
import { getNotificacoes } from "../services/notification";
import { Notification } from "../types";
import EmptyState from "../components/EmptyState";

type Props = {
  onSelectOccurrence: (id: string) => void;
  onUnreadCountChange: (count: number) => void;
};

export default function NotificationsScreen({
  onSelectOccurrence,
  onUnreadCountChange,
}: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const granted = await requestLocationPermission();
      let lat = -15.7901;
      let lon = -47.9192;

      if (granted) {
        const loc = await Location.getCurrentPositionAsync({});
        lat = loc.coords.latitude;
        lon = loc.coords.longitude;
      }

      const items = await getNotificacoes(lat, lon);
      const mapped: Notification[] = items.map((item, index) => ({
        id: `${item.idOcorrencia}-${index}`,
        occurrenceId: item.idOcorrencia,
        title: item.titulo,
        body: item.mensagem,
        receivedAt: new Date().toISOString(),
        read: item.lida,
        tempoAtras: item.tempoAtras,
      }));
      setNotifications(mapped);
      onUnreadCountChange(mapped.filter((n) => !n.read).length);
    } catch {
      // mantém lista atual em caso de erro
    } finally {
      setLoading(false);
    }
  }, [onUnreadCountChange]);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [fetchNotifications]),
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    onUnreadCountChange(0);
  };

  const handlePress = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    );
    onUnreadCountChange(
      notifications.filter((n) => !n.read && n.id !== notification.id).length,
    );
    onSelectOccurrence(notification.occurrenceId);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.item, !item.read && styles.itemUnread]}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.dot,
          { backgroundColor: item.read ? "#ccc" : "#E53935" },
        ]}
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text
            style={[styles.itemTitle, !item.read && styles.itemTitleUnread]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={styles.itemTime}>{item.tempoAtras ?? ""}</Text>
        </View>
        <Text style={styles.itemBody} numberOfLines={2}>
          {item.body}
        </Text>
        {!item.read && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>Não lida</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Notificações</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} não lida(s)</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
            <Text style={styles.markAllText}>Marcar todas como lidas</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && notifications.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListEmptyComponent={
            <EmptyState
              icon={
                <Ionicons name="notifications-outline" size={48} color="#ccc" />
              }
              message="Nenhuma notificação"
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a1a2e" },
  unreadCount: { fontSize: 13, color: "#E53935", marginTop: 2 },
  markAllBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 4,
  },
  markAllText: { fontSize: 12, color: "#666" },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  itemUnread: { borderLeftWidth: 3, borderLeftColor: "#E53935" },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
  itemContent: { flex: 1 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemTitle: { flex: 1, fontSize: 14, color: "#555", marginRight: 8 },
  itemTitleUnread: { fontWeight: "bold", color: "#222" },
  itemTime: { fontSize: 11, color: "#aaa" },
  itemBody: { fontSize: 13, color: "#777", lineHeight: 18 },
  unreadBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FFEBEE",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },
  unreadBadgeText: { fontSize: 11, color: "#E53935", fontWeight: "bold" },
});
