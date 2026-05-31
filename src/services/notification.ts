import { request } from "./api";

export interface NotificacaoApiItem {
  idOcorrencia: string;
  titulo: string;
  mensagem: string;
  distanciaKm: number;
  tempoAtras: string;
  nivelUrgencia: string;
  lida: boolean;
}

export const getNotificacoes = (
  lat: number,
  lon: number,
): Promise<NotificacaoApiItem[]> => {
  return request<NotificacaoApiItem[]>(`/notificacoes?lat=${lat}&lon=${lon}`);
};
