"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ExternalLink,
    Briefcase
} from "lucide-react";
import NewProcessModal from "@/components/NewProcessModal";

const statusStyles: any = {
    "Ativo": "bg-emerald-100 text-emerald-700",
    "Audiência": "bg-blue-100 text-blue-700",
    "Suspenso": "bg-slate-100 text-slate-700",
    "Sentença": "bg-amber-100 text-amber-700",
};

interface ProcessosClientPageProps {
    initialProcessos: any[];
    clients: any[];
}

export default function ProcessosClientPage({ initialProcessos, clients }: ProcessosClientPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [processos] = useState(initialProcessos);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Processos</h1>
                    <p className="text-slate-500 mt-1">Gerencie e acompanhe todos os processos jurídicos do escritório.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0"
                >
                    <Plus size={20} />
                    Novo Processo
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Pesquisar processos..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all w-full md:w-auto justify-center">
                        <Filter size={16} />
                        Filtros Avançados
                    </button>
                </div>

                <div className="overflow-x-auto text-slate-900">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold">Número/Título</th>
                                <th className="px-6 py-4 font-bold">Cliente</th>
                                <th className="px-6 py-4 font-bold">Categoria</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {processos.map((proc: any) => (
                                <tr key={proc.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Briefcase size={18} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">{proc.numero}</div>
                                                <div className="text-xs text-slate-500 font-semibold">{proc.titulo}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{proc.cliente}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{proc.categoria}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusStyles[proc.status] || 'bg-slate-100'}`}>
                                            {proc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                <ExternalLink size={18} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                    <span>Mostrando {processos.length} processos</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Próximo</button>
                    </div>
                </div>
            </div>

            <NewProcessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                clients={clients}
            />
        </div>
    );
}
