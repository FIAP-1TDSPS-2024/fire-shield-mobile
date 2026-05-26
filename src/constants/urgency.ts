import { UrgencyLevel } from '../types';

export const URGENCY_COLOR: Record<UrgencyLevel, string> = {
  alert: '#FFC107',
  severe: '#FF6B35',
  critical: '#E53935',
};

export const URGENCY_LABEL: Record<UrgencyLevel, string> = {
  alert: 'Alerta',
  severe: 'Grave',
  critical: 'Crítico',
};

export const URGENCY_LABEL_WITH_ICON: Record<UrgencyLevel, string> = {
  alert: '⚠️ Alerta',
  severe: '🔶 Grave',
  critical: '🔴 Crítico',
};
