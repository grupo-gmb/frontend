import { MovementData } from './../types/movement';
import axios from 'axios'

const nextApi = axios.create({
  baseURL: '/api', // Aponta para a pasta /api do seu projeto
});

//Supondo que sua API retorna um objeto com uma mensagem
interface ApiResponse<T>{
    message: string;
    data: T;
}

export const getMovements = async (): Promise<MovementData[]> => {
  const response = await nextApi.get('/movements');
  return response.data;
};


export const createMovement = async (movementData: Omit<MovementData, 'id'>): Promise<ApiResponse<MovementData>> => {
    const response = await nextApi.post('/movements', movementData);
    return response.data;
}



