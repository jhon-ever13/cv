
import React from 'react';

const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.898 20.572 16.5 21.75l-.398-1.178a3.375 3.375 0 0 0-2.312-2.312L12 17.25l1.178-.398a3.375 3.375 0 0 0 2.312-2.312L16.5 13.5l.398 1.178a3.375 3.375 0 0 0 2.312 2.312L20.25 18l-1.178.398a3.375 3.375 0 0 0-2.312 2.312Z" />
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 max-w-5xl">
                <div className="flex items-center space-x-3">
                    <BrainCircuitIcon className="h-8 w-8 text-indigo-600" />
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">Asistente de CV con IA</h1>
                        <p className="text-sm text-slate-500">Análisis y optimización de perfiles profesionales</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
