
import axios from 'axios';
import { ClientData } from '@/types/client';
import api from './api';

export const getClients = async (): Promise<ClientData[]> => {
  const response = await api.get('/companies');
  return response.data;
};


export const createClient = async (clientData: Omit<ClientData, 'id'>):
 Promise<ClientData> => {
    const response = await api.post('/companies', clientData);
    return response.data;
}

export const updateClient = async(id: string, ClientData: Partial<ClientData>):
 Promise<ClientData> => {
    console.log("clientData", ClientData)
    const response = await api.put(`/companies/${id}`, ClientData);
    console.log("Response", response.data)
    return response.data
}

export const deleteClient = async(id: string): Promise<void> => {
    await api.delete(`/companies/${id}`);
}