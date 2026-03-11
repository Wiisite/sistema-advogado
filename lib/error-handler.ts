/**
 * Utilitário para tratamento de erros do Supabase
 */

export interface ErrorResponse {
    success: false;
    error: string;
    details?: any;
}

export interface SuccessResponse<T = any> {
    success: true;
    data?: T;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

/**
 * Trata erros do Supabase e retorna mensagens amigáveis
 */
export function handleSupabaseError(error: any): ErrorResponse {
    console.error('Supabase Error:', error);

    // Erros de autenticação
    if (error.message?.includes('JWT') || error.message?.includes('auth')) {
        return {
            success: false,
            error: 'Sessão expirada. Por favor, faça login novamente.',
            details: error
        };
    }

    // Erros de permissão
    if (error.message?.includes('permission') || error.code === '42501') {
        return {
            success: false,
            error: 'Você não tem permissão para realizar esta ação.',
            details: error
        };
    }

    // Erros de violação de constraint
    if (error.code === '23505') {
        return {
            success: false,
            error: 'Este registro já existe no sistema.',
            details: error
        };
    }

    // Erros de chave estrangeira
    if (error.code === '23503') {
        return {
            success: false,
            error: 'Não é possível excluir este registro pois está vinculado a outros dados.',
            details: error
        };
    }

    // Erro de conexão
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
        return {
            success: false,
            error: 'Erro de conexão. Verifique sua internet e tente novamente.',
            details: error
        };
    }

    // Erro genérico
    return {
        success: false,
        error: error.message || 'Ocorreu um erro inesperado. Tente novamente.',
        details: error
    };
}

/**
 * Wrapper para executar operações do Supabase com tratamento de erro
 */
export async function executeSupabaseQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: any }>,
    fallbackData?: T
): Promise<ApiResponse<T>> {
    try {
        const { data, error } = await queryFn();

        if (error) {
            return handleSupabaseError(error);
        }

        return {
            success: true,
            data: data || fallbackData
        };
    } catch (error) {
        return handleSupabaseError(error);
    }
}
