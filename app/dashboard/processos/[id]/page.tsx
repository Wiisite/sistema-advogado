import {
    ArrowLeft,
    ExternalLink,
    MoreVertical,
    Clock,
    FileText,
    User,
    Scale,
    Calendar,
    AlertCircle,
    Plus,
    MessageCircle
} from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProcessById } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function ProcessoDetalhesPage({ params }: { params: { id: string } }) {
    const processData = await getProcessById(params.id);

    if (!processData) {
        notFound();
    }

    // Adaptando os dados do banco para o formato esperado pelo UI
    const processo = {
        id: processData.id,
        numero: processData.process_number,
        titulo: processData.title,
        cliente: {
            nome: (processData.clients as any)?.full_name || "Desconhecido",
            email: (processData.clients as any)?.email || "N/A",
            telefone: (processData.clients as any)?.phone || "N/A",
            cpf: (processData.clients as any)?.document_id || "N/A"
        },
        categoria: processData.category || "Geral",
        status: processData.status === 'active' ? 'Ativo' : 'Inativo',
        prioridade: processData.priority === 'high' ? 'Alta' : (processData.priority === 'medium' ? 'Média' : 'Baixa'),
        dataInicio: new Date(processData.created_at).toLocaleDateString('pt-BR'),
        ultimaMovimentacao: "Recente", // Placeholder até implementar tabela de movimentações
        descricao: processData.description || "Sem descrição disponível.",
        movimentacoes: [
            { id: 1, data: new Date(processData.created_at).toLocaleDateString('pt-BR'), titulo: "Processo Criado", desc: "Registro inicial do processo no sistema.", responsavel: "Sistema" },
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-4">
                    <Link href="/dashboard/processos" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold">
                        <ArrowLeft size={16} />
                        Voltar para Listagem
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase tracking-wider">
                                {processo.categoria}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${processo.status === "Ativo" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                }`}>
                                {processo.status}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{processo.numero}</h1>
                        <p className="text-slate-500 mt-1 font-medium">{processo.titulo}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
                        Editar
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                        <ExternalLink size={18} />
                        Ver no Tribunal
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    {/* Timeline de Movimentações */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg">Timeline de Movimentações</h3>
                            <button className="flex items-center gap-2 text-primary text-sm font-bold hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all">
                                <Plus size={16} />
                                Nova Movimentação
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {processo.movimentacoes.map((mov, i) => (
                                    <div key={mov.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300">
                                            <Clock size={16} />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
                                            <div className="flex items-center justify-between mb-1">
                                                <time className="font-bold text-xs text-primary">{mov.data}</time>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{mov.responsavel}</span>
                                            </div>
                                            <div className="text-slate-900 font-bold mb-1">{mov.titulo}</div>
                                            <div className="text-slate-500 text-xs leading-relaxed">{mov.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-slate-900">
                        <h3 className="font-bold text-lg">Descrição Detalhada</h3>
                        <p className="text-sm text-slate-600 leading-relaxed border-l-4 border-primary/20 pl-4 py-1 italic">
                            "{processo.descricao}"
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Card do Cliente */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-900">Resumo do Cliente</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 leading-none">{processo.cliente.nome}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{processo.cliente.cpf}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider">Telefone</span>
                                    <span className="text-slate-700 font-medium">{processo.cliente.telefone}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-400 font-bold uppercase tracking-wider">E-mail</span>
                                    <span className="text-slate-700 font-medium">{processo.cliente.email}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <WhatsAppButton
                                    clientId={processo.id}
                                    type="update"
                                    data={{
                                        processNumber: processo.numero,
                                        updateTitle: processo.movimentacoes[0].titulo
                                    }}
                                    label="Notificar Atualização"
                                />
                                <Link href={`/dashboard/clientes`} className="block w-full text-center py-2.5 border-2 border-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 hover:border-slate-200 transition-all">
                                    Ver Perfil Completo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Informações Auxiliares */}
                    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white space-y-6">
                        <div className="flex items-center gap-3">
                            <Scale className="text-primary" size={24} />
                            <h3 className="font-bold text-lg">Dados Técnicos</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Calendar size={16} className="text-primary" />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Início do Processo</p>
                                    <p className="text-sm font-medium">{processo.dataInicio}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <AlertCircle size={16} className="text-amber-500" />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Prioridade</p>
                                    <p className="text-sm font-medium">{processo.prioridade}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <FileText size={16} className="text-primary" />
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Última Movimentação</p>
                                    <p className="text-sm font-medium">{processo.ultimaMovimentacao}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
