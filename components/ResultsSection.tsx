
import React from 'react';
import type { AnalysisResult } from '../types';
import { SummaryCard } from './SummaryCard';
import { ScoreCard } from './ScoreCard';
import { SkillsChart } from './SkillsChart';
import { RecommendationsCard } from './RecommendationsCard';
import { AiToolsCard } from './AiToolsCard';
import { Loader } from './Loader';

interface ResultsSectionProps {
    result: AnalysisResult | null;
    isLoading: boolean;
    error: string | null;
}

const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.852l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


export const ResultsSection: React.FC<ResultsSectionProps> = ({ result, isLoading, error }) => {
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="mt-8 text-center bg-slate-100 p-8 rounded-lg border border-dashed border-slate-300">
                <InfoIcon className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-lg font-medium text-slate-800">Esperando análisis</h3>
                <p className="mt-1 text-sm text-slate-500">
                    Completa los campos y haz clic en "Analizar Perfil" para ver los resultados aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 space-y-8">
            <SummaryCard summary={result.professionalSummary} candidateName={result.candidateName} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                     <ScoreCard scoreData={result.globalFitScore} />
                </div>
                <div className="lg:col-span-2">
                    <SkillsChart chartData={result.comparisonData} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <RecommendationsCard recommendations={result.trainingRecommendations} />
                 <AiToolsCard suggestions={result.aiResourceSuggestions} />
            </div>
        </div>
    );
};
