"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Clock,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    Download
} from "lucide-react";
import NewInvoiceModal from "@/components/NewInvoiceModal";
import BarChart from "@/components/BarChart";

const statusStyles: any = {
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-blue-100 text-blue-700",
    overdue: "bg-rose-100 text-rose-700",
    cancelled: "bg-slate-100 text-slate-500",
};

const statusLabels: any = {
    paid: "Pago",
    pending: "Pendente",
    overdue: "Atrasado",
    cancelled: "Cancelado",
};

interface FinanceiroClientProps {
    initialInvoices: any[];
    clients: any[];
    processes: any[];
}

export default function FinanceiroClient({ initialInvoices, clients, processes }: FinanceiroClientProps) {
    const [invoices] = useState(initialInvoices);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const totalRecebido = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalPendente = invoices.filter(i => i.status === 'pending').reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalAtrasado = invoices.filter(i => i.status === 'overdue').reduce((acc, curr) => acc + Number(curr.amount), 0);

    // Processar dados para o gráfico (últimos 6 meses)
    const chartData = Array.from({ length: 6 }).map((_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (5 - i));
        const monthYear = d.toLocaleDateString('pt-BR', { month: 'short' });

        const monthlyTotal = invoices
            .filter(inv => {
                const invDate = new Date(inv.due_date);
                return inv.status === 'paid' &&
                    invDate.getMonth() === d.getMonth() &&
                    invDate.getFullYear() === d.getFullYear();
            })
            .reduce((acc, curr) => acc + Number(curr.amount), 0);

        return {
            month: monthYear.replace('.', ''),
            amount: monthlyTotal
        };
    });

    return (
        <div className="space-y-6 text-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Financeiro</h1>
                    <p className="text-slate-500 mt-1">Gestão de honorários, custas e fluxo de caixa do escritório.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0"
                >
                    <Plus size={20} />
                    Novo Lançamento
                </button>
            </div>

            <NewInvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                clients={clients}
                processes={processes}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-emerald-500 bg-opacity-10 text-emerald-600">
                            <TrendingUp size={24} />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">R$ {totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div className="text-sm text-slate-500 font-medium">Total Recebido</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-500 bg-opacity-10 text-blue-600">
                            <Clock size={24} />
                        </div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{invoices.filter(i => i.status === 'pending').length} guias</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">R$ {totalPendente.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div className="text-sm text-slate-500 font-medium">Pendente (A receber)</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-rose-500 bg-opacity-10 text-rose-600">
                            <TrendingDown size={24} />
                        </div>
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">Atenção</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">R$ {totalAtrasado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    <div className="text-sm text-slate-500 font-medium">Total em Atraso</div>
                </div>
            </div>

            <BarChart
                data={chartData}
                title="Desempenho de Receita"
                subtitle="Faturamento mensal (Pagos)"
                color="bg-emerald-500"
                labelSuffix="R$ "
            />

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-xs text-slate-900">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Pesquisar lançamentos..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all w-full md:w-auto justify-center">
                        <Filter size={16} />
                        Filtrar por Status
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold">Descrição / Cliente</th>
                                <th className="px-6 py-4 font-bold">Valor</th>
                                <th className="px-6 py-4 font-bold">Vencimento</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {invoices.map((inv: any) => (
                                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                                <DollarSign size={18} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm truncate max-w-[250px]">{inv.description}</div>
                                                <div className="text-xs text-slate-500 font-medium">{inv.clients?.full_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">R$ {Number(inv.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(inv.due_date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit ${statusStyles[inv.status]}`}>
                                            {inv.status === 'paid' && <CheckCircle2 size={12} />}
                                            {inv.status === 'pending' && <Clock size={12} />}
                                            {inv.status === 'overdue' && <AlertCircle size={12} />}
                                            {statusLabels[inv.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                <Download size={18} />
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

                    {invoices.length === 0 && (
                        <div className="p-20 text-center text-slate-300">
                            <DollarSign size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="font-bold">Nenhum lançamento financeiro.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
