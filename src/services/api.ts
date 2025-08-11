import axios from 'axios';
import { auth } from '@/lib/auth';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para adicionar token (caso use Bearer)
api.interceptors.request.use(
  async (config) => {
    // Esta lógica funciona melhor em Server Components/Actions
    const session = await auth();
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;

