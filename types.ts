
export interface ChartDataPoint {
    skill: string;
    requerido: number;
    candidato: number;
}

export interface GlobalScore {
    score: number;
    explanation: string;
}

export interface AiSuggestion {
    category: string;
    suggestion: string;
}

export interface AnalysisResult {
    professionalSummary: string;
    comparisonData: ChartDataPoint[];
    globalFitScore: GlobalScore;
    trainingRecommendations: string[];
    aiResourceSuggestions: AiSuggestion[];
    candidateName?: string | null;
    status?: 'SUCCESS' | 'ERROR_OCR';
    details?: string;
}
