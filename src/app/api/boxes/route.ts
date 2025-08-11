import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // A função de servidor do NextAuth
import api from '@/services/api'; // Sua instância do Axios


export async function GET() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    // A chamada para o backend é feita aqui, no ambiente de servidor
    const response = await api.get('/boxes', {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('[API_BOXES_ERROR]', error);
    return new NextResponse('Erro interno ao buscar boxes', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.accessToken) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }

    // Pega o corpo da requisição enviada pelo frontend
    const body = await request.json();

    // Faz a chamada POST para o backend real, enviando os dados e o token
    const response = await api.post('/boxes', body, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('[API_BOXES_POST_ERROR]', error);
    return NextResponse.json({ message: 'Erro interno ao criar box' }, { status: 500 });
  }
}


