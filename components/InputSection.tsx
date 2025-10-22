
import React, { useCallback, useRef } from 'react';
import { FileChip } from './FileChip';

interface InputSectionProps {
    jobRequirements: string;
    setJobRequirements: (value: string) => void;
    candidateFiles: File[];
    setCandidateFiles: (files: File[]) => void;
    onAnalyze: () => void;
    isLoading: boolean;
    onReset: () => void;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const InputSection: React.FC<InputSectionProps> = ({
    jobRequirements,
    setJobRequirements,
    candidateFiles,
    setCandidateFiles,
    onAnalyze,
    isLoading,
    onReset
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setCandidateFiles(Array.from(event.target.files));
        }
    };

    const handleRemoveFile = useCallback((fileToRemove: File) => {
        setCandidateFiles(candidateFiles.filter(file => file !== fileToRemove));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [candidateFiles, setCandidateFiles]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="job-requirements" className="block text-sm font-medium text-slate-700 mb-1">
                    1. Requisitos del Puesto
                </label>
                <textarea
                    id="job-requirements"
                    rows={6}
                    className="w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    placeholder="Pega aquí la descripción del puesto o describe las habilidades, experiencia y responsabilidades requeridas..."
                    value={jobRequirements}
                    onChange={(e) => setJobRequirements(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">
                    2. Cargar CV del Candidato (PDF, PNG, JPG, TXT)
                </label>
                <div 
                    className="flex justify-center items-center w-full px-6 py-10 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <div className="text-center">
                        <UploadIcon className="mx-auto h-10 w-10 text-slate-400"/>
                        <p className="mt-2 text-sm text-slate-600">
                            <span className="font-semibold text-indigo-600">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-slate-500">Soporta múltiples archivos</p>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.txt"
                    disabled={isLoading}
                />

                {candidateFiles.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {candidateFiles.map((file, index) => (
                           <FileChip key={index} file={file} onRemove={handleRemoveFile} disabled={isLoading} />
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200">
                <button
                    onClick={onAnalyze}
                    disabled={isLoading || candidateFiles.length === 0 || !jobRequirements}
                    className="w-full sm:w-auto flex-grow justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition duration-150 ease-in-out flex"
                >
                    {isLoading ? (
                        <>
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analizando...
                        </>
                    ) : 'Analizar Perfil'}
                </button>
                 <button
                    onClick={onReset}
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
                >
                    Limpiar
                </button>
            </div>
        </div>
    );
};
