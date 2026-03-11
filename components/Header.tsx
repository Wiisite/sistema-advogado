"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Bell,
    Search,
    Menu,
    User,
    Briefcase,
    Users,
    X,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    Info,
    Clock
} from "lucide-react";
import { globalSearch, getNotifications, markNotificationAsRead } from "@/lib/actions";
import Link from "next/link";

export default function Header() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<{ processes: any[], clients: any[] }>({ processes: [], clients: [] });
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const [notifications, setNotifications] = useState<any[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const searchRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const notifs = await getNotifications();
            setNotifications(notifs);
            setUnreadCount(notifs.filter((n: any) => !n.is_read).length);
        };
        fetchData();

        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchResults(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = async (val: string) => {
        setQuery(val);
        if (val.length >= 2) {
            setIsSearching(true);
            setShowSearchResults(true);
            const res = await globalSearch(val);
            setSearchResults(res);
            setIsSearching(false);
        } else {
            setShowSearchResults(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        const res = await markNotificationAsRead(id);
        if (res.success) {
            setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'danger': return <AlertTriangle size={16} className="text-rose-500" />;
            case 'warning': return <Clock size={16} className="text-amber-500" />;
            case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />;
            default: return <Info size={16} className="text-blue-500" />;
        }
    };

    return (
        <header className="bg-dark border-b border-darker h-20 flex items-center justify-between px-6 lg:px-10 z-30 shrink-0 relative">
            <div className="flex items-center gap-4 flex-1">
                <button className="lg:hidden p-2 text-slate-300 hover:bg-darker rounded-lg">
                    <Menu className="w-6 h-6" />
                </button>

                {/* Busca Global */}
                <div className="hidden md:flex flex-col w-full max-w-md relative" ref={searchRef}>
                    <div className="flex items-center bg-darker rounded-lg px-4 py-2.5 gap-3 focus-within:ring-2 focus-within:ring-primary/40 transition-all border border-transparent focus-within:border-primary shadow-sm">
                        <Search size={18} className={isSearching ? "text-primary animate-pulse" : "text-slate-400"} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            onFocus={() => query.length >= 2 && setShowSearchResults(true)}
                            placeholder="Buscar processos, clientes..."
                            className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm w-full text-white placeholder:text-slate-400 font-medium"
                        />
                        {query && (
                            <button onClick={() => { setQuery(""); setShowSearchResults(false); }} className="text-slate-400 hover:text-white transition-colors">
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {showSearchResults && (
                        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                            {isSearching ? (
                                <div className="p-8 flex flex-col items-center justify-center text-slate-400 gap-3">
                                    <Loader2 className="animate-spin text-primary" size={24} />
                                    <span className="text-sm font-medium">Buscando na base de dados...</span>
                                </div>
                            ) : searchResults.processes.length === 0 && searchResults.clients.length === 0 ? (
                                <div className="p-8 text-center text-slate-400">
                                    <p className="text-sm font-medium">Nenhum resultado para "{query}"</p>
                                </div>
                            ) : (
                                <div className="max-h-[400px] overflow-y-auto">
                                    {searchResults.processes.length > 0 && (
                                        <div className="p-2">
                                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Processos</h3>
                                            {searchResults.processes.map((p) => (
                                                <Link
                                                    key={p.id}
                                                    href={`/dashboard/processos/${p.id}`}
                                                    onClick={() => setShowSearchResults(false)}
                                                    className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all group"
                                                >
                                                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                        <Briefcase size={16} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</span>
                                                        <span className="text-[10px] text-slate-500 font-bold">{p.process_number}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
                {/* Notificações */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-2.5 rounded-lg transition-all ${showNotifications ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-300 hover:bg-darker hover:text-white"
                            }`}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center animate-bounce">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute top-full mt-2 right-0 w-80 md:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-bold text-slate-900">Notificações</h3>
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase">Recentes</span>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length > 0 ? (
                                    <div className="divide-y divide-slate-50 px-2 pb-2">
                                        {notifications.map((n) => (
                                            <div
                                                key={n.id}
                                                onClick={() => !n.is_read && handleMarkAsRead(n.id)}
                                                className={`p-4 hover:bg-slate-50 rounded-xl transition-all cursor-pointer flex gap-3 relative group mt-1 ${!n.is_read ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <div className={`mt-1 h-fit p-2 rounded-lg ${n.type === 'danger' ? 'bg-rose-50' :
                                                        n.type === 'warning' ? 'bg-amber-50' :
                                                            n.type === 'success' ? 'bg-emerald-50' : 'bg-blue-50'
                                                    }`}>
                                                    {getNotificationIcon(n.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h4 className={`text-sm font-bold ${!n.is_read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</h4>
                                                        {!n.is_read && <div className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{n.message}</p>
                                                    <span className="text-[10px] text-slate-400 mt-2 block font-medium">
                                                        {new Date(n.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center text-slate-400">
                                        <Bell size={40} className="mx-auto mb-3 opacity-20" />
                                        <p className="text-sm font-medium">Nenhuma notificação por aqui.</p>
                                    </div>
                                )}
                            </div>

                            <Link href="/dashboard/configuracoes" className="block p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] font-bold text-slate-500 hover:text-primary transition-colors">
                                VER TODAS AS NOTIFICAÇÕES
                            </Link>
                        </div>
                    )}
                </div>

                <div className="h-10 w-[1px] bg-darker hidden sm:block" />

                <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-sm font-bold text-white">Dr. Lucas Silva</span>
                        <span className="text-xs text-slate-400">OAB/SP 123.456</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
}
