'use server'

import { supabase } from './supabase'
import { revalidatePath } from 'next/cache'
import { handleSupabaseError, executeSupabaseQuery } from './error-handler'

// --- PROCESSOS ---

export async function getProcesses() {
    try {
        const { data, error } = await supabase
            .from('processes')
            .select(`
        *,
        clients (
          full_name
        )
      `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error fetching processes:', error);
            return [];
        }

        return data?.map((p: any) => ({
            ...p,
            cliente: p.clients?.full_name || 'N/A'
        })) || [];

    } catch (error) {
        console.error('Error in getProcesses:', error);
        return [];
    }
}

export async function getProcessById(id: string) {
    try {
        const { data, error } = await supabase
            .from('processes')
            .select(`
                *,
                clients (*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching process by ID:', error);
        return null;
    }
}

export async function createProcess(formData: FormData) {
    try {
        const rawData = {
            process_number: formData.get('numero'),
            title: formData.get('titulo'),
            client_id: formData.get('client_id'),
            category: formData.get('categoria'),
            status: 'active',
            priority: 'medium',
            description: formData.get('descricao')
        }

        const { error } = await supabase.from('processes').insert([rawData])
        if (error) {
            console.error('Error creating process:', error);
            return handleSupabaseError(error);
        }

        revalidatePath('/dashboard/processos')
        return { success: true }
    } catch (error) {
        console.error('Error in createProcess:', error);
        return handleSupabaseError(error);
    }
}

// --- CLIENTES ---

export async function getClients() {
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('full_name', { ascending: true });

        if (error) {
            console.error('Error fetching clients:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getClients:', error);
        return [];
    }
}

export async function createClient(clientData: any) {
    try {
        const { error } = await supabase
            .from('clients')
            .insert([clientData]);

        if (error) {
            console.error('Error creating client:', error);
            return handleSupabaseError(error);
        }

        revalidatePath('/dashboard/clientes');
        return { success: true };
    } catch (error) {
        console.error('Error in createClient:', error);
        return handleSupabaseError(error);
    }
}

export async function updateClient(id: string, clientData: any) {
    try {
        const { error } = await supabase
            .from('clients')
            .update(clientData)
            .eq('id', id);

        if (error) {
            console.error('Error updating client:', error);
            return handleSupabaseError(error);
        }

        revalidatePath('/dashboard/clientes');
        return { success: true };
    } catch (error) {
        console.error('Error in updateClient:', error);
        return handleSupabaseError(error);
    }
}

export async function deleteClient(id: string) {
    try {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting client:', error);
            return handleSupabaseError(error);
        }

        revalidatePath('/dashboard/clientes');
        return { success: true };
    } catch (error) {
        console.error('Error in deleteClient:', error);
        return handleSupabaseError(error);
    }
}

// --- DOCUMENTOS ---

export async function getDocuments(category?: string) {
    try {
        let query = supabase.from('documents').select('*').order('created_at', { ascending: false });

        if (category && category !== 'Todos') {
            query = query.eq('category', category.toLowerCase());
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching documents:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getDocuments:', error);
        return [];
    }
}

export async function uploadFile(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        const category = formData.get('category') as string || 'others';

        if (!file) {
            return { success: false, error: 'Nenhum arquivo selecionado' };
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
        const filePath = `${category}/${fileName}`;

        const { data: storageData, error: storageError } = await supabase.storage
            .from('documents')
            .upload(filePath, file);

        if (storageError) {
            console.error('Storage error:', storageError);
            return handleSupabaseError(storageError);
        }

        const { error: dbError } = await supabase
            .from('documents')
            .insert([{
                name: file.name,
                file_type: fileExt,
                file_size: file.size,
                storage_path: storageData.path,
                category: category.toLowerCase(),
            }]);

        if (dbError) {
            console.error('Database error:', dbError);
            return handleSupabaseError(dbError);
        }

        revalidatePath('/dashboard/documentos');
        return { success: true };
    } catch (error) {
        console.error('Error in uploadFile:', error);
        return handleSupabaseError(error);
    }
}

export async function deleteDocument(id: string, storagePath: string) {
    try {
        // 1. Delete from Storage
        const { error: storageError } = await supabase.storage
            .from('documents')
            .remove([storagePath]);

        if (storageError) {
            console.error('Storage error:', storageError);
            // Even if storage fails, we might still want to delete from DB if file is gone
        }

        // 2. Delete from Database
        const { error: dbError } = await supabase
            .from('documents')
            .delete()
            .eq('id', id);

        if (dbError) throw dbError;

        revalidatePath('/dashboard/documentos');
        return { success: true };
    } catch (error) {
        console.error('Erro ao excluir documento:', error);
        return { success: false, error: (error as any).message };
    }
}

export async function renameDocument(id: string, newName: string) {
    try {
        const { error } = await supabase
            .from('documents')
            .update({ name: newName })
            .eq('id', id);

        if (error) throw error;

        revalidatePath('/dashboard/documentos');
        return { success: true };
    } catch (error) {
        console.error('Erro ao renomear documento:', error);
        return { success: false, error: (error as any).message };
    }
}

// --- AGENDA / COMPROMISSOS ---

export async function getAppointments() {
    try {
        const { data, error } = await supabase
            .from('appointments')
            .select(`
                *,
                clients (full_name),
                processes (process_number)
            `)
            .order('start_time', { ascending: true });

        if (error) throw error;

        return data.map((app: any) => ({
            id: app.id,
            time: new Date(app.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            title: app.title,
            location: app.location,
            client: app.clients?.full_name || 'N/A',
            process: app.processes?.process_number || null,
            date: new Date(app.start_time).toISOString().split('T')[0]
        }));
    } catch (error) {
        console.error('Erro ao buscar compromissos:', error);
        // Fallback mock
        return [
            { id: '1', time: "09:00", title: "Audiência de Conciliação", location: "Fórum Central - Sala 402", client: "João Silva Ferreira", date: new Date().toISOString().split('T')[0] },
            { id: '2', time: "14:30", title: "Reunião de Consultoria", location: "Escritório - Sala Privada", client: "Empresa ABC Ltda", date: new Date().toISOString().split('T')[0] },
        ];
    }
}

export async function createAppointment(formData: FormData) {
    try {
        const rawData = {
            title: formData.get('title'),
            description: formData.get('description'),
            start_time: formData.get('start_time'),
            end_time: formData.get('end_time'),
            location: formData.get('location'),
            client_id: formData.get('client_id'),
            process_id: formData.get('process_id'),
        }

        const { error } = await supabase.from('appointments').insert([rawData])
        if (error) throw error

        revalidatePath('/dashboard/agenda')
        return { success: true }
    } catch (error) {
        return { success: false, error: (error as any).message }
    }
}

// --- FINANCEIRO / HONORÁRIOS ---

export async function getInvoices() {
    try {
        const { data, error } = await supabase
            .from('invoices')
            .select(`
                *,
                clients (full_name)
            `)
            .order('due_date', { ascending: true });

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Erro ao buscar faturamento:', error);
        // Fallback mock
        return [
            { id: '1', description: 'Honorários Iniciais - Processo 123', amount: 2500.00, due_date: '2026-03-20', status: 'paid', clients: { full_name: 'João Silva' } },
            { id: '2', description: 'Parcela 02/05 - Ação Civil', amount: 800.00, due_date: '2026-04-10', status: 'pending', clients: { full_name: 'Maria Oliveira' } },
            { id: '3', description: 'Custas Processuais', amount: 350.00, due_date: '2026-03-15', status: 'overdue', clients: { full_name: 'João Silva' } },
        ];
    }
}

export async function createInvoice(formData: {
    description: string;
    amount: number;
    due_date: string;
    client_id: string;
    process_id?: string;
    category: string;
}) {
    try {
        const { error } = await supabase
            .from('invoices')
            .insert([{
                ...formData,
                status: 'pending'
            }]);

        if (error) throw error;
        revalidatePath('/dashboard/financeiro');
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as any).message };
    }
}

// --- BUSCA GLOBAL ---

export async function globalSearch(query: string) {
    if (!query || query.length < 2) return { processes: [], clients: [] };

    try {
        const [processesRes, clientsRes] = await Promise.all([
            supabase
                .from('processes')
                .select('id, process_number, title')
                .or(`process_number.ilike.%${query}%,title.ilike.%${query}%`)
                .limit(5),
            supabase
                .from('clients')
                .select('id, full_name, email')
                .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
                .limit(5)
        ]);

        return {
            processes: processesRes.data || [],
            clients: clientsRes.data || []
        };
    } catch (error) {
        console.error('Erro na busca global:', error);
        return { processes: [], clients: [] };
    }
}

// --- PERFIL / CONFIGURAÇÕES ---

export async function getProfile() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Não autenticado");

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        // Fallback mock
        return {
            full_name: "Dr. Lucas Silva",
            oab_registry: "123.456/SP",
            avatar_url: null,
            email: "lucas.silva@advocacia.com.br",
            role: "lawyer"
        };
    }
}

export async function updateProfile(formData: FormData) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Não autenticado");

        const updates = {
            full_name: formData.get('full_name'),
            oab_registry: formData.get('oab_registry'),
            updated_at: new Date().toISOString(),
        };

        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id);

        if (error) throw error;

        revalidatePath('/dashboard/configuracoes');
        return { success: true };
    } catch (error) {
        return { success: false, error: (error as any).message };
    }
}

// --- NOTIFICAÇÕES ---

export async function getNotifications() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;
        return data;
    } catch (error) {
        // Fallback mock
        return [
            { id: '1', title: 'Prazo Vencendo', message: 'O prazo do processo 001/2024 vence hoje!', type: 'danger', is_read: false, created_at: new Date().toISOString() },
            { id: '2', title: 'Novo Cliente', message: 'Maria Oliveira foi cadastrada no sistema.', type: 'success', is_read: true, created_at: new Date(Date.now() - 3600000).toISOString() },
            { id: '3', title: 'Audiência Amanhã', message: 'Lembrete: Audiência de conciliação às 09:00.', type: 'warning', is_read: false, created_at: new Date(Date.now() - 7200000).toISOString() },
        ];
    }
}

export async function markNotificationAsRead(id: string) {
    try {
        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        if (error) throw error;
        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

// --- PETIÇÕES / TEMPLATES ---

export async function getPetitionTemplates() {
    try {
        const { data, error } = await supabase
            .from('petition_templates')
            .select('*')
            .order('title', { ascending: true });

        if (error) throw error;
        return data;
    } catch (error) {
        // Fallback mock
        return [
            { id: '1', title: 'Petição Inicial - Indenização', category: 'Cível', content: 'EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO...\n\nO autor {{cliente_nome}}, CPF {{cliente_cpf}}...' },
            { id: '2', title: 'Procuração Ad Judicia', category: 'Geral', content: 'OUTORGANTE: {{cliente_nome}}, portador do CPF {{cliente_cpf}}...' },
            { id: '3', title: 'Recurso Ordinário', category: 'Trabalhista', content: 'AO DOUTO JUÍZO DA... VARA DO TRABALHO...' },
        ];
    }
}

export async function generatePetition(templateId: string, clientId: string, processId: string) {
    try {
        // 1. Buscar dados
        const [template, client, process] = await Promise.all([
            supabase.from('petition_templates').select('*').eq('id', templateId).single(),
            supabase.from('clients').select('*').eq('id', clientId).single(),
            supabase.from('processes').select('*').eq('id', processId).single()
        ]);

        if (template.error || client.error) throw new Error("Erro ao buscar dados para geração");

        // 2. Substituir placeholders
        let content = template.data.content;
        content = content.replace(/{{cliente_nome}}/g, client.data.full_name);
        content = content.replace(/{{cliente_cpf}}/g, client.data.document_id);
        content = content.replace(/{{processo_numero}}/g, process.data?.process_number || 'N/A');

        return { success: true, content };
    } catch (error) {
        console.error('Erro na geração:', error);
        return { success: false, error: (error as any).message };
    }
}

export async function savePetition(data: {
    title: string;
    content: string;
    client_id: string;
    process_id?: string;
    template_id?: string;
}) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado");

        const { error } = await supabase
            .from('petitions')
            .insert([{
                ...data,
                created_by: user.id
            }]);

        if (error) throw error;

        revalidatePath('/dashboard/peticoes');
        return { success: true };
    } catch (error) {
        console.error('Erro ao salvar petição:', error);
        return { success: false, error: (error as any).message };
    }
}

export async function getSavedPetitions() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('petitions')
            .select(`
                *,
                clients (full_name),
                processes (process_number)
            `)
            .eq('created_by', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao buscar petições salvas:', error);
        return [];
    }
}

// --- WHATSAPP INTEGRATION ---

export async function getWhatsAppLink(clientId: string, type: 'document' | 'update', data?: any) {
    try {
        const { data: client, error } = await supabase
            .from('clients')
            .select('phone, full_name')
            .eq('id', clientId)
            .single();

        if (error || !client?.phone) throw new Error("Telefone do cliente não encontrado");

        let message = "";
        const cleanPhone = client.phone.replace(/\D/g, ''); // Remove non-digits
        const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

        if (type === 'document') {
            message = `Olá ${client.full_name}, segue o documento solicitado do Escritório de Advocacia: ${data.documentName}. Acesse aqui: ${data.url}`;
        } else if (type === 'update') {
            message = `Olá ${client.full_name}, temos uma nova atualização no seu processo ${data.processNumber}: ${data.updateTitle}. Qualquer dúvida, estamos à disposição.`;
        }

        const encodedMessage = encodeURIComponent(message);
        return {
            success: true,
            link: `https://api.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodedMessage}`
        };
    } catch (error) {
        return { success: false, error: (error as any).message };
    }
}

