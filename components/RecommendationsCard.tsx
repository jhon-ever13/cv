
import React from 'react';

interface RecommendationsCardProps {
    recommendations: string[];
}

const AcademicCapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path d="M12 14.25c-2.43 0-4.63.63-6.5 1.75.24-2.38 1.5-4.5 3.5-5.75 1.12-.71 2.45-1.12 3.86-1.24a3.375 3.375 0 0 1 4.12 4.12c-.12 1.41-.53 2.74-1.24 3.86-1.25 2-3.37 3.26-5.75 3.5a16.437 16.437 0 0 1-1.75-.24" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h4.5v4.5h-4.5v-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


export const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendations }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <div className="flex items-center mb-4">
            <AcademicCapIcon className="h-6 w-6 text-indigo-500 mr-3" />
            <h2 className="text-lg font-semibold text-slate-800">Recomendaciones de Capacitación</h2>
        </div>
        <ul className="space-y-3">
            {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-3 mt-1">›</span>
                    <p className="text-slate-600">{rec}</p>
                </li>
            ))}
        </ul>
    </div>
);
