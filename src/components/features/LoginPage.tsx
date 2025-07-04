"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { authService } from "@/services/authService"; // Adjust the import path as necessary

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const company_id = formData.get("company_id") as string;
    console.log("Company ID:", company_id);

    try {
      await authService.login({
        email,
        password,
        company_id: company_id,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("Login successful");
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Credenciais inválidas");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: { xs: 4, md: 18 },
        maxWidth: { xs: "90%", md: 400 },
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Bem Vindo
      </Typography>
      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        required
        disabled={loading}
      />
      <TextField
        label="Senha"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        required
        disabled={loading}
      />
      <TextField
        label="ID Empresa"
        name="company_id"
        type="text"
        fullWidth
        margin="normal"
        required
        disabled={loading}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default LoginPage;
