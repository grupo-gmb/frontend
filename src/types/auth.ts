export interface LoginRequest {
  email: string;
  password: string;
  
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    company_id: string;
    role: string;
  };
}

export interface AuthError {
  message: string;
  code?: string;
}