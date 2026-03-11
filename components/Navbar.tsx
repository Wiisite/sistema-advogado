"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Início", href: "#home" },
        { name: "Áreas de Atuação", href: "#servicos" },
        { name: "Sobre", href: "#sobre" },
        { name: "Contato", href: "#contato" },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className={`p-2 rounded-lg transition-colors ${scrolled ? "bg-primary text-white" : "bg-white/10 text-white backdrop-blur-sm"
                        }`}>
                        <Scale size={24} />
                    </div>
                    <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-white"
                        }`}>
                        Dr. Advogado
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary ${scrolled ? "text-slate-600" : "text-white/80"
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link
                        href="/login"
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${scrolled
                            ? "bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20"
                            : "bg-white text-primary hover:bg-slate-50 shadow-xl"
                            }`}
                    >
                        Acesso Restrito
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden p-2 rounded-lg ${scrolled ? "text-slate-900" : "text-white"}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-in slide-in-from-top duration-300 border-t border-slate-100">
                    <div className="p-6 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-slate-600 font-bold uppercase tracking-wider text-sm py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            href="/login"
                            className="bg-primary text-white px-5 py-3 rounded-xl text-center font-bold text-sm"
                        >
                            Acesso Restrito
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
