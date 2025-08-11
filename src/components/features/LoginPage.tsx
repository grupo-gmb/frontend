"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useActionState, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import { loginWithCredentials } from "@/actions/auth";
import { authService } from "@/services/authService"; // Adjust the import path as necessary
import { useSnackbar } from "@/context/SnackBarContext";

// Crie um componente separado para o botão para usar useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus(); // Este hook obtém o estado de pendência do formulário

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      sx={{ mt: 2 }}
      disabled={pending} // Desabilita o botão enquanto a action está em execução
    >
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  );
}

const LoginPage: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const [errorMessage, dispatch] = useActionState(
    loginWithCredentials,
    undefined
  );

  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasTriedLogin, setHasTriedLogin] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await authService.login({
        email,
        password,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      showSnackbar({
        message: "Login efetuado com sucesso!",
        severity: "success",
      });
      router.push("/dashboards");
    } catch (err: any) {
      if (err.response?.data?.message) {
        showSnackbar({
          message: "Erro no login",
          severity: "error",
        });
        setError(err.response.data.message);
        console.log("Erro ao fazer login:", err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Credenciais inválidas");

        console.log("Erro ao fazer login:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      showSnackbar({
        message: errorMessage,
        severity: "error",
        duration: 3000,
      });
    }
  }, [errorMessage]);

  return (
    <Box
      component="form"
      action={dispatch}
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

      <SubmitButton />
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default LoginPage;
