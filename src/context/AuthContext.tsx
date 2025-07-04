"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "@/services/authService";
import { LoginResponse } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    company_id: string;
  } | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
    role: string;
    company_id: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Verificando autenticação..."); // Depuração
      const authStatus = await authService.isAuthenticated();
      console.log("Autenticação verificada:", authStatus); // Depuração
      if (authStatus) {
        const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
        setUser(userData);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth().catch((error) => {
      console.error("Erro ao verificar autenticação:", error);
      setLoading(false);
    });
  }, []);

  const login = (data: LoginResponse) => {
    authService.saveAuthData(data);
    document.cookie = `access_token=${data.access_token}; path=/; max-age=3600`;
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
