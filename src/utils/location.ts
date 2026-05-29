import { Alert, Linking } from "react-native";
import * as Location from "expo-location";

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === "granted") return true;

  Alert.alert(
    "Permissão de localização",
    "Ative a localização nas configurações do dispositivo para usar este recurso.",
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Abrir Configurações", onPress: () => Linking.openSettings() },
    ],
  );
  return false;
}
