import api from "@/services/api"; // ou onde você configura seu axios/fetch
import axios from "axios";


const nextApi = axios.create({
  baseURL: '/api', // Aponta para a pasta /api do seu projeto
});
export const reportService = {
  /**
   * Gera relatório de armazenamento em PDF
   * @param period Ex: "current_month", "last_month", etc.
   * @returns Blob do PDF
   */
  async getStorageReport(period: string): Promise<Blob> {
    try {
      const response = await nextApi.get(`/reports/storage`, {
          params: { period }, // envia ?period=...
          responseType: "arraybuffer", // recebe dados binários
        })

      // Cria um Blob do PDF a partir do byte array
      const file = new Blob([response.data], { type: "application/pdf" });
      return file;
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      throw error;
    }
  },
};