export type EType = "ADMIN" | "PROFESSOR" | "EXTERNO" | "INTERNO" | "SUPERIOR" | "ASSISTENTE";

export interface UsuarioCreate{
    name: string;
    email: string;
    password: string;
    matricula?: string;
    type: EType;
}

export interface UsuarioResponse{
    name: string;
    email: string;
    matricula?: string;
    type: EType;
}