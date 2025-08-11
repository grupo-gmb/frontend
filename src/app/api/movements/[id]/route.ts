import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // A função de servidor do NextAuth
import api from '@/services/api'; // Sua instância do Axios


export async function GET(request: NextRequest, context: { params: Promise<{ id: string }>}) {
    const session = await auth();
    if (!session?.user?.accessToken) {  // Corrigido: accessToken
        return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
    }
    try {
        const { id } = await context.params;
        const response = await api.get(`/movements/${id}`, {  // Padronizado para /box (singular)
            headers: { Authorization: `Bearer ${session.user.accessToken}` },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('[API_MOVEMENT_GET_ERROR]', error);  // Logging estruturado
        return NextResponse.json({ message: 'Erro interno ao buscar movimento' }, { status: 500 });
    }
}
