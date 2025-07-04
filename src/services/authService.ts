import api from './api';
import { LoginRequest, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    // Salve o token e dados do usuário localmente, se necessário
    console.log('Login response:', response.data.access_token);
    document.cookie = `access_token=${response.data.access_token}; path=/; max-age=3600`; // Exemplo de cookie com 1 hora de expiração
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', `${response.data.access_token}`);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('acess_token');
      localStorage.removeItem('user_data');
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('access_token');
    console.log('Middleware: Verificando autenticação com token:', token);
    if(!token) return false;

    try {
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}` },
      }); // Exemplo de endpoint
      if(response.status === 200) {
        console.log('Middleware: Usuário autenticado e confirmado pelo servidor', response.data);
        return true
      }
      return false;
    } catch (error) {
      console.log('Middleware: Usuário não autenticado ou token inválido', error);
      return false;
    }
  },
  

  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  },

  saveAuthData: (data: LoginResponse): void => {
    
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user_data', JSON.stringify(data.user));
  },
};