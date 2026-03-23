export interface LoginRequest {
    matricula: string;
    password: string; // Mude de 'senha' para 'password'
}

export interface LoginResponse {
    token: string;
}