import api from './api';
import type { UsuarioCreate, UsuarioResponse } from '../types/usuario';

export const userService = {
    create: async(userData: UsuarioCreate): Promise<UsuarioResponse> => {
        const response = await api.post<UsuarioResponse>('/usuarios/create-aluno', userData);
        return response.data;
    }
}