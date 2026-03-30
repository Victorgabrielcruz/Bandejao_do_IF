export type EType =
  | "ADMIN"
  | "PROFESSOR"
  | "EXTERNO"
  | "INTERNO"
  | "SUPERIOR"
  | "ASSISTENTE";

export type EStatus =
  | "SUSPENSO"
  | "ATIVO"
  | "INATIVO";

export interface UsuarioCreate {
  name: string;
  email: string;
  password: string;
  matricula?: string;
  tipo: EType;
}

export interface UsuarioResponse {
  name: string;
  email: string;
  matricula?: string;
  tipo: EType;
}

export interface UsuarioUpdate {
  name: string;
  matricula: string;
  email: string;
}

export interface UsuarioUpdatePassword {
  password: string;
}