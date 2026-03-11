"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ClienteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => Promise<void>;
    cliente?: any;
    mode: 'create' | 'edit';
}

export default function ClienteModal({ isOpen, onClose, onSave, cliente, mode }: ClienteModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        document_id: '',
        email: '',
        phone: '',
        address: '',
        notes: ''
    });
    
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');

    useEffect(() => {
        if (cliente && mode === 'edit') {
            setFormData({
                full_name: cliente.full_name || '',
                document_id: cliente.document_id || '',
                email: cliente.email || '',
                phone: cliente.phone || '',
                address: cliente.address || '',
                notes: cliente.notes || ''
            });
        } else {
            setFormData({
                full_name: '',
                document_id: '',
                email: '',
                phone: '',
                address: '',
                notes: ''
            });
            setCep('');
            setStreet('');
            setCity('');
            setState('');
            setNumber('');
            setComplement('');
        }
    }, [cliente, mode, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cepValue = e.target.value.replace(/\D/g, '');
        setCep(e.target.value);

        if (cepValue.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
                const data = await response.json();
                
                if (!data.erro) {
                    setStreet(data.logradouro || '');
                    setCity(data.localidade || '');
                    setState(data.uf || '');
                    if (data.complemento) setComplement(data.complemento);
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const addressParts = [];
            if (street) addressParts.push(street);
            if (number) addressParts.push(number);
            if (complement) addressParts.push(complement);
            if (city) addressParts.push(city);
            if (state) addressParts.push(state);
            if (cep) addressParts.push(`CEP: ${cep}`);
            
            const dataToSave = {
                ...formData,
                address: addressParts.join(', ')
            };
            
            await onSave(dataToSave);
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            alert('Erro ao salvar cliente. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">
                        {mode === 'create' ? 'Editar Registro' : 'Editar Registro'}
                    </h2>
                    <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nome</label>
                                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="2 teste" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Telefone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(25) 44548-4611" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">CPF / CNPJ</label>
                            <input type="text" name="document_id" value={formData.document_id} onChange={handleChange} placeholder="Insira CPF ou CNPJ" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">CEP</label>
                                <input type="text" value={cep} onChange={handleCepChange} placeholder="00000-000" maxLength={9} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Rua</label>
                                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Rua" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Número</label>
                                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Número" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Complemento</label>
                                <input type="text" value={complement} onChange={(e) => setComplement(e.target.value)} placeholder="Complemento" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Cidade</label>
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cidade" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Estado</label>
                            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                    <option value="">Selecionar</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Resumo das Tarefas</label>
                            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"></textarea>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button type="submit" disabled={loading} className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
