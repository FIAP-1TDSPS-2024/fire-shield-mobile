const BASE_URL = 'https://app-fire-shield.azurewebsites.net/api';

let authToken: string | null = null;

export function setToken(token: string) {
  authToken = token;
}

export function clearToken() {
  authToken = null;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(options?.headers as Record<string, string> | undefined),
  };

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    try {
      const json = JSON.parse(text);
      throw new Error(json.message || `Erro ${response.status}`);
    } catch (e) {
      if (e instanceof SyntaxError) throw new Error(text || `Erro ${response.status}`);
      throw e;
    }
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
  role: string;
}

export interface RegistrarResponse {
  message: string;
  id: string;
}

export function login(email: string, senha: string): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}

export function registrar(nome: string, email: string, senha: string): Promise<RegistrarResponse> {
  return request<RegistrarResponse>('/auth/registrar', {
    method: 'POST',
    body: JSON.stringify({ nome, email, senha }),
  });
}

// ── Perfil ────────────────────────────────────────────────────────────────────

export interface PerfilResponse {
  nome: string;
  email: string;
  localidade?: string;
  raioAlertasKm: number;
}

export function getMeuPerfil(): Promise<PerfilResponse> {
  return request<PerfilResponse>('/usuarios/meu-perfil');
}

export function editarPerfil(nome: string, localidade: string, raioAlertasKm: number): Promise<void> {
  return request<void>('/usuarios/editar-perfil', {
    method: 'PUT',
    body: JSON.stringify({ nome, localidade, raioAlertasKm }),
  });
}

// ── Ocorrências ───────────────────────────────────────────────────────────────

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

export function getOcorrencias(): Promise<OccurrenceApiItem[]> {
  return request<OccurrenceApiItem[]>('/ocorrencias');
}

export interface CreateOccurrencePayload {
  latitude: number;
  longitude: number;
  tipoOcorrencia: string;
  detalhesAdicionais: string;
  urgencia: string;
  area: number;
  distancia: number;
}

export function criarOcorrencia(data: CreateOccurrencePayload): Promise<OccurrenceApiItem> {
  return request<OccurrenceApiItem>('/ocorrencias', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ── Notificações ──────────────────────────────────────────────────────────────

export interface NotificacaoApiItem {
  idOcorrencia: string;
  titulo: string;
  mensagem: string;
  distanciaKm: number;
  tempoAtras: string;
  nivelUrgencia: string;
  lida: boolean;
}

export function getNotificacoes(lat: number, lon: number): Promise<NotificacaoApiItem[]> {
  return request<NotificacaoApiItem[]>(`/notificacoes?lat=${lat}&lon=${lon}`);
}
