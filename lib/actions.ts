'use server'

import { query } from './db'
import { revalidatePath } from 'next/cache'

// --- PROCESSOS ---

export async function getProcesses() {
    try {
        const result = await query(`
            SELECT 
                p.*,
                c.full_name as client_name
            FROM processes p
            LEFT JOIN clients c ON p.client_id = c.id
            ORDER BY p.created_at DESC
        `);

        return result.rows.map((p: any) => ({
            ...p,
            cliente: p.client_name || 'N/A',
            numero: p.process_number,
            titulo: p.title,
            categoria: p.category,
            status: p.status
        }));
    } catch (error) {
        console.error('Error in getProcesses:', error);
        return [];
    }
}

export async function getProcessById(id: string) {
    try {
        const result = await query(`
            SELECT 
                p.*,
                c.*,
                c.full_name as client_name
            FROM processes p
            LEFT JOIN clients c ON p.client_id = c.id
            WHERE p.id = $1
        `, [id]);

        if (result.rows.length === 0) return null;
        
        return {
            ...result.rows[0],
            clients: {
                full_name: result.rows[0].client_name
            }
        };
    } catch (error) {
        console.error('Error fetching process by ID:', error);
        return null;
    }
}

export async function createProcess(formData: FormData) {
    try {
        await query(`
            INSERT INTO processes (process_number, title, client_id, category, status, priority, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
            formData.get('numero'),
            formData.get('titulo'),
            formData.get('client_id'),
            formData.get('categoria'),
            'active',
            'medium',
            formData.get('descricao')
        ]);

        revalidatePath('/dashboard/processos');
        return { success: true };
    } catch (error: any) {
        console.error('Error creating process:', error);
        return { success: false, error: error.message };
    }
}

// --- CLIENTES ---

export async function getClients() {
    try {
        const result = await query(`
            SELECT * FROM clients
            ORDER BY full_name ASC
        `);

        return result.rows;
    } catch (error) {
        console.error('Error in getClients:', error);
        return [];
    }
}

export async function createClient(clientData: any) {
    try {
        await query(`
            INSERT INTO clients (full_name, document_id, email, phone, address, notes)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [
            clientData.full_name,
            clientData.document_id,
            clientData.email,
            clientData.phone,
            clientData.address,
            clientData.notes
        ]);

        revalidatePath('/dashboard/clientes');
        return { success: true };
    } catch (error: any) {
        console.error('Error creating client:', error);
        return { success: false, error: error.message };
    }
}

