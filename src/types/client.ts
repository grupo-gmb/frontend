export interface ClientData {
  id?: string;
  name: string;
  cnpj: string;
  address: string;
  active: boolean;
  
}

export interface ClientFormData extends Partial<ClientData>{}