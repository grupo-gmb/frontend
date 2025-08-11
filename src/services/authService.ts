import api from './api';
import { LoginRequest, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse | null> => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', data);
      console.log(response.data.access_token)
      console.log(response.data.user)
      return response.data; // Retorna { user, access_token }
    } catch (error) {
      console.error("Erro na chamada de login da API:", error);
      return null; // Retorna nulo para indicar falha na autenticação
    }
  },
};

    
