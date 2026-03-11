"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Scale,
    LayoutDashboard,
    Briefcase,
    Users,
    Calendar,
    FileText,
    Settings,
    HelpCircle,
    ChevronLeft,
    DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Painel Geral", href: "/dashboard" },
    { icon: Briefcase, label: "Processos", href: "/dashboard/processos" },
    { icon: Users, label: "Clientes", href: "/dashboard/clientes" },
    { icon: Calendar, label: "Agenda", href: "/dashboard/agenda" },
    { icon: DollarSign, label: "Financeiro", href: "/dashboard/financeiro" },
    { icon: FileText, label: "Documentos", href: "/dashboard/documentos" },
];

const secondaryMenuItems = [
    { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
    { icon: HelpCircle, label: "Suporte", href: "/dashboard/suporte" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex flex-col w-72 bg-dark border-r border-darker shadow-lg z-20">
            <div className="p-6 flex items-center gap-3 border-b border-darker">
                <div className="bg-primary p-2 rounded-lg shadow-md">
                    <Scale className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                    Dr. Advogado
                </span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                    Menu Principal
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium",
                                isActive
                                    ? "bg-primary/20 text-primary border-l-4 border-primary"
                                    : "text-slate-300 hover:bg-darker hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
                            {item.label}
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 mb-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                        Sistema
                    </div>
                    {secondaryMenuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium",
                                    isActive
                                        ? "bg-primary/20 text-primary border-l-4 border-primary"
                                        : "text-slate-300 hover:bg-darker hover:text-white"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-slate-400")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="p-4 border-t border-darker">
                <div className="bg-darker rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary shadow-sm flex items-center justify-center text-primary font-bold">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Administrador</p>
                        <p className="text-xs text-slate-400 truncate">Sair do sistema</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