export async function getPendingReminders() {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        // 1. Buscar compromissos para amanhã
        const { data: appointments, error: appError } = await supabase
            .from('appointments')
            .select(`
                id,
                title,
                start_time,
                clients (id, full_name, phone)
            `)
            .gte('start_time', `${tomorrowStr}T00:00:00`)
            .lte('start_time', `${tomorrowStr}T23:59:59`);

        if (appError) throw appError;

        // 2. Buscar faturas a vencer amanhã
        const { data: invoices, error: invError } = await supabase
            .from('invoices')
            .select(`
                id,
                description,
                amount,
                due_date,
                clients (id, full_name, phone)
            `)
            .eq('status', 'pending')
            .eq('due_date', tomorrowStr);

        if (invError) throw invError;

        // 3. Formatar lembretes
        const reminders = [
            ...(appointments || []).map(a => {
                const client: any = a.clients;
                const cleanPhone = client?.phone?.replace(/\D/g, '') || '';
                const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
                const timeStr = new Date(a.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                const message = `Olá ${client?.full_name}, lembrete do seu compromisso amanhã às ${timeStr}: ${a.title}. Escritório de Advocacia.`;

                return {
                    id: a.id,
                    type: 'appointment' as const,
                    title: a.title,
                    client: client?.full_name,
                    phone: phoneWithCountry,
                    time: timeStr,
                    message,
                    link: `https://api.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodeURIComponent(message)}`
                };
            }),
            ...(invoices || []).map(i => {
                const client: any = i.clients;
                const cleanPhone = client?.phone?.replace(/\D/g, '') || '';
                const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;
                const amountStr = Number(i.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                const message = `Olá ${client?.full_name}, lembramos que sua fatura "${i.description}" no valor de R$ ${amountStr} vence amanhã. Escritório de Advocacia.`;

                return {
                    id: i.id,
                    type: 'invoice' as const,
                    title: i.description,
                    client: client?.full_name,
                    phone: phoneWithCountry,
                    amount: amountStr,
                    message,
                    link: `https://api.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodeURIComponent(message)}`
                };
            })
        ];

        return reminders;
    } catch (error) {
        console.error('Erro ao buscar lembretes:', error);
        return [];
    }
}

// --- ESTATÍSTICAS ---

export async function getDashboardStats() {
    try {
        return [
            { label: "Processos Ativos", value: "124", change: "+12%", trend: "up" },
            { label: "Novos Clientes", value: "32", change: "+5%", trend: "up" },
            { label: "Prazos Próximos", value: "8", change: "-2", trend: "down" },
            { label: "Faturamento Mes", value: "R$ 45k", change: "+18%", trend: "up" },
        ]
    } catch (e) {
        return []
    }
}
