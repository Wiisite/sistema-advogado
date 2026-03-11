"use client";

import React, { useState } from "react";
import {
    FileText,
    Search,
    Plus,
    Download,
    Copy,
    Check,
    Wand2,
    ChevronRight,
    Filter,
    FileDown,
    X,
    Edit3,
    Eye
} from "lucide-react";
import { generatePetition, savePetition } from "@/lib/actions";
import RichTextEditor from "@/components/RichTextEditor";

interface PeticoesClientProps {
    initialTemplates: any[];
    clients: any[];
    processes: any[];
    initialSavedPetitions: any[];
}

export default function PeticoesClient({ initialTemplates, clients, processes, initialSavedPetitions }: PeticoesClientProps) {
    const [templates] = useState(initialTemplates);
    const [savedPetitions, setSavedPetitions] = useState(initialSavedPetitions);
    const [activeTab, setActiveTab] = useState<"templates" | "saved">("templates");
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [selectedSavedPetition, setSelectedSavedPetition] = useState<any>(null);
    const [selectedClient, setSelectedClient] = useState("");
    const [selectedProcess, setSelectedProcess] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [generatedContent, setGeneratedContent] = useState("");
    const [isEditing, setIsEditing] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!selectedTemplate || !selectedClient) return;

        setIsGenerating(true);
        const result = await generatePetition({ 
            templateId: selectedTemplate.id, 
            clientId: selectedClient, 
            processId: selectedProcess 
        });

        if (result.success && result.content) {
            // Converter quebras de linha simples em <p> para o editor
            const htmlContent = result.content
                .split('\n\n')
                .map((p: string) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
                .join('');
            setGeneratedContent(htmlContent);
            setIsEditing(true);
        }
        setIsGenerating(false);
    };

    const handleSave = async () => {
        if (!generatedContent || !selectedClient) return;

        setIsSaving(true);
        const result = await savePetition({
            title: selectedTemplate?.title || "Petição Sem Título",
            content: generatedContent,
            client_id: selectedClient,
            process_id: selectedProcess || undefined,
            template_id: selectedTemplate?.id
        });

        if (result.success) {
            alert("Petição salva com sucesso!");
            // Atualizar lista de salvas (opcional: buscar do banco novamente)
        } else {
            alert("Erro ao salvar: " + result.error);
        }
        setIsSaving(false);
    };

    const copyToClipboard = () => {
        // Remover tags HTML para copiar apenas texto limpo
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = generatedContent;
        const textOnly = tempDiv.textContent || tempDiv.innerText || "";

        navigator.clipboard.writeText(textOnly);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 text-slate-900">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gerador de Petições</h1>
                    <p className="text-slate-500 mt-1">Gere documentos jurídicos automaticamente com IA e templates.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0">
                    <Plus size={20} />
                    Novo Template
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="xl:col-span-1 space-y-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab("templates")}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "templates" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Templates
                        </button>
                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === "saved" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            Salvas ({savedPetitions.length})
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-2">
                        <div className="p-3 mb-2">
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={activeTab === "templates" ? "Pesquisar templates..." : "Pesquisar petições salvas..."}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
                            {activeTab === "templates" ? (
                                templates.map((temp) => (
                                    <button
                                        key={temp.id}
                                        onClick={() => {
                                            setSelectedTemplate(temp);
                                            setSelectedSavedPetition(null);
                                            if (generatedContent) setGeneratedContent("");
                                        }}
                                        className={`w-full flex flex-col p-4 rounded-xl transition-all text-left group border ${selectedTemplate?.id === temp.id
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-white border-transparent hover:bg-slate-50 text-slate-900"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between w-full mb-1">
                                            <span className={`text-[10px] font-bold uppercase transition-colors ${selectedTemplate?.id === temp.id ? 'text-white/60' : 'text-slate-400'}`}>
                                                {temp.category}
                                            </span>
                                            <ChevronRight size={14} className={selectedTemplate?.id === temp.id ? 'text-white' : 'text-slate-300'} />
                                        </div>
                                        <span className="font-bold text-sm">{temp.title}</span>
                                    </button>
                                ))
                            ) : (
                                savedPetitions.map((pet) => (
                                    <button
                                        key={pet.id}
                                        onClick={() => {
                                            setSelectedSavedPetition(pet);
                                            setSelectedTemplate(null);
                                            setGeneratedContent(pet.content);
                                            setSelectedClient(pet.client_id);
                                            setSelectedProcess(pet.process_id || "");
                                            setIsEditing(false);
                                        }}
                                        className={`w-full flex flex-col p-4 rounded-xl transition-all text-left group border ${selectedSavedPetition?.id === pet.id
                                            ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20"
                                            : "bg-white border-transparent hover:bg-slate-50 text-slate-900"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between w-full mb-1">
                                            <span className={`text-[10px] font-bold uppercase transition-colors ${selectedSavedPetition?.id === pet.id ? 'text-white/60' : 'text-slate-400'}`}>
                                                {pet.clients?.full_name}
                                            </span>
                                            <span className="text-[9px] opacity-60">{new Date(pet.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <span className="font-bold text-sm truncate">{pet.title}</span>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Editor / Generation Area */}
                <div className="xl:col-span-2 space-y-6">
                    {!generatedContent ? (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[500px] text-center">
                            {selectedTemplate ? (
                                <div className="w-full max-w-lg space-y-8 animate-in fade-in zoom-in duration-300">
                                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                        <h3 className="font-bold text-slate-900 mb-2">Configure os Dados da Petição</h3>
                                        <p className="text-xs text-slate-500">Selecione o cliente e processo para preencher os campos automaticamente.</p>
                                    </div>

                                    <div className="space-y-6 text-left">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cliente do Escritório</label>
                                            <select
                                                value={selectedClient}
                                                onChange={(e) => setSelectedClient(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-medium"
                                            >
                                                <option value="">Selecione um cliente...</option>
                                                {clients.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Processo Vinculado (Opcional)</label>
                                            <select
                                                value={selectedProcess}
                                                onChange={(e) => setSelectedProcess(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900 font-medium"
                                            >
                                                <option value="">Selecione o processo...</option>
                                                {processes.map(p => <option key={p.id} value={p.id}>{p.process_number} - {p.title}</option>)}
                                            </select>
                                        </div>

                                        <button
                                            onClick={handleGenerate}
                                            disabled={isGenerating || !selectedClient}
                                            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                                        >
                                            {isGenerating ? (
                                                "Gerando documento..."
                                            ) : (
                                                <>
                                                    <Wand2 size={20} />
                                                    Gerar Petição Agora
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto">
                                        <FileText size={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Selecione um Template</h3>
                                    <p className="text-slate-500 max-w-xs mx-auto">Escolha um modelo jurídico à esquerda para começar a geração do documento.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500 flex flex-col h-full min-h-[600px]">
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                        <Check size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm text-slate-900">Documento Gerado</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{selectedTemplate?.title}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${isEditing ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }`}
                                    >
                                        {isEditing ? <><Eye size={14} /> Visualizar</> : <><Edit3 size={14} /> Editar</>}
                                    </button>
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all"
                                    >
                                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                        {copied ? "Copiado!" : "Copiar Texto"}
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
                                    >
                                        <Copy size={14} />
                                        {isSaving ? "Salvando..." : "Salvar no Banco"}
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-bold transition-all shadow-md shadow-slate-900/20">
                                        <FileDown size={14} />
                                        Exportar PDF
                                    </button>
                                    <button
                                        onClick={() => setGeneratedContent("")}
                                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-hidden">
                                {isEditing ? (
                                    <RichTextEditor
                                        content={generatedContent}
                                        onChange={setGeneratedContent}
                                    />
                                ) : (
                                    <div
                                        className="p-10 font-serif leading-relaxed text-slate-800 whitespace-pre-wrap h-full overflow-y-auto bg-slate-50/30"
                                        dangerouslySetInnerHTML={{ __html: generatedContent }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
