"use client";

import React, { useState, useRef } from "react";
import {
    X,
    Upload,
    FileText,
    CheckCircle2,
    Loader2,
    AlertCircle
} from "lucide-react";
import { uploadFile } from "@/lib/actions";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DocumentUploadModal({ isOpen, onClose }: UploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState("processos");
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setStatus("idle");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        setStatus("idle");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        const result = await uploadFile(formData);

        setIsUploading(false);
        if (result.success) {
            setStatus("success");
            setTimeout(() => {
                onClose();
                setFile(null);
                setStatus("idle");
            }, 2000);
        } else {
            setStatus("error");
            setErrorMessage(result.error || "Erro desconhecido ao fazer upload.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Upload de Documento</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Upload Concluído!</h3>
                            <p className="text-slate-500">O arquivo foi salvo na nuvem com sucesso.</p>
                        </div>
                    ) : (
                        <>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />

                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <FileText size={48} className="text-primary mb-3" />
                                        <span className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{file.name}</span>
                                        <span className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 mb-3">
                                            <Upload size={24} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">Clique ou arraste o arquivo</span>
                                        <span className="text-xs text-slate-400 mt-1">PDF, DOCX, JPG ou PNG (Max 10MB)</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Categoria</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option value="processos">Processos</option>
                                    <option value="clientes">Clientes</option>
                                    <option value="financeiro">Financeiro</option>
                                    <option value="peticoes">Petições</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>

                            {status === "error" && (
                                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl flex items-center gap-2">
                                    <AlertCircle size={14} />
                                    {errorMessage}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!file || isUploading}
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                {isUploading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    "Confirmar Upload"
                                )}
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
