

import { ClientData } from '@/types/client';
import axios from 'axios'



const nextApi = axios.create({
  baseURL: '/api', // Aponta para a pasta /api do seu projeto
});

//Supondo que sua API retorna um objeto com uma mensagem
interface ApiResponse<T>{
    message: string;
    data: T;
}

export const getClients = async (): Promise<ClientData[]> => {
  const response = await nextApi.get('/clients');
  return response.data;
};


export const createClient = async (clientData: Omit<ClientData, 'id'>): Promise<ApiResponse<ClientData>> => {
    const response = await nextApi.post('/clients', clientData);
    return response.data;
}

export const updateClient = async (id: string, clientData: Partial<ClientData>): Promise<ApiResponse<ClientData>> => {
    const response = await nextApi.put(`/clients/${id}`, clientData);
    console.log("Response", response.data)
    return response.data
}

export const deleteClient = async(id: string): Promise<void> => {
    await nextApi.delete(`/clients/${id}`);
}