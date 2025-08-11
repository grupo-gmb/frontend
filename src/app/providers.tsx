"use client";

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
//customized hooks
import { SnackbarProvider } from "@/context/SnackBarContext";
import { DialogProvider } from "@/context/DialogContext";

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
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <DialogProvider>{children}</DialogProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
