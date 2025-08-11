import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // A função de servidor do NextAuth
import api from '@/services/api'; // Sua instância do Axios

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    // Pega o corpo da requisição enviada pelo frontend
    const body = await request.json();

    // Faz a chamada POST para o backend real, enviando os dados e o token
    const response = await api.post('/movements', body, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('[API_MOVEMENT_POST_ERROR]', error);
    return NextResponse.json({ message: 'Erro interno ao criar movimento' }, { status: 500 });
  }
}