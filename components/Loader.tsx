
import React from 'react';

export const Loader: React.FC = () => (
    <div className="mt-8 text-center p-8">
        <div className="flex justify-center items-center space-x-2">
             <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-lg font-medium text-slate-700">Analizando con IA...</h3>
        </div>
        <p className="mt-2 text-sm text-slate-500">
            Esto puede tardar unos segundos. Estamos extrayendo y comparando la información.
        </p>
    </div>
);
