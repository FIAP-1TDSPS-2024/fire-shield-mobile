export type UrgencyLevel = 'alert' | 'severe' | 'critical';

export interface Occurrence {
  id: string;
  latitude: number;
  longitude: number;
  urgency: UrgencyLevel;
  title: string;
  description: string;
  reportedAt: string;
  area: number; // hectares
  distance: number; // km from user
  firefightersDispatched: boolean;
  weather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
  };
  reportedBy: string;
}

export interface Notification {
  id: string;
  occurrenceId: string;
  title: string;
  body: string;
  receivedAt: string;
  read: boolean;
}

export interface UserReport {
  id: string;
  type: 'Fumaça suspeita' | 'Fogo rasteiro' | 'Fogo de grande proporção';
  latitude: number;
  longitude: number;
  description: string;
  reportedAt: string;
  imageUri?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  alertRadiusKm: number;
  avatarUri?: string;
}
