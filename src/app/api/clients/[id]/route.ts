import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // A função de servidor do NextAuth
import api from '@/services/api'; // Sua instância do Axios


export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }>}) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {

    const { id } = await context.params;
    const body = await request.json();

    // A chamada para o backend é feita aqui, no ambiente de servidor
    const response = await api.put(`/companies/${id}`, body, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('[API_CLIENTS_PUT_ERROR]', error);
    return new NextResponse('Erro interno ao atualizar clientes', { status: 500 });
  }
}


export async function DELETE(request: NextRequest, { params }: { params: {id: string }}) {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {

    // A chamada para o backend é feita aqui, no ambiente de servidor
    const response = await api.delete(`/companies/${params.id}`,  {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
    return NextResponse.json({message: 'Cliente deletado com sucesso'});
  } catch (error) {
    console.error('[API_CLIENTS_DELETE_ERROR]', error);
    return new NextResponse('Erro interno ao atualizar clientes', { status: 500 });
  }
}