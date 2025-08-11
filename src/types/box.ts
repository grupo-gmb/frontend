import { DocumentType } from "./documentTypes";

export type DocumentsArray = DocumentData[];
export interface BoxData {
  id?: string;
  code?: string;
  description?: string;
  company_id: string;
  company?:{
    id: string;
    name: string;
    cnpj: string;
    address: string;
    active: boolean;
  };
  documents?: DocumentData[];
  movement?:{
    id: string ;
    box_id: string;
    movement_type: string;
    user_id:string;
    company_id: string;
    from_location?:string;
    to_location: string;
    movement_date: Date
    related_order: string;
    notes: string
  }[];
  barcode?: string;
  location_code?: string | null ;
  active?: boolean;
  is_allocated?: boolean;
  status?: string;
  created_at?: Date;
  updated_at?: Date;
  allocated_at?: Date;
}
export interface DocumentData{
  box_id: string;
  company_id: string;
  description: string;
  document_name: string;
  id?: string;
  type_document: DocumentType;
  status: string;
  user_id?: string;
};


export interface DocumentFormData extends Partial<DocumentData>{}
export interface BoxFormData extends Partial<BoxData>{}