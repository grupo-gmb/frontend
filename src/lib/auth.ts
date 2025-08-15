import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config'
import { authService } from '@/services/authService';

// Suponha que sua API de login retorna algo assim:
// {
//   "user": { "id": "1", "name": "Admin", "email": "admin@example.com", "role": "admin" },
//   "token": "seu-jwt-aqui"
// }

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password, company_id } = credentials;

        if (!email || !password  ) {
          return null; // Credenciais inválidas
        }

        // 2. Chame o seu serviço de login
        const loginData = await authService.login({ email: String(email), password: String(password) });
        
        // 3. Se o login for bem-sucedido, retorne os dados para o NextAuth.js
        if (loginData && loginData.user) {
          // O objeto retornado aqui será passado para o callback 'jwt'
          console.log("Login Data:", loginData.user.id);
          console.log("Name Data:", loginData.user.name);
          console.log("Name Data:", loginData.user.email);
          return {
            id: loginData.user.id,
            name: loginData.user.name,
            email: loginData.user.email,
            role: loginData.user.role,
            permissions: loginData.user.permissions,
            accessToken: loginData.access_token, // Incluímos o token da sua API
          };
        }

        // Retorna nulo se a autenticação falhar
        return null;
      },
    }),
  ],
  callbacks: {
    // 4. Armazene o accessToken no token da sessão do NextAuth.js
    async jwt({ token, user }) {
      if (user) {
        // Na primeira vez (login), o objeto 'user' vindo do 'authorize' está disponível
        console.log("JWT Callback User:", user.id);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.permissions = user.permissions;
        
      }
      return token;
    },

    // 5. Exponha o accessToken para a sessão do lado do cliente
    async session({ session, token }) {
      if (token.accessToken && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.permissions = token.permissions
      }
      return session;
    },
  },
});