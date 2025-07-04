import React, { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { authService } from "@/services/authService"; // Adjust the import path as necessary

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );

  async function handleLogout() {
    await fetch("/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <Box sx={{ mt: 8, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Dashboard!{" "}
        {isAuthenticated ? "Usuário autenticado" : "Usuário não autenticado"}
      </Typography>
      <Button onClick={handleLogout} variant="contained" color="secondary">
        Sair
      </Button>
    </Box>
  );
}
