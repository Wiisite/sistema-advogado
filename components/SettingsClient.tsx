"use client";

import React, { useState } from "react";
import {
    User,
    Bell,
    Lock,
    Shield,
    Globe,
    Save,
    Camera,
    ChevronRight,
    Mail,
    Smartphone
} from "lucide-react";
import { updateProfile } from "@/lib/actions";

interface SettingsClientProps {
    initialProfile: any;
}

export default function SettingsClient({ initialProfile }: SettingsClientProps) {
    const [profile, setProfile] = useState(initialProfile);
    const [activeTab, setActiveTab] = useState("perfil");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const tabs = [
        { id: "perfil", label: "Meu Perfil", icon: User },
        { id: "notificacoes", label: "Notificações", icon: Bell },
        { id: "seguranca", label: "Segurança", icon: Lock },
        { id: "sistema", label: "Preferências", icon: Globe },
    ];

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: "", text: "" });

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const result = await updateProfile(formData);

        setIsSaving(false);
        if (result.success) {
            setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
        } else {
            setMessage({ type: "error", text: result.error || "Erro ao atualizar perfil." });
        }
    };

    return (
        <div className="space-y-6 text-slate-900">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Configurações</h1>
                <p className="text-slate-500 mt-1">Gerencie suas informações pessoais e preferências de conta.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === tab.id
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">
                    {activeTab === "perfil" && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                <h3 className="text-lg font-bold text-slate-900">Informações Pessoais</h3>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acesso de Advogado</span>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="p-8 space-y-8">
                                {/* Avatar Section */}
                                <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-all border-2 border-dashed border-primary">
                                            {profile.avatar_url ? (
                                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                                            ) : (
                                                <User size={40} />
                                            )}
                                        </div>
                                        <button type="button" className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-200 text-primary hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                                            <Camera size={16} />
                                        </button>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Foto de Perfil</h4>
                                        <p className="text-xs text-slate-500 mt-1">Recomendado: JPG ou PNG de até 2MB e 400x400px.</p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nome Completo</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            defaultValue={profile.full_name}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Inscrição OAB</label>
                                        <input
                                            type="text"
                                            name="oab_registry"
                                            defaultValue={profile.oab_registry}
                                            placeholder="Ex: 123.456/SP"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Mail size={14} className="text-slate-400" />
                                            E-mail Profissional
                                        </label>
                                        <input
                                            type="email"
                                            disabled
                                            defaultValue={profile.email}
                                            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Smartphone size={14} className="text-slate-400" />
                                            Telefone / WhatsApp
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="(11) 99999-9999"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                                        />
                                    </div>
                                </div>

                                {message.text && (
                                    <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {message.text}
                                    </div>
                                )}

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 disabled:opacity-50"
                                    >
                                        {isSaving ? "Salvando..." : <><Save size={18} /> Salvar Alterações</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === "notificacoes" && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                                <h3 className="text-lg font-bold text-slate-900">Preferências de Notificação</h3>
                            </div>
                            <div className="p-8 space-y-6">
                                {[
                                    { title: "Prazos Processuais", desc: "Receba alertas sobre novos prazos e vencimentos." },
                                    { title: "Novas Publicações", desc: "Notificar quando houver movimentação nos seus processos." },
                                    { title: "Agenda Diária", desc: "Receber o resumo dos compromissos pela manhã." },
                                    { title: "Comunicações do Sistema", desc: "Novidades sobre funcionalidades e atualizações." },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all">
                                        <div className="max-w-md">
                                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "seguranca" && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                                <h3 className="text-lg font-bold text-slate-900">Segurança da Conta</h3>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <Lock size={16} className="text-primary" />
                                        Alterar Senha
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="password" placeholder="Senha Atual" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900" />
                                        <input type="password" placeholder="Nova Senha" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900" />
                                    </div>
                                    <button className="text-sm font-bold text-primary hover:underline">Solicitar nova senha por e-mail</button>
                                </div>

                                <div className="pt-8 border-t border-slate-100 space-y-4">
                                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                        <Shield size={16} className="text-emerald-500" />
                                        Autenticação em Duas Etapas (2FA)
                                    </h4>
                                    <p className="text-xs text-slate-500">Aumente a segurança da sua conta adicionando uma camada extra de verificação via SMS ou App.</p>
                                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold hover:bg-emerald-100 transition-all">Configurar 2FA</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
