"use client";

import React, { useState } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { getWhatsAppLink } from "@/lib/actions";

interface WhatsAppButtonProps {
    clientId: string;
    type: 'document' | 'update';
    data: any;
    label?: string;
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
}

export default function WhatsAppButton({ clientId, type, data, label, variant = 'primary' }: WhatsAppButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleShare = async () => {
        setIsLoading(true);
        const result = await getWhatsAppLink(clientId, type, data);
        setIsLoading(false);

        if (result.success && result.link) {
            window.open(result.link, '_blank');
        } else {
            alert(result.error || "Erro ao gerar link do WhatsApp");
        }
    };

    const getStyles = () => {
        switch (variant) {
            case 'primary': return "bg-[#25D366] text-white hover:bg-[#128C7E] px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/20";
            case 'secondary': return "bg-green-50 text-[#128C7E] hover:bg-green-100 px-4 py-2 rounded-xl font-bold flex items-center gap-2";
            case 'ghost': return "text-slate-500 hover:text-[#128C7E] hover:bg-green-50 p-2 rounded-lg transition-all flex items-center gap-2";
            case 'icon': return "p-2 text-[#25D366] hover:bg-green-50 rounded-lg transition-all";
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={isLoading}
            className={`${getStyles()} transition-all disabled:opacity-50`}
            title="Compartilhar via WhatsApp"
        >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <MessageCircle size={18} />}
            {variant !== 'icon' && <span>{label || (type === 'document' ? 'Enviar Docs' : 'Notificar Cliente')}</span>}
        </button>
    );
}
