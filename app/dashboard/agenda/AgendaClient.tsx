"use client";

import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    User,
    Plus,
    Calendar as CalendarIcon,
    Lightbulb
} from "lucide-react";

interface AgendaClientProps {
    initialAppointments: any[];
}

export default function AgendaClient({ initialAppointments }: AgendaClientProps) {
    const [currentDate] = useState(new Date());
    const [appointments] = useState(initialAppointments);

    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Helper para filtrar compromissos do dia selecionado (neste exemplo, hoje)
    const todayStr = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(app => app.date === todayStr);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agenda</h1>
                    <p className="text-slate-500 mt-1">Gerencie seus prazos e reuniões de forma integrada.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0">
                    <Plus size={20} />
                    Novo Compromisso
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-bold text-slate-900">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                                <div className="flex bg-slate-100 rounded-lg p-1">
                                    <button className="p-1.5 hover:bg-white rounded-md transition-all text-slate-500 hover:text-primary">
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button className="p-1.5 hover:bg-white rounded-md transition-all text-slate-500 hover:text-primary">
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-4 py-2 text-sm font-bold text-primary bg-primary/10 rounded-lg">Mês</button>
                                <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Semana</button>
                                <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg">Dia</button>
                            </div>
                        </div>

                        <div className="p-0">
                            <div className="grid grid-cols-7 border-b border-slate-100">
                                {days.map(day => (
                                    <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7">
                                {Array.from({ length: 35 }).map((_, i) => {
                                    const dayNum = i - 3; // Ajuste simplificado
                                    const isToday = dayNum === currentDate.getDate();
                                    const hasEvent = [12, 18, 25].includes(dayNum);

                                    return (
                                        <div key={i} className={`min-h-[120px] p-2 border-r border-b border-slate-50 group hover:bg-slate-50/50 transition-colors cursor-pointer ${i % 7 === 6 ? 'border-r-0' : ''}`}>
                                            <div className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full mb-2 transition-all ${isToday ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-600 group-hover:text-primary'
                                                }`}>
                                                {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                                            </div>

                                            {dayNum > 0 && dayNum <= 31 && hasEvent && (
                                                <div className="space-y-1">
                                                    <div className="px-1.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded border-l-2 border-blue-500 truncate">
                                                        Audiência...
                                                    </div>
                                                    <div className="px-1.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded border-l-2 border-emerald-500 truncate">
                                                        Reunião...
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-slate-900">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <CalendarIcon size={20} className="text-primary" />
                            Compromissos de Hoje
                        </h3>

                        <div className="space-y-4">
                            {todayAppointments.map((app) => (
                                <div key={app.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group cursor-pointer border-l-4 border-l-primary">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase">
                                            <Clock size={12} />
                                            {app.time}
                                        </span>
                                        <span className="p-1 px-2 bg-white rounded text-[10px] font-bold text-slate-400 border border-slate-100">
                                            Tribunal
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-900 mb-2 truncate group-hover:text-primary transition-colors">{app.title}</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <MapPin size={12} />
                                            <span className="truncate">{app.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <User size={12} />
                                            <span>{app.client}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {todayAppointments.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-sm text-slate-400">Nenhum compromisso para hoje.</p>
                                </div>
                            )}
                        </div>

                        <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                            Ver Agenda Completa
                        </button>
                    </div>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-slate-900">
                        <div className="flex items-center gap-2 text-primary mb-3">
                            <Lightbulb size={20} />
                            <h3 className="font-bold text-sm">Sugestão da IA</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            Você tem 3 prazos vencendo amanhã. Recomendo revisar a petição do processo <span className="text-primary font-bold">456/2024</span> hoje à tarde.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
