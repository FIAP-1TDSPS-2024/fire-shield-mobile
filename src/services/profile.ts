import { request } from "./api";

export interface PerfilResponse {
  nome: string;
  email: string;
  localidade?: string;
  raioAlertasKm: number;
}

export const getMeuPerfil = (): Promise<PerfilResponse> => {
  return request<PerfilResponse>("/usuarios/meu-perfil");
};

export const editarPerfil = (
  nome: string,
  localidade: string,
  raioAlertasKm: number,
): Promise<void> => {
  return request<void>("/usuarios/editar-perfil", {
    method: "PUT",
    body: JSON.stringify({ nome, localidade, raioAlertasKm }),
  });
};

export const deletarConta = (): Promise<void> => {
  return request<void>("/usuarios/deletar-conta", { method: "DELETE" });
};
