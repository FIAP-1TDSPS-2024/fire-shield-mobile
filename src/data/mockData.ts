import { Occurrence, Notification, UserReport, User } from "../types";

export const MOCK_USER: User = {
  id: "1",
  name: "João Silva",
  email: "joao.silva@email.com",
  city: "Brasília",
  state: "DF",
  alertRadiusKm: 30,
};

export const MOCK_OCCURRENCES: Occurrence[] = [
  {
    id: "1",
    latitude: -15.7801,
    longitude: -47.9292,
    urgency: "critical",
    title: "Incêndio no Parque Nacional",
    description:
      "Grande foco de incêndio detectado no setor noroeste do parque. Risco de expansão elevado devido aos ventos.",
    reportedAt: "2026-05-26T08:30:00Z",
    area: 120,
    distance: 5.2,
    firefightersDispatched: true,
    weather: {
      temperature: 34,
      humidity: 18,
      windSpeed: 28,
      windDirection: "Nordeste",
    },
    reportedBy: "Sistema Automático",
  },
  {
    id: "2",
    latitude: -15.8201,
    longitude: -47.8892,
    urgency: "severe",
    title: "Queimada na Reserva Ecológica",
    description:
      "Fogo de médio porte avançando em direção à reserva. Equipes em alerta.",
    reportedAt: "2026-05-26T10:15:00Z",
    area: 45,
    distance: 12.7,
    firefightersDispatched: true,
    weather: {
      temperature: 31,
      humidity: 22,
      windSpeed: 18,
      windDirection: "Leste",
    },
    reportedBy: "Carlos Mendes",
  },
  {
    id: "3",
    latitude: -15.7501,
    longitude: -47.9592,
    urgency: "alert",
    title: "Fumaça suspeita - Área Rural",
    description:
      "Fumaça detectada por moradores na região rural. Aguardando confirmação.",
    reportedAt: "2026-05-26T11:45:00Z",
    area: 8,
    distance: 22.3,
    firefightersDispatched: false,
    weather: {
      temperature: 29,
      humidity: 25,
      windSpeed: 12,
      windDirection: "Sul",
    },
    reportedBy: "Ana Paula",
  },
  {
    id: "4",
    latitude: -15.8501,
    longitude: -47.9092,
    urgency: "critical",
    title: "Incêndio Florestal - Cerrado",
    description:
      "Incêndio de grandes proporções atingindo área de cerrado nativo. Situação crítica.",
    reportedAt: "2026-05-26T07:00:00Z",
    area: 280,
    distance: 8.9,
    firefightersDispatched: true,
    weather: {
      temperature: 36,
      humidity: 15,
      windSpeed: 32,
      windDirection: "Noroeste",
    },
    reportedBy: "Sistema Automático",
  },
  {
    id: "5",
    latitude: -15.7301,
    longitude: -47.8692,
    urgency: "alert",
    title: "Fogo Rasteiro - Margem de Rodovia",
    description:
      "Pequeno foco nas margens da BR-020. Sem risco imediato para áreas habitadas.",
    reportedAt: "2026-05-26T13:00:00Z",
    area: 3,
    distance: 35.1,
    firefightersDispatched: false,
    weather: {
      temperature: 28,
      humidity: 30,
      windSpeed: 10,
      windDirection: "Oeste",
    },
    reportedBy: "Roberto Lima",
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    occurrenceId: "1",
    title: "Incêndio Crítico Próximo!",
    body: "Novo foco crítico registrado a 5,2 km de você no Parque Nacional.",
    receivedAt: "2026-05-26T08:35:00Z",
    read: false,
  },
  {
    id: "2",
    occurrenceId: "4",
    title: "Alerta de Incêndio",
    body: "Foco de incêndio de grande proporção detectado a 8,9 km de você.",
    receivedAt: "2026-05-26T07:05:00Z",
    read: false,
  },
  {
    id: "3",
    occurrenceId: "2",
    title: "Atualização de Ocorrência",
    body: "Bombeiros foram acionados para o foco na Reserva Ecológica a 12,7 km.",
    receivedAt: "2026-05-26T10:20:00Z",
    read: true,
  },
  {
    id: "4",
    occurrenceId: "3",
    title: "Novo Aviso na Sua Região",
    body: "Fumaça suspeita reportada por moradores a 22,3 km de você.",
    receivedAt: "2026-05-26T11:50:00Z",
    read: true,
  },
  {
    id: "5",
    occurrenceId: "5",
    title: "Foco Monitorado",
    body: "Fogo rasteiro identificado na BR-020, a 35 km da sua localização.",
    receivedAt: "2026-05-26T13:05:00Z",
    read: true,
  },
];

export const MOCK_USER_REPORTS: UserReport[] = [
  {
    id: "1",
    type: "Fumaça suspeita",
    latitude: -15.7901,
    longitude: -47.9192,
    description: "Avistei fumaça densa vindo da mata ao leste da estrada.",
    reportedAt: "2026-05-24T15:30:00Z",
  },
  {
    id: "2",
    type: "Fogo rasteiro",
    latitude: -15.8101,
    longitude: -47.9392,
    description: "Fogo pequeno próximo à estrada de terra.",
    reportedAt: "2026-05-20T09:00:00Z",
  },
];
