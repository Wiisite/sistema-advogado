"use client";

import React, { useRef, useEffect } from "react";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Type,
    Heading1,
    Heading2
} from "lucide-react";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content;
        }
    }, [content]);

    const execCommand = (command: string, value: string = "") => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const ToolbarButton = ({ icon: Icon, command, value = "" }: { icon: any, command: string, value?: string }) => (
        <button
            type="button"
            onClick={() => execCommand(command, value)}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-primary rounded-lg transition-all"
        >
            <Icon size={18} />
        </button>
    );

    return (
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col h-full">
            {/* ToolBar */}
            <div className="p-2 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-1">
                <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-2">
                    <ToolbarButton icon={Bold} command="bold" />
                    <ToolbarButton icon={Italic} command="italic" />
                    <ToolbarButton icon={Underline} command="underline" />
                </div>

                <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-2">
                    <ToolbarButton icon={Heading1} command="formatBlock" value="H1" />
                    <ToolbarButton icon={Heading2} command="formatBlock" value="H2" />
                    <ToolbarButton icon={Type} command="formatBlock" value="P" />
                </div>

                <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-2">
                    <ToolbarButton icon={List} command="insertUnorderedList" />
                    <ToolbarButton icon={ListOrdered} command="insertOrderedList" />
                </div>

                <div className="flex items-center gap-1 font-bold text-xs text-slate-400">
                    <ToolbarButton icon={AlignLeft} command="justifyLeft" />
                    <ToolbarButton icon={AlignCenter} command="justifyCenter" />
                    <ToolbarButton icon={AlignRight} command="justifyRight" />
                </div>
            </div>

            {/* Editor Content */}
            <div
                ref={editorRef}
                contentEditable
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                className="flex-1 p-8 outline-none font-serif text-slate-800 leading-relaxed min-h-[500px] overflow-y-auto"
                data-placeholder="Comece a editar sua petição aqui..."
            />

            <div className="p-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Modo de Edição Ativado</span>
                <span className="text-[10px] text-slate-400 font-medium px-2 italic">Dica: Use CTRL+B para Negrito</span>
            </div>
        </div>
    );
}
