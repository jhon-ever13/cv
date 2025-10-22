
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';

interface SkillsChartProps {
    chartData: ChartDataPoint[];
}

const ChartBarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);


export const SkillsChart: React.FC<SkillsChartProps> = ({ chartData }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 h-full">
            <div className="flex items-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-indigo-500 mr-3" />
                <h2 className="text-lg font-semibold text-slate-800">Comparativa de Habilidades (Nivel 0-5)</h2>
            </div>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                        <YAxis dataKey="skill" type="category" width={100} tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                background: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend />
                        <Bar dataKey="requerido" name="Nivel Requerido" fill="#a5b4fc" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="candidato" name="Nivel del Candidato" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
