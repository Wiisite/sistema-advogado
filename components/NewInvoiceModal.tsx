"use client";

import React, { useState } from "react";
import { X, DollarSign, Calendar, User, FileText, Check, Loader2 } from "lucide-react";
import { createInvoice } from "@/lib/actions";

interface NewInvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    clients: any[];
    processes: any[];
}

export default function NewInvoiceModal({ isOpen, onClose, clients, processes }: NewInvoiceModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        due_date: "",
        client_id: "",
        process_id: "",
        category: "honorários"
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await createInvoice({
            ...formData,
            amount: parseFloat(formData.amount),
            process_id: formData.process_id || undefined
        });

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
                setFormData({
                    description: "",
                    amount: "",
                    due_date: "",
                    client_id: "",
                    process_id: "",
                    category: "honorários"
                });
            }, 2000);
        } else {
            alert("Erro ao criar faturamento: " + result.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 text-slate-900">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Novo Faturamento</h2>
                            <p className="text-xs text-slate-500">Registre honorários ou custas processuais.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Descrição</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Ex: Honorários Iniciais - Processo João Silva"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Valor (R$)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    placeholder="0,00"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Data de Vencimento</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    required
                                    type="date"
                                    value={formData.due_date}
                                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-slate-900"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Cliente</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={18} />
                            <select
                                required
                                value={formData.client_id}
                                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-slate-900"
                            >
                                <option value="">Selecione um cliente...</option>
                                {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Categoria</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-slate-900"
                            >
                                <option value="honorários">Honorários</option>
                                <option value="custas">Custas</option>
                                <option value="reembolso">Reembolso</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Processo (Opcional)</label>
                            <select
                                value={formData.process_id}
                                onChange={(e) => setFormData({ ...formData, process_id: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-slate-900"
                            >
                                <option value="">Sem vínculo...</option>
                                {processes.map(p => <option key={p.id} value={p.id}>{p.process_number}</option>)}
                            </select>
                        </div>
                    </div>

                    <button
                        disabled={isLoading || success}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-white ${success ? "bg-emerald-500" : "bg-primary hover:bg-primary/90 shadow-primary/20"
                            }`}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : success ? (
                            <><Check size={20} /> Cadastrado com Sucesso!</>
                        ) : (
                            "Cadastrar Lançamento"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
