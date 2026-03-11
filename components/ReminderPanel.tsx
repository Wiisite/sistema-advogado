"use client";

import React from "react";
import { MessageCircle, Clock, Calendar, DollarSign, ArrowRight } from "lucide-react";

interface Reminder {
    id: string;
    type: 'appointment' | 'invoice';
    title: string;
    client: string;
    phone: string;
    time?: string;
    amount?: string;
    message: string;
    link: string;
}

interface ReminderPanelProps {
    reminders: Reminder[];
}

export default function ReminderPanel({ reminders }: ReminderPanelProps) {
    if (!reminders || reminders.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <MessageCircle size={18} className="text-emerald-500" />
                        <h3 className="font-bold text-slate-900 text-lg">Lembretes para Amanhã</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Envie avisos rápidos via WhatsApp para seus clientes</p>
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {reminders.length} {reminders.length === 1 ? 'Pendente' : 'Pendentes'}
                </span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto custom-scrollbar">
                {reminders.map((reminder) => (
                    <div key={reminder.id} className="p-5 hover:bg-slate-50 transition-colors group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex gap-4">
                                <div className={`p-3 rounded-xl shrink-0 ${reminder.type === 'appointment' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    {reminder.type === 'appointment' ? <Calendar size={20} /> : <DollarSign size={20} />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-slate-900">{reminder.client}</span>
                                        <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${reminder.type === 'appointment' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                            }`}>
                                            {reminder.type === 'appointment' ? 'Compromisso' : 'Cobrança'}
                                        </span>
                                    </div>
                                    <h4 className="text-sm text-slate-600 font-medium mb-1 line-clamp-1">{reminder.title}</h4>
                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {reminder.type === 'appointment' ? reminder.time : 'Vencimento amanhã'}
                                        </div>
                                        {reminder.amount && (
                                            <div className="flex items-center gap-1 text-emerald-600">
                                                <DollarSign size={14} />
                                                R$ {reminder.amount}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <a
                                href={reminder.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95 shrink-0"
                                onClick={(e) => {
                                    // Opcional: registrar que foi enviado
                                }}
                            >
                                <MessageCircle size={18} />
                                Disparar WhatsApp
                                <ArrowRight size={14} className="opacity-50" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
