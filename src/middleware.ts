import NextAuth from 'next-auth';

import { authConfig } from './lib/auth.config';

// Exporta a função de autenticação do NextAuth, que por sua vez usa seu callback 'authorized'.
export default NextAuth(authConfig).auth;

export const config = {
  // O matcher define em quais rotas o middleware será executado.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};