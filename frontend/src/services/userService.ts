import api from "./api";
import type {
  UsuarioCreate,
  UsuarioResponse,
  UsuarioUpdate,
  UsuarioUpdatePassword,
  EStatus,
} from "../types/usuario";

export const userService = {
  // 🔓 Criar aluno
  createAluno: async (
    userData: UsuarioCreate
  ): Promise<UsuarioResponse> => {
    const response = await api.post<UsuarioResponse>(
      "/usuarios/create-aluno",
      userData
    );
    return response.data;
  },

  // 🔐 Criar usuário (admin)
  createUser: async (
    userData: UsuarioCreate
  ): Promise<UsuarioResponse> => {
    const response = await api.post<UsuarioResponse>(
      "/usuarios/create-users",
      userData
    );
    return response.data;
  },

  // 🔐 Listar usuários
  getAllUsers: async (): Promise<UsuarioResponse[]> => {
    const response = await api.get<UsuarioResponse[]>(
      "/usuarios/allUsers"
    );
    return response.data;
  },

  // 🔐 Atualizar usuário
  updateUser: async (
    userData: UsuarioUpdate
  ): Promise<UsuarioResponse> => {
    const response = await api.put<UsuarioResponse>(
      "/usuarios/update-users",
      userData
    );
    return response.data;
  },

  // 🔐 Atualizar senha (sem retorno)
  updatePassword: async (
    userData: UsuarioUpdatePassword
  ): Promise<void> => {
    await api.put("/usuarios/update-password", userData);
  },

  // 🔐 Alterar status (sem retorno)
  changeStatus: async (
    matriculas: string[],
    status: EStatus
  ): Promise<void> => {
    await api.put(
      `/usuarios/change-status?status=${status}`,
      matriculas
    );
  },

  saveMultipleUsers: async (users: UsuarioCreate[]): Promise<UsuarioResponse[]> => {  
    const response = await api.post<UsuarioResponse[]>("/usuarios/save-multiple", users);
    return response.data;
  },

  // 🔐 Deletar usuários (sem retorno)
  deleteUsers: async (matriculas: string[]): Promise<void> => {
    await api.delete("/usuarios/delete-users", {
      data: matriculas,
    });
  },
};