export async function updateClient(id: string, clientData: any) {
    try {
        await query(`
            UPDATE clients
            SET full_name = $1, document_id = $2, email = $3, phone = $4, address = $5, notes = $6
            WHERE id = $7
        `, [
            clientData.full_name,
            clientData.document_id,
            clientData.email,
            clientData.phone,
            clientData.address,
            clientData.notes,
            id
        ]);

        revalidatePath('/dashboard/clientes');
        return { success: true };
    } catch (error: any) {
        console.error('Error updating client:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteClient(id: string) {
    try {
        await query('DELETE FROM clients WHERE id = $1', [id]);
        revalidatePath('/dashboard/clientes');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting client:', error);
        return { success: false, error: error.message };
    }
}

// --- DOCUMENTOS ---

export async function getDocuments(category?: string) {
    try {
        let sql = 'SELECT * FROM documents ORDER BY created_at DESC';
        let params: any[] = [];

        if (category && category !== 'Todos') {
            sql = 'SELECT * FROM documents WHERE category = $1 ORDER BY created_at DESC';
            params = [category.toLowerCase()];
        }

        const result = await query(sql, params);
        return result.rows;
    } catch (error) {
        console.error('Error in getDocuments:', error);
        return [];
    }
}

// --- DASHBOARD ---

export async function getDashboardStats() {
    try {
        const processesResult = await query('SELECT COUNT(*) as count FROM processes WHERE status = $1', ['active']);
        const clientsResult = await query('SELECT COUNT(*) as count FROM clients WHERE created_at >= NOW() - INTERVAL \'30 days\'');
        const remindersResult = await query('SELECT COUNT(*) as count FROM reminders WHERE reminder_date <= NOW() + INTERVAL \'7 days\' AND is_read = false');
        const financialResult = await query('SELECT SUM(amount) as total FROM financial_transactions WHERE type = $1 AND EXTRACT(MONTH FROM transaction_date) = EXTRACT(MONTH FROM NOW())', ['income']);

        return [
            {
                label: 'Processos Ativos',
                value: processesResult.rows[0].count.toString(),
                change: '+5',
                trend: 'up'
            },
            {
                label: 'Novos Clientes',
                value: clientsResult.rows[0].count.toString(),
                change: '+3',
                trend: 'up'
            },
            {
                label: 'Prazos Próximos',
                value: remindersResult.rows[0].count.toString(),
                change: '+2',
                trend: 'up'
            },
            {
                label: 'Faturamento Mes',
                value: `R$ ${parseFloat(financialResult.rows[0].total || 0).toLocaleString('pt-BR')}`,
                change: '+12%',
                trend: 'up'
            }
        ];
    } catch (error) {
        console.error('Error in getDashboardStats:', error);
        return [];
    }
}

export async function getProfile() {
    // Temporário - retorna dados mockados
    // Depois vamos pegar do JWT token
    return {
        full_name: 'Administrador',
        role: 'admin',
        email: 'admin@sistema.com'
    };
}

export async function getPendingReminders() {
    try {
        const result = await query(`
            SELECT * FROM reminders
            WHERE is_read = false
            AND reminder_date <= NOW() + INTERVAL '7 days'
            ORDER BY reminder_date ASC
            LIMIT 5
        `);

        return result.rows;
    } catch (error) {
        console.error('Error in getPendingReminders:', error);
        return [];
    }
}

// --- BUSCA GLOBAL ---

export async function globalSearch(searchQuery: string) {
    try {
        const processesResult = await query(`
            SELECT id, process_number, title
            FROM processes
            WHERE process_number ILIKE $1 OR title ILIKE $1
            LIMIT 5
        `, [`%${searchQuery}%`]);

        const clientsResult = await query(`
            SELECT id, full_name, email
            FROM clients
            WHERE full_name ILIKE $1 OR email ILIKE $1
            LIMIT 5
        `, [`%${searchQuery}%`]);

        return {
            processes: processesResult.rows,
            clients: clientsResult.rows
        };
    } catch (error) {
        console.error('Error in globalSearch:', error);
        return { processes: [], clients: [] };
    }
}

// --- NOTIFICAÇÕES ---

export async function getNotifications() {
    try {
        const result = await query(`
            SELECT * FROM reminders
            ORDER BY created_at DESC
            LIMIT 20
        `);

        return result.rows;
    } catch (error) {
        console.error('Error in getNotifications:', error);
        return [];
    }
}

export async function markNotificationAsRead(id: string) {
    try {
        await query('UPDATE reminders SET is_read = true WHERE id = $1', [id]);
        return { success: true };
    } catch (error: any) {
        console.error('Error marking notification as read:', error);
        return { success: false, error: error.message };
    }
}

// --- AGENDA/APPOINTMENTS ---

export async function getAppointments() {
    try {
        const result = await query(`
            SELECT * FROM appointments
            ORDER BY start_time ASC
        `);
        return result.rows;
    } catch (error) {
        console.error('Error in getAppointments:', error);
        return [];
    }
}

// --- FINANCEIRO ---

export async function getInvoices() {
    try {
        const result = await query(`
            SELECT * FROM financial_transactions
            ORDER BY transaction_date DESC
        `);
        return result.rows;
    } catch (error) {
        console.error('Error in getInvoices:', error);
        return [];
    }
}

export async function createInvoice(data: any) {
    try {
        await query(`
            INSERT INTO financial_transactions (description, amount, type, category, transaction_date)
            VALUES ($1, $2, $3, $4, $5)
        `, [data.description, data.amount, data.type, data.category, data.transaction_date]);
        
        revalidatePath('/dashboard/financeiro');
        return { success: true };
    } catch (error: any) {
        console.error('Error creating invoice:', error);
        return { success: false, error: error.message };
    }
}

// --- PETIÇÕES ---

export async function getPetitionTemplates() {
    try {
        // Retorna array vazio por enquanto - implementar depois
        return [];
    } catch (error) {
        console.error('Error in getPetitionTemplates:', error);
        return [];
    }
}

export async function generatePetition(data: any) {
    try {
        // Implementação futura
        return { success: true, content: '' };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function savePetition(data: any) {
    try {
        // Implementação futura
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- DOCUMENTOS ---

export async function uploadFile(data: any) {
    try {
        await query(`
            INSERT INTO documents (name, file_path, file_size, mime_type, category, process_id)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [data.name, data.file_path, data.file_size, data.mime_type, data.category, data.process_id]);
        
        revalidatePath('/dashboard/documentos');
        return { success: true };
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return { success: false, error: error.message };
    }
}

export async function deleteDocument(id: string) {
    try {
        await query('DELETE FROM documents WHERE id = $1', [id]);
        revalidatePath('/dashboard/documentos');
        return { success: true };
    } catch (error: any) {
        console.error('Error deleting document:', error);
        return { success: false, error: error.message };
    }
}

export async function renameDocument(id: string, newName: string) {
    try {
        await query('UPDATE documents SET name = $1 WHERE id = $2', [newName, id]);
        revalidatePath('/dashboard/documentos');
        return { success: true };
    } catch (error: any) {
        console.error('Error renaming document:', error);
        return { success: false, error: error.message };
    }
}

// --- PERFIL/SETTINGS ---

export async function updateProfile(data: any) {
    try {
        // Implementação futura - atualizar perfil do usuário
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- WHATSAPP ---

export async function getWhatsAppLink(phone: string, message?: string) {
    try {
        const cleanPhone = phone.replace(/\D/g, '');
        const encodedMessage = message ? encodeURIComponent(message) : '';
        return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
    } catch (error) {
        console.error('Error generating WhatsApp link:', error);
        return '';
    }
}
