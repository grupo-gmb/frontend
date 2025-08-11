import { DocumentData } from '@/types/box';
import axios from 'axios'



const nextApi = axios.create({
  baseURL: '/api', // Aponta para a pasta /api do seu projeto
});

//Supondo que sua API retorna um objeto com uma mensagem
interface ApiResponse<T>{
    message: string;
    data: T;
}


export const getDocumentsById = async(id: string): Promise<DocumentData> => {
  const response = await nextApi.get(`/documents/${id}`);
  console.log("GetDocumentsByID", response.data)
  return response.data
}


export const createDocument = async (documentData: Omit<DocumentData, 'id'>): Promise<ApiResponse<DocumentData>> => {
    const response = await nextApi.post('/documents', documentData);
    return response.data;
}

