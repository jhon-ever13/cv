
import React from 'react';

interface SummaryCardProps {
    summary: string;
    candidateName?: string | null;
}

const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);


export const SummaryCard: React.FC<SummaryCardProps> = ({ summary, candidateName }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <div className="flex items-center mb-4">
            <DocumentTextIcon className="h-6 w-6 text-indigo-500 mr-3" />
            <div>
                <h2 className="text-lg font-semibold text-slate-800">Resumen Profesional</h2>
                 {candidateName && <p className="text-sm text-slate-500">{candidateName}</p>}
            </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
            {summary}
        </p>
    </div>
);
