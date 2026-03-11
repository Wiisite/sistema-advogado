"use client";

import React, { useState } from "react";
import {
    FileText,
    Search,
    Upload,
    Plus,
    FolderPlus,
    MoreVertical,
    Download,
    Trash2,
    Filter,
    HardDrive,
    Pencil,
    Loader2
} from "lucide-react";
import DocumentUploadModal from "@/components/DocumentUploadModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { deleteDocument, renameDocument } from "@/lib/actions";
import { useRouter } from "next/navigation";

const categories = ["Todos", "Processos", "Clientes", "Financeiro", "Petições", "Contratos"];

const fileIconMap: any = {
    pdf: "text-rose-500 bg-rose-50",
    doc: "text-blue-500 bg-blue-50",
    docx: "text-blue-500 bg-blue-50",
    xls: "text-emerald-500 bg-emerald-50",
    xlsx: "text-emerald-500 bg-emerald-50",
    jpg: "text-amber-500 bg-amber-50",
    png: "text-amber-500 bg-amber-50",
};

interface DocumentosClientProps {
    initialDocuments: any[];
}

export default function DocumentosClient({ initialDocuments }: DocumentosClientProps) {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [documents, setDocuments] = useState(initialDocuments);
    const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

    // Rename state
    const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState<any>(null);
    const [newName, setNewName] = useState("");

    const filteredDocs = activeCategory === "Todos"
        ? documents
        : documents.filter(doc => doc.category.toLowerCase() === activeCategory.toLowerCase());

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDelete = async (id: string, storagePath: string) => {
        if (!confirm("Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita.")) return;

        setIsActionLoading(id);
        const result = await deleteDocument(id);

        if (result.success) {
            setDocuments(prev => prev.filter(d => d.id !== id));
            router.refresh();
        } else {
            alert("Erro ao excluir documento: " + result.error);
        }
        setIsActionLoading(null);
    };

    const handleRename = async () => {
        if (!editingDoc || !newName.trim()) return;

        setIsActionLoading(editingDoc.id);
        const result = await renameDocument(editingDoc.id, newName);

        if (result.success) {
            setDocuments(prev => prev.map(d => d.id === editingDoc.id ? { ...d, name: newName } : d));
            setIsRenameModalOpen(false);
            setEditingDoc(null);
            router.refresh();
        } else {
            alert("Erro ao renomear documento: " + result.error);
        }
        setIsActionLoading(null);
    };

    const openRenameModal = (doc: any) => {
        setEditingDoc(doc);
        setNewName(doc.name);
        setIsRenameModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Modal de Renomear */}
            {isRenameModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-slate-900">
                        <h3 className="text-xl font-bold">Renomear Arquivo</h3>
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="Novo nome do arquivo"
                            autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setIsRenameModalOpen(false)}
                                className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleRename}
                                className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Documentos</h1>
                    <p className="text-slate-500 mt-1">Gerencie arquivos e petições de forma organizada na nuvem.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                    >
                        <Upload size={20} />
                        Upload
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm">
                        <FolderPlus size={20} />
                        Nova Pasta
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar de Categorias */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-slate-900">
                        <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4 px-2">Categorias</h3>
                        <div className="space-y-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === cat
                                        ? "bg-primary text-white shadow-md shadow-primary/20"
                                        : "text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    {cat}
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === cat ? "bg-white/20" : "bg-slate-100 text-slate-400"}`}>
                                        {cat === "Todos" ? documents.length : documents.filter(d => d.category.toLowerCase() === cat.toLowerCase()).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <HardDrive size={20} className="text-primary" />
                            <h3 className="font-bold text-sm">Armazenamento</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-1/4 rounded-full" />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                                <span>2.5 GB usados</span>
                                <span>10 GB total</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Arquivos */}
                <div className="md:col-span-3 space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
                        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar arquivos..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <button className="flex items-center gap-2 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all w-full md:w-auto justify-center">
                                <Filter size={16} />
                                Filtros
                            </button>
                        </div>

                        <div className="overflow-x-auto text-slate-900">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-bold">Nome do Arquivo</th>
                                        <th className="px-6 py-4 font-bold">Categoria</th>
                                        <th className="px-6 py-4 font-bold">Tamanho</th>
                                        <th className="px-6 py-4 font-bold">Data</th>
                                        <th className="px-6 py-4 font-bold text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-900">
                                    {filteredDocs.map((doc: any) => (
                                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg transition-colors ${fileIconMap[doc.file_type] || "bg-slate-100 text-slate-400"}`}>
                                                        <FileText size={18} />
                                                    </div>
                                                    <div className="font-bold text-slate-900 text-sm truncate max-w-[200px]">{doc.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{doc.category}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{formatSize(doc.file_size)}</td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{new Date(doc.created_at).toLocaleDateString('pt-BR')}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    {isActionLoading === doc.id ? (
                                                        <Loader2 size={18} className="animate-spin text-slate-400 mx-3" />
                                                    ) : (
                                                        <>
                                                            <WhatsAppButton
                                                                clientId={doc.client_id || ""}
                                                                type="document"
                                                                data={{
                                                                    documentName: doc.name,
                                                                    url: doc.storage_path // In real scenario, would generate a public URL
                                                                }}
                                                                variant="icon"
                                                            />
                                                            <button
                                                                onClick={() => openRenameModal(doc)}
                                                                className="p-2 text-slate-400 hover:text-primary transition-colors"
                                                                title="Renomear"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>
                                                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                                                <Download size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(doc.id, doc.storage_path)}
                                                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                                                title="Excluir"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredDocs.length === 0 && (
                                <div className="p-20 flex flex-col items-center justify-center text-slate-300">
                                    <FileText size={48} className="mb-4 opacity-20" />
                                    <p className="font-bold">Nenhum arquivo encontrado.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DocumentUploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </div>
    );
}
