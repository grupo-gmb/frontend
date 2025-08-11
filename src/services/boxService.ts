

import { BoxData } from '@/types/box';
import axios from 'axios'



const nextApi = axios.create({
  baseURL: '/api', // Aponta para a pasta /api do seu projeto
});

//Supondo que sua API retorna um objeto com uma mensagem
interface ApiResponse<T>{
    message: string;
    data: T;
}

export const getBox = async (): Promise<BoxData[]> => {
  const response = await nextApi.get('/boxes');
  return response.data;
};

export const getBoxById = async(id: string): Promise<BoxData> => {
  const response = await nextApi.get(`/boxes/${id}`);
  console.log("GetBoxByID", response.data)
  return response.data
}


export const createBox = async (boxData: Omit<BoxData, 'id'>): Promise<ApiResponse<BoxData>> => {
    const response = await nextApi.post('/boxes', boxData);
    return response.data;
}

export const updateBox = async (id: string, boxData: Partial<BoxData>): Promise<ApiResponse<BoxData>> => {
    
    const response = await nextApi.put(`/boxes/${id}`, boxData);
    console.log("Response", response.data)
    return response.data
}

export const deleteBox = async(id: string): Promise<void> => {
    await nextApi.delete(`/boxes/${id}`);
}