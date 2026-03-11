"use client";

import React, { useState } from "react";
import {
    X,
    Save,
    Briefcase,
    User,
    Calendar,
    AlertCircle,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { createProcess } from "@/lib/actions";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    clients: any[];
}

export default function NewProcessModal({ isOpen, onClose, clients }: ModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await createProcess(formData);

        setIsLoading(false);
        if (result.success) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col text-slate-900 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Cadastrar Novo Processo</h2>
                        <p className="text-xs text-slate-500 mt-0.5">Preencha os dados abaixo para iniciar o acompanhamento.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="p-8 overflow-y-auto max-h-[70vh] space-y-6">
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in duration-300">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Processo Cadastrado!</h3>
                                <p className="text-slate-500 truncate">O processo foi adicionado ao sistema com sucesso.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <AlertCircle size={14} className="text-primary" />
                                            Número do Processo
                                        </label>
                                        <input
                                            name="numero"
                                            type="text"
                                            required
                                            placeholder="0000000-00.2024.8.26.0000"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Briefcase size={14} className="text-primary" />
                                            Título do Caso
                                        </label>
                                        <input
                                            name="titulo"
                                            type="text"
                                            required
                                            placeholder="Ex: Ação de Indenização"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <User size={14} className="text-primary" />
                                            Cliente
                                        </label>
                                        <select name="client_id" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                                            <option value="">Selecione um cliente...</option>
                                            {clients.map(c => (
                                                <option key={c.id} value={c.id}>{c.nome || c.full_name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Calendar size={14} className="text-primary" />
                                            Categoria
                                        </label>
                                        <select name="categoria" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none">
                                            <option value="Cível">Cível</option>
                                            <option value="Trabalhista">Trabalhista</option>
                                            <option value="Tributário">Tributário</option>
                                            <option value="Família">Família</option>
                                            <option value="Imobiliário">Imobiliário</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Descrição/Obs</label>
                                    <textarea
                                        name="descricao"
                                        rows={4}
                                        placeholder="Detalhes adicionais sobre o processo..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                        {!isSuccess && (
                            <>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-xl transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center gap-2 bg-primary text-white px-8 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
                                >
                                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Salvar Processo
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
