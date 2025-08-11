import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // Define sua página de login customizada.
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt', // Usa JWT para sessões.
    maxAge: 60 * 60 * 8, // 8 horas de duração da sessão.
    updateAge: 60 * 30, // Atualiza a sessão a cada 30 minutos.
  },
  callbacks: {
    // A função 'authorized' controla o acesso às rotas.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoute = ['/dashboard', '/clients', '/boxes', '/settings','/movements', '/reports']
      const isProtectedRoute = protectedRoute.some(route => nextUrl.pathname.startsWith(route))

      if (isProtectedRoute) {
        if (isLoggedIn) return true; // Permite o acesso se estiver logado.
        return false; // Redireciona para a página de login se não estiver.
      } else if (isLoggedIn) {
        // Se o usuário já está logado e tenta acessar a página de login, redireciona.
        const publicRoutes = ['/']
        if (publicRoutes.includes(nextUrl.pathname)){
            console.log('publicRoutes')
            return Response.redirect(new URL('/dashboard', nextUrl))
        }
      }
      return true; // Permite acesso a todas as outras rotas (públicas).
    },
  },
  providers: [], // Os provedores de autenticação serão adicionados no arquivo principal.
} satisfies NextAuthConfig;