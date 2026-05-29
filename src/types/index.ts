export type UrgencyLevel = "alert" | "severe" | "critical";

export interface Occurrence {
  id: string;
  latitude: number;
  longitude: number;
  urgency: UrgencyLevel;
  title: string;
  description: string;
  reportedAt: string;
  area: number;
  distance: number;
  firefightersDispatched: boolean;
  reportedBy: string;
}

export interface Notification {
  id: string;
  occurrenceId: string;
  title: string;
  body: string;
  receivedAt: string;
  read: boolean;
  tempoAtras?: string;
}

export interface UserReport {
  id: string;
  type: "Fumaça suspeita" | "Fogo rasteiro" | "Fogo de grande proporção";
  latitude: number;
  longitude: number;
  description: string;
  reportedAt: string;
  imageUri?: string;
}

export interface User {
  nome: string;
  email: string;
  localidade?: string;
  raioAlertasKm: number;
}
