"use client";

import React from "react";
import Link from "next/link";
import { Scale, MapPin, Phone, Mail, Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-primary text-white">
                                <Scale size={24} />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Dr. Advogado
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Excelência jurídica com atendimento humanizado. Protegendo seus direitos com integridade, transparência e dedicação total a cada caso.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary transition-colors text-slate-400 hover:text-white">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary transition-colors text-slate-400 hover:text-white">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary transition-colors text-slate-400 hover:text-white">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Links Rápidos</h4>
                        <ul className="space-y-4 text-slate-400 text-sm font-medium">
                            <li><a href="#home" className="hover:text-primary transition-colors">Início</a></li>
                            <li><a href="#servicos" className="hover:text-primary transition-colors">Áreas de Atuação</a></li>
                            <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre o Escritório</a></li>
                            <li><a href="#contato" className="hover:text-primary transition-colors">Fale Conosco</a></li>
                            <li><Link href="/login" className="hover:text-primary transition-colors text-slate-300">Acesso Restrito</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Áreas de Atuação</h4>
                        <ul className="space-y-4 text-slate-400 text-sm font-medium">
                            <li>Dereito Civil</li>
                            <li>Direito do Trabalho</li>
                            <li>Direito de Família</li>
                            <li>Direito Imobiliário</li>
                            <li>Direito Previdenciário</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contato</h4>
                        <ul className="space-y-6 text-slate-400 text-sm font-medium">
                            <li className="flex gap-4">
                                <MapPin className="text-primary shrink-0" size={20} />
                                <span>Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100</span>
                            </li>
                            <li className="flex gap-4">
                                <Phone className="text-primary shrink-0" size={20} />
                                <span>(11) 99999-9999</span>
                            </li>
                            <li className="flex gap-4">
                                <Mail className="text-primary shrink-0" size={20} />
                                <span>contato@dradvogado.com.br</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-500 text-xs">
                        © 2026 Dr. Advogado & Associados. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-8 text-slate-500 text-xs">
                        <a href="#" className="hover:text-slate-300">Termos de Uso</a>
                        <a href="#" className="hover:text-slate-300">Política de Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
