
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { analyzeCandidateProfile } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
    const [jobRequirements, setJobRequirements] = useState<string>('');
    const [candidateFiles, setCandidateFiles] = useState<File[]>([]);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!jobRequirements && candidateFiles.length === 0) {
            setError('Por favor, proporciona los requisitos del puesto y al menos un CV.');
            return;
        }
        if (candidateFiles.length === 0) {
            setError('Por favor, sube al menos un archivo de CV.');
            return;
        }
         if (!jobRequirements) {
            setError('Por favor, describe los requisitos del puesto.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzeCandidateProfile(jobRequirements, candidateFiles);
            if (result.status === 'ERROR_OCR' && result.details) {
                 setError(`Error al procesar el archivo: ${result.details}`);
                 setAnalysisResult(null);
            } else {
                 setAnalysisResult(result);
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado al contactar la IA.';
            setError(`Error en el análisis: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [jobRequirements, candidateFiles]);
    
    const resetForm = useCallback(() => {
        setJobRequirements('');
        setCandidateFiles([]);
        setAnalysisResult(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
                    <InputSection
                        jobRequirements={jobRequirements}
                        setJobRequirements={setJobRequirements}
                        candidateFiles={candidateFiles}
                        setCandidateFiles={setCandidateFiles}
                        onAnalyze={handleAnalyze}
                        isLoading={isLoading}
                        onReset={resetForm}
                    />
                </div>

                <ResultsSection
                    result={analysisResult}
                    isLoading={isLoading}
                    error={error}
                />
            </main>
             <footer className="text-center py-4 text-slate-500 text-sm">
                <p>Desarrollado por un asistente de IA para optimizar procesos de RRHH.</p>
            </footer>
        </div>
    );
};

export default App;
