"use server";

import { useSnackbar } from "@/context/SnackBarContext";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth"; // Importe o tipo de erro do NextAuth

// A action agora recebe um estado anterior e os dados do formulário
export async function loginWithCredentials(
  prevState: string | undefined,
  formData: FormData
) {
  
  
  try {
    // A função signIn é chamada dentro da Server Action
    await signIn("credentials", {...Object.fromEntries(formData), redirectTo: "/dashboard"});
    console.log('passei no auth.ts signIn')
   
    // Se o login for bem-sucedido, o NextAuth redireciona, então este código não será alcançado.
    return undefined;
  } catch (error) {
    // Verifica se o erro é uma instância de AuthError
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciais inválidas. Verifique seu email e senha.';
        default:
          return 'Ocorreu um erro inesperado. Tente novamente.';
      }
    }
    // Se não for um erro de autenticação, relança o erro
    throw error;
  }
}