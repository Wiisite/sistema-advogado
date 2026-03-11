"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Eye,
    Edit,
    Trash2,
    Phone,
    Mail,
    FileText,
    MessageSquare,
    Download,
    Upload,
    Calendar,
    DollarSign,
    MoreHorizontal
} from "lucide-react";
import ClienteModal from "@/components/ClienteModal";
import { createClient, updateClient, deleteClient } from "@/lib/actions";

interface ClientesClientPageProps {
    initialClientes: any[];
}

export default function ClientesClientTable({ initialClientes }: ClientesClientPageProps) {
    const [clientes, setClientes] = useState(initialClientes);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState<any>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    const filteredClientes = clientes.filter((cliente: any) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (cliente.full_name || cliente.nome || "").toLowerCase().includes(searchLower) ||
            (cliente.email || "").toLowerCase().includes(searchLower) ||
            (cliente.phone || cliente.telefone || "").toLowerCase().includes(searchLower)
        );
    });

    const handleSaveCliente = async (data: any) => {
        try {
            if (modalMode === 'create') {
                const result: any = await createClient(data);
                if (result.success) {
                    window.location.reload();
                } else {
                    alert('Erro ao criar cliente: ' + (result.error || 'Erro desconhecido'));
                }
            } else {
                const result: any = await updateClient(selectedCliente.id, data);
                if (result.success) {
                    window.location.reload();
                } else {
                    alert('Erro ao atualizar cliente: ' + (result.error || 'Erro desconhecido'));
                }
            }
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            alert('Erro ao salvar cliente. Verifique o console para mais detalhes.');
        }
    };

    const handleEditCliente = (cliente: any) => {
        setSelectedCliente(cliente);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleDeleteCliente = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            const result = await deleteClient(id);
            if (result.success) {
                setClientes(clientes.filter((c: any) => c.id !== id));
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clientes</h1>
                    <p className="text-slate-500 mt-1">Gestão completa da base de clientes</p>
                </div>
                <button 
                    onClick={() => {
                        setSelectedCliente(null);
                        setModalMode('create');
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0"
                >
                    <Plus size={20} />
                    Adicionar Clientes
                </button>
            </div>

            {/* Filtros e Busca */}
            <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Buscar clientes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors">
                        <Download size={18} />
                        Exportar
                    </button>
                </div>
            </div>

            {/* Tabela */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Seleção</th>
                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Telefone</th>
                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Tipo Pessoa</th>
                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Indicado Por</th>
                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Data Cadastro</th>
                                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredClientes.map((cliente: any, index: number) => (
                                <tr key={cliente.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900">{cliente.full_name || cliente.nome || "****"}</span>
                                            <span className="text-xs text-slate-500">{cliente.document_id || cliente.cpf || "***.***.***-**"}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{cliente.phone || cliente.telefone || "(00) 00000-0000"}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-white">
                                            FÍSICO
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">-</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">
                                            {new Date(cliente.created_at || Date.now()).toLocaleDateString('pt-BR')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" title="Visualizar">
                                                <Eye size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteCliente(cliente.id)}
                                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors" 
                                                title="Excluir"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleEditCliente(cliente)}
                                                className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors" 
                                                title="Editar"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors" title="WhatsApp">
                                                <MessageSquare size={14} />
                                            </button>
                                            <button className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors" title="Documentos">
                                                <FileText size={14} />
                                            </button>
                                            <button className="p-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors" title="Processos">
                                                <FileText size={14} />
                                            </button>
                                            <button className="p-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors" title="Financeiro">
                                                <DollarSign size={14} />
                                            </button>
                                            <button className="p-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors" title="Agenda">
                                                <Calendar size={14} />
                                            </button>
                                            <button className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors" title="Upload">
                                                <Upload size={14} />
                                            </button>
                                            <button className="p-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors" title="Email">
                                                <Mail size={14} />
                                            </button>
                                            <button className="p-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-colors" title="Mais">
                                                <MoreHorizontal size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                        Mostrando 1 de {filteredClientes.length} ({filteredClientes.length} registros)
                    </span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-primary text-white rounded font-bold hover:bg-primary/90 transition-colors">
                            1
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded font-bold hover:bg-slate-200 transition-colors">
                            2
                        </button>
                        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded font-bold hover:bg-slate-200 transition-colors">
                            Próximo
                        </button>
                    </div>
                </div>
            </div>

            <ClienteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveCliente}
                cliente={selectedCliente}
                mode={modalMode}
            />
        </div>
    );
}
