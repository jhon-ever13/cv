
import React from 'react';
import type { AiSuggestion } from '../types';

interface AiToolsCardProps {
    suggestions: AiSuggestion[];
}

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);


export const AiToolsCard: React.FC<AiToolsCardProps> = ({ suggestions }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <div className="flex items-center mb-4">
            <SparklesIcon className="h-6 w-6 text-indigo-500 mr-3" />
            <h2 className="text-lg font-semibold text-slate-800">Sugerencias de IA para el Equipo</h2>
        </div>
        <div className="space-y-4">
            {suggestions.map((sug, index) => (
                <div key={index}>
                    <p className="font-semibold text-slate-700">{sug.category}</p>
                    <p className="text-slate-600">{sug.suggestion}</p>
                </div>
            ))}
        </div>
    </div>
);
