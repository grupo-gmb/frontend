"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Crie o QueryClient no lado do cliente para evitar problemas de hidratação
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
          },
        },
      })
  );

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
