import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/AuthScreen";
import MapScreen from "../screens/MapScreen";
import OccurrenceDetailScreen from "../screens/OccurrenceDetailScreen";
import ReportScreen from "../screens/ReportScreen";
import EmergencyScreen from "../screens/EmergencyScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MOCK_OCCURRENCES, MOCK_NOTIFICATIONS } from "../data/mockData";
import { Occurrence } from "../types";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 24 : 20, opacity: focused ? 1 : 0.5 }}>
      {icon}
    </Text>
  );
}

function MainTabs({
  onSelectOccurrence,
  onLogout,
  unreadCount,
}: {
  onSelectOccurrence: (id: string) => void;
  onLogout: () => void;
  unreadCount: number;
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
          tabBarIcon: ({ focused }) => <TabIcon icon="🗺️" focused={focused} />,
        }}
      >
        {() => (
          <MapScreen onSelectOccurrence={(o) => onSelectOccurrence(o.id)} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Reportar"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="📢" focused={focused} />,
        }}
      />

      <Tab.Screen
        name="Emergência"
        component={EmergencyScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🚨" focused={focused} />,
        }}
      />

      <Tab.Screen
        name="Alertas"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="🔔" focused={focused} />,
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
          tabBarBadgeStyle: { backgroundColor: "#E53935" },
        }}
      >
        {() => <NotificationsScreen onSelectOccurrence={onSelectOccurrence} />}
      </Tab.Screen>

      <Tab.Screen
        name="Perfil"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} />,
        }}
      >
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState<
    string | null
  >(null);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  const handleSelectOccurrence = (id: string) => {
    setSelectedOccurrenceId(id);
  };

  const selectedOccurrence = selectedOccurrenceId
    ? MOCK_OCCURRENCES.find((o) => o.id === selectedOccurrenceId)
    : null;

  if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthScreen onLogin={() => setAuthenticated(true)} />
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
        onSelectOccurrence={handleSelectOccurrence}
        onLogout={() => setAuthenticated(false)}
        unreadCount={unreadCount}
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
