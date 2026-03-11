"use client";

import React from "react";

interface ChartData {
    month: string;
    amount: number;
}

interface BarChartProps {
    data: ChartData[];
    title: string;
    subtitle: string;
    color?: string;
    labelSuffix?: string;
}

export default function BarChart({ data, title, subtitle, color = "bg-primary", labelSuffix = "" }: BarChartProps) {
    const maxAmount = Math.max(...data.map(d => d.amount), 1);

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
                    <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 ${color} rounded-full`} />
                        <span className="text-slate-600">Volume</span>
                    </div>
                </div>
            </div>

            <div className="relative h-[200px] w-full mt-4">
                {/* Grid Lines */}
                <div className="absolute left-10 right-0 top-0 h-[160px] flex flex-col justify-between pointer-events-none">
                    <div className="w-full border-t border-slate-100 border-dashed" />
                    <div className="w-full border-t border-slate-100 border-dashed" />
                    <div className="w-full border-t border-slate-200" />
                </div>

                {/* Bars Container */}
                <div className="absolute left-10 right-0 bottom-8 h-[160px] flex items-end justify-around">
                    {data.map((item, index) => {
                        const barHeight = (item.amount / maxAmount) * 160;
                        return (
                            <div key={index} className="group relative flex flex-col items-center w-full max-w-[32px]">
                                {/* Tooltip */}
                                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl z-20 whitespace-nowrap pointer-events-none">
                                    {labelSuffix}{item.amount.toLocaleString('pt-BR')}
                                </div>

                                {/* Bar */}
                                <div
                                    className={`w-full ${color} rounded-t-md transition-all duration-700 ease-out hover:opacity-80 cursor-pointer relative overflow-hidden`}
                                    style={{ height: `${barHeight}px` }}
                                >
                                    <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10 opacity-50" />
                                </div>

                                {/* Label */}
                                <span className="absolute top-full mt-2 text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                                    {item.month}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
