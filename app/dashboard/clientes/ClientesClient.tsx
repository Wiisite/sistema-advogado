"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    User,
    Phone,
    Mail,
    MapPin,
    Scale
} from "lucide-react";

interface ClientesClientPageProps {
    initialClientes: any[];
}

export default function ClientesClientPage({ initialClientes }: ClientesClientPageProps) {
    const [clientes] = useState(initialClientes);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clientes</h1>
                    <p className="text-slate-500 mt-1">Base de dados unificada de todos os clientes do escritório.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0">
                    <Plus size={20} />
                    Novo Cliente
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {clientes.map((cliente: any) => (
                    <div key={cliente.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden text-slate-900">
                        <div className="absolute top-0 right-0 p-4">
                            <button className="text-slate-400 hover:text-slate-600 transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                <User size={28} />
                            </div>
                            <div className="flex-1 min-w-0 pr-6">
                                <h3 className="font-bold text-lg text-slate-900 truncate mb-1">{cliente.nome || cliente.full_name}</h3>
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cliente.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {cliente.status || 'Ativo'}
                                </span>
                                <div className="text-xs text-slate-400 mt-1 font-medium">{cliente.documentos || cliente.cpf}</div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                    <Mail size={14} className="text-slate-400" />
                                </div>
                                <span className="truncate">{cliente.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                    <Phone size={14} className="text-slate-400" />
                                </div>
                                <span>{cliente.telefone || cliente.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                    <MapPin size={14} className="text-slate-400" />
                                </div>
                                <span className="truncate">{cliente.endereco || 'Endereço não cadastrado'}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex gap-2">
                            <button className="flex-1 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                                Ver Perfil
                            </button>
                            <button className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                <Scale size={14} />
                                Processos
                            </button>
                        </div>
                    </div>
                ))}

                {clientes.length === 0 && (
                    <div className="md:col-span-3 py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <User size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">Nenhum cliente cadastrado ainda.</p>
                        <button className="mt-4 text-primary font-bold hover:underline">Cadastrar primeiro cliente</button>
                    </div>
                )}
            </div>
        </div>
    );
}
