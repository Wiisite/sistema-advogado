import React from "react";
import {
    TrendingUp,
    Briefcase,
    Users,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    LucideIcon
} from "lucide-react";
import { getDashboardStats, getProcesses, getProfile, getPendingReminders } from "@/lib/actions";
import BarChart from "@/components/BarChart";
import ReminderPanel from "@/components/ReminderPanel";

interface StatItem {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: LucideIcon;
    color: string;
}

const iconMap: Record<string, LucideIcon> = {
    "Processos Ativos": Briefcase,
    "Novos Clientes": Users,
    "Prazos Próximos": Clock,
    "Faturamento Mes": TrendingUp,
};

const colorMap: Record<string, string> = {
    "Processos Ativos": "bg-blue-500",
    "Novos Clientes": "bg-emerald-500",
    "Prazos Próximos": "bg-amber-500",
    "Faturamento Mes": "bg-violet-500",
};

export default async function DashboardPage() {
    const [profile, rawStats, processos, reminders] = await Promise.all([
        getProfile(),
        getDashboardStats(),
        getProcesses(),
        getPendingReminders()
    ]);

    let filteredStats = [...rawStats];

    // Se não for admin, trocar o card de faturamento por algo operacional
    if (profile.role !== 'admin') {
        filteredStats = filteredStats.map(s => {
            if (s.label === "Faturamento Mes") {
                return {
                    label: "Processos Concluintes",
                    value: "12",
                    change: "+2",
                    trend: "up"
                };
            }
            return s;
        });
    }

    const stats: StatItem[] = filteredStats.map(s => ({
        ...s,
        icon: iconMap[s.label] || Briefcase,
        color: colorMap[s.label] || "bg-slate-500",
        trend: s.trend as 'up' | 'down'
    }));

    // Mock de dados de produtividade para o gráfico do dashboard
    const productivityData = [
        { month: 'Jan', amount: 45 },
        { month: 'Fev', amount: 52 },
        { month: 'Mar', amount: 48 },
        { month: 'Abr', amount: 61 },
        { month: 'Mai', amount: 55 },
        { month: 'Jun', amount: 67 },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bem-vindo, Dr. Lucas</h1>
                <p className="text-slate-500 mt-1">Aqui está o que está acontecendo com seus processos hoje.</p>
            </div>

            <ReminderPanel reminders={reminders} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-slate-900 group-hover:scale-110 transition-transform`}>
                                {stat.icon && <stat.icon className="w-6 h-6" />}
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                        <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>

            <BarChart
                data={productivityData}
                title="Volume de Processos"
                subtitle="Atividade mensal de abertura de casos"
                color="bg-blue-600"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="font-bold text-lg">Processos Recentes</h3>
                        <button className="text-primary text-sm font-bold hover:underline">Ver todos</button>
                    </div>
                    <div className="p-0">
                        <div className="overflow-x-auto text-slate-900">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-bold">Processo</th>
                                        <th className="px-6 py-4 font-bold">Cliente</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold">Data</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {processos.slice(0, 5).map((proc: any) => (
                                        <tr key={proc.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900 text-sm">{proc.numero}</div>
                                                <div className="text-xs text-slate-500 font-semibold">{proc.categoria} - {proc.titulo}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">{proc.cliente}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${proc.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {proc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">10/03/2026</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-slate-900">
                    <h3 className="font-bold text-lg mb-6">Próximos Prazos</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 items-start group cursor-pointer">
                                <div className="flex flex-col items-center shrink-0">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Mar</span>
                                    <span className="text-xl font-bold text-slate-900 leading-none">{12 + i}</span>
                                </div>
                                <div className="flex-1 pb-4 border-b border-slate-100">
                                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary transition-colors">Protocolar contestação - Proc. 456</h4>
                                    <p className="text-xs text-slate-500 mt-1">Fórum Central - Juizado Especial Cível</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 border-2 border-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 hover:border-slate-200 transition-all">
                        Visualizar Agenda Completa
                    </button>
                </div>
            </div>
        </div>
    );
}
