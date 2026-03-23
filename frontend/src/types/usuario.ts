export type EType = "ADMIN" | "PROFESSOR" | "EXTERNO" | "INTERNO" | "SUPERIOR" | "ASSISTENTE";

export interface UsuarioCreate {
    name: string;
    email: string;
    password: string;
    matricula?: string;
    tipo: EType; // <--- Alterado de type para tipo
}

export interface UsuarioResponse {
    name: string;
    email: string;
    matricula?: string;
    tipo: EType; // <--- Alterado de type para tipo
}