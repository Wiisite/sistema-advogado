import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Scale,
    ShieldCheck,
    Gavel,
    Users,
    Briefcase,
    ArrowRight,
    MessageCircle,
    CheckCircle2,
    Calendar,
    Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                    {/* Background with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero.png"
                            alt="Modern Law Office"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-white backdrop-blur-md">
                                <Scale size={16} className="text-primary" />
                                <span className="text-xs font-bold uppercase tracking-widest">Excelência em Defesa Jurídica</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                                Protegendo seu Futuro com <span className="text-primary italic">Justiça e Ética</span>
                            </h1>
                            <p className="text-xl text-slate-200 leading-relaxed max-w-2xl">
                                Com décadas de experiência, oferecemos soluções jurídicas estratégicas e personalizadas para indivíduos e empresas que buscam segurança e resultados excepcionais.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 items-center">
                                <a
                                    href="https://wa.me/5511999999999"
                                    target="_blank"
                                    className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-95"
                                >
                                    <MessageCircle size={22} />
                                    Consulta Gratuita
                                </a>
                                <a
                                    href="#servicos"
                                    className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    Áreas de Atuação
                                    <ArrowRight size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Floating Stats or Trust Badges (Desktop) */}
                        <div className="hidden lg:block flex-shrink-0 animate-in fade-in slide-in-from-right duration-1000 delay-300">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 rounded-2xl bg-primary/20 text-primary">
                                        <Briefcase size={32} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-white">15+</div>
                                        <div className="text-sm text-slate-400 font-medium">Anos de Experiência</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-white">1.5k+</div>
                                        <div className="text-sm text-slate-400 font-medium">Casos de Sucesso</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-400">
                                        <Users size={32} />
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-white">99%</div>
                                        <div className="text-sm text-slate-400 font-medium">Clientes Satisfeitos</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Down */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-2">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                    </div>
                </section>

                {/* Practice Areas */}
                <section id="servicos" className="py-32 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6 text-center mb-20 space-y-4">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Nossas Especialidades</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Soluções Jurídicas Sob Medida para <br className="hidden md:block" /> Suas <span className="text-primary italic">Necessidades Mais Complexas</span></h3>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Users size={32} />, title: "Direito de Família", desc: "Separações, custódia de menores, inventários e planejamento sucessório com máxima discrição." },
                            { icon: <Briefcase size={32} />, title: "Direito Trabalhista", desc: "Defesa dos direitos do trabalhador e consultoria preventiva para empresas de todos os portes." },
                            { icon: <Gavel size={32} />, title: "Direito Criminal", desc: "Atendimento imediato em acompanhamentos e defesas processuais com foco na liberdade." },
                            { icon: <ShieldCheck size={32} />, title: "Direito Civil", desc: "Resolução de conflitos contratuais, indenizações por danos morais e questões imobiliárias." },
                        ].map((area, i) => (
                            <div key={i} className="group p-10 bg-white rounded-[32px] border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <div className="p-5 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors mb-8 inline-block">
                                    {area.icon}
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-4">{area.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">{area.desc}</p>
                                <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-wider">
                                    Saiba Mais
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Section */}
                <section id="sobre" className="py-32 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
                        <div className="relative flex-1">
                            <div className="relative z-10 w-full h-[600px] rounded-[60px] overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=2070"
                                    alt="Advogada no escritório"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Decorative Background Elements */}
                            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl z-0" />
                            <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-32 h-32 bg-slate-900/5 rounded-[40px] backdrop-blur-sm border border-slate-200 rotate-12 z-20 flex items-center justify-center">
                                <Scale size={48} className="text-primary opacity-20" />
                            </div>
                        </div>

                        <div className="flex-1 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-sm font-bold text-primary uppercase tracking-widest">Nossa História</h2>
                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Compromisso com o Cliente em <span className="text-primary italic">Cada Argumento</span></h3>
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Fundado em 2010, o Dr. Advogado nasceu da visão de que a justiça deve ser acessível e ágil. Nossa equipe é composta por profissionais altamente especializados que atuam com paixão e rigor técnico.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 font-bold text-slate-900">
                                        <CheckCircle2 size={24} className="text-emerald-500" />
                                        Atendimento Online
                                    </div>
                                    <p className="text-sm text-slate-500">Agende e realize reuniões de qualquer lugar do mundo.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 font-bold text-slate-900">
                                        <CheckCircle2 size={24} className="text-emerald-500" />
                                        Transparência Total
                                    </div>
                                    <p className="text-sm text-slate-500">Acompanhamento em tempo real do status de cada processo.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 font-bold text-slate-900">
                                        <CheckCircle2 size={24} className="text-emerald-500" />
                                        Foco em Resultados
                                    </div>
                                    <p className="text-sm text-slate-500">Estratégias agressivas focadas na vitória jurídica do cliente.</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 font-bold text-slate-900">
                                        <CheckCircle2 size={24} className="text-emerald-500" />
                                        Suporte 24/7
                                    </div>
                                    <p className="text-sm text-slate-500">Canal exclusivo para urgências em casos criminais.</p>
                                </div>
                            </div>
                            <button className="px-10 py-5 border-2 border-slate-900 text-slate-900 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm">
                                Conheça Nossa Equipe
                            </button>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-32 bg-slate-900">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="flex justify-center gap-1 mb-8">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="#C69C6D" color="#C69C6D" />)}
                        </div>
                        <p className="text-2xl md:text-3xl text-white font-medium italic mb-12 max-w-4xl mx-auto leading-relaxed">
                            "A agilidade e clareza com que o Dr. Advogado tratou minha causa trabalhista foi impressionante. Me senti seguro do início ao fim do processo. Recomendo fortemente a todos que precisam de defesa séria."
                        </p>
                        <div>
                            <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto mb-4 border-2 border-primary overflow-hidden">
                                <Image src="https://i.pravatar.cc/150?u=1" alt="Testemunho" width={64} height={64} />
                            </div>
                            <div className="text-lg font-bold text-white">Marcelo de Oliveira</div>
                            <div className="text-sm text-slate-400 font-medium">Empresário - São Paulo</div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section id="contato" className="py-24 bg-white relative">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="bg-primary rounded-[40px] p-12 md:p-20 text-center space-y-10 shadow-2xl shadow-primary/40 text-white overflow-hidden relative">
                            {/* Decorative Scales */}
                            <Scale size={300} className="absolute -right-20 -bottom-20 text-white opacity-10 pointer-events-none rotate-12" />

                            <div className="space-y-4 relative z-10">
                                <h3 className="text-4xl md:text-6xl font-bold leading-tight">Vamos Discutir o <br className="hidden md:block" /> Seu Caso Hoje?</h3>
                                <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">Não deixe seus direitos para depois. Nossa primeira análise é gratuita e sem compromisso.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                                <a
                                    href="https://wa.me/5511999999999"
                                    target="_blank"
                                    className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-4 active:scale-95 shadow-xl"
                                >
                                    <MessageCircle size={24} />
                                    Falar no WhatsApp
                                </a>
                                <button className="px-12 py-5 bg-white text-primary rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-4 active:scale-95 shadow-xl">
                                    <Calendar size={24} />
                                    Agendar Reunião
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
