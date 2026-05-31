import { request } from "./api";

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

export const login = (email: string, senha: string): Promise<LoginResponse> => {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
};

export const registrar = (
  nome: string,
  email: string,
  senha: string,
): Promise<RegistrarResponse> => {
  return request<RegistrarResponse>("/auth/registrar", {
    method: "POST",
    body: JSON.stringify({ nome, email, senha }),
  });
};
