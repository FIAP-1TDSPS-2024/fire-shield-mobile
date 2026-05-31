import { request } from "./api";

export interface OccurrenceApiItem {
  id: string;
  latitude: number;
  longitude: number;
  urgency: string;
  title: string;
  description: string;
  reportedAt: string;
  area: number;
  distance: number;
  firefightersDispatched: boolean;
  reportedBy: string;
}

export const getOcorrencias = (): Promise<OccurrenceApiItem[]> => {
  return request<OccurrenceApiItem[]>("/ocorrencias");
};

export interface CreateOccurrencePayload {
  latitude: number;
  longitude: number;
  tipoOcorrencia: string;
  detalhesAdicionais: string;
  urgencia: string;
  area: number;
  distancia: number;
}

export const criarOcorrencia = (
  data: CreateOccurrencePayload,
): Promise<OccurrenceApiItem> => {
  return request<OccurrenceApiItem>("/ocorrencias", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
