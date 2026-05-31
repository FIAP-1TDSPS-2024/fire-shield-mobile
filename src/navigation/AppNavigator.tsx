import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AuthScreen from "../screens/AuthScreen";
import MapScreen from "../screens/MapScreen";
import OccurrenceDetailScreen from "../screens/OccurrenceDetailScreen";
import ReportScreen from "../screens/ReportScreen";
import EmergencyScreen from "../screens/EmergencyScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { clearToken } from "../services/api";
import { getOcorrencias } from "../services/occurence";
import { getMeuPerfil } from "../services/profile";
import { Occurrence, UrgencyLevel, User } from "../types";

const Tab = createBottomTabNavigator();

const VALID_URGENCY = new Set<string>(["alert", "severe", "critical"]);
function toUrgency(value: string): UrgencyLevel {
  return VALID_URGENCY.has(value) ? (value as UrgencyLevel) : "alert";
}

function MainTabs({
  occurrences,
  user,
  onSelectOccurrence,
  onLogout,
  unreadCount,
  onUnreadCountChange,
}: {
  occurrences: Occurrence[];
  user: User;
  onSelectOccurrence: (id: string) => void;
  onLogout: () => void;
  unreadCount: number;
  onUnreadCountChange: (count: number) => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { height: 58 + insets.bottom, paddingBottom: insets.bottom },
        ],
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: { fontSize: 11, marginBottom: 4 },
      }}
    >
      <Tab.Screen
        name="Mapa"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => (
          <MapScreen
            occurrences={occurrences}
            onSelectOccurrence={(o) => onSelectOccurrence(o.id)}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Reportar"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "megaphone" : "megaphone-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Emergência"
        component={EmergencyScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "alarm-light" : "alarm-light-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Alertas"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: { backgroundColor: "#E53935" },
        }}
      >
        {() => (
          <NotificationsScreen
            onSelectOccurrence={onSelectOccurrence}
            onUnreadCountChange={onUnreadCountChange}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => <ProfileScreen user={user} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState<
    string | null
  >(null);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [user, setUser] = useState<User>({
    nome: "",
    email: "",
    raioAlertasKm: 30,
  });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!authenticated) return;

    getMeuPerfil()
      .then(setUser)
      .catch(() => {});

    getOcorrencias()
      .then((items) =>
        setOccurrences(
          items.map((o) => ({
            id: o.id,
            latitude: o.latitude,
            longitude: o.longitude,
            urgency: toUrgency(o.urgency),
            title: o.title,
            description: o.description,
            reportedAt: o.reportedAt,
            area: o.area,
            distance: o.distance,
            firefightersDispatched: o.firefightersDispatched,
            reportedBy: o.reportedBy,
          })),
        ),
      )
      .catch(() => {});
  }, [authenticated]);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    clearToken();
    setAuthenticated(false);
    setUser({ nome: "", email: "", raioAlertasKm: 30 });
    setOccurrences([]);
    setUnreadCount(0);
    setSelectedOccurrenceId(null);
  };

  const selectedOccurrence = selectedOccurrenceId
    ? (occurrences.find((o) => o.id === selectedOccurrenceId) ?? null)
    : null;

  if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthScreen onLogin={handleLogin} />
      </NavigationContainer>
    );
  }

  if (selectedOccurrence) {
    return (
      <NavigationContainer>
        <OccurrenceDetailScreen
          occurrence={selectedOccurrence}
          onBack={() => setSelectedOccurrenceId(null)}
        />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <MainTabs
        occurrences={occurrences}
        user={user}
        onSelectOccurrence={setSelectedOccurrenceId}
        onLogout={handleLogout}
        unreadCount={unreadCount}
        onUnreadCountChange={setUnreadCount}
      />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#1a1a2e",
    borderTopColor: "#0f3460",
    borderTopWidth: 1,
    paddingTop: 4,
  },
});
