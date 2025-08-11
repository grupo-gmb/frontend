import { GET, POST } from '@/lib/auth';
export { GET, POST };
export const config = {
  matcher: [
    // Exclui rotas que começam com /api, além de arquivos estáticos.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};