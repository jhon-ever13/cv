
import React from 'react';
import type { GlobalScore } from '../types';

interface ScoreCardProps {
    scoreData: GlobalScore;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ scoreData }) => {
    const { score, explanation } = scoreData;
    const circumference = 2 * Math.PI * 52;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getColor = (s: number) => {
        if (s < 40) return 'text-red-500';
        if (s < 70) return 'text-yellow-500';
        return 'text-green-500';
    };
    
    const getTrackColor = (s: number) => {
        if (s < 40) return 'stroke-red-500';
        if (s < 70) return 'stroke-yellow-500';
        return 'stroke-green-500';
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 text-center">Puntaje de Ajuste Global</h2>
            <div className="flex-grow flex flex-col items-center justify-center">
                 <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 120 120">
                        <circle
                            className="stroke-slate-200"
                            strokeWidth="10"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                        />
                        <circle
                            className={`transform -rotate-90 origin-center transition-all duration-1000 ease-out ${getTrackColor(score)}`}
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            fill="transparent"
                            r="52"
                            cx="60"
                            cy="60"
                        />
                    </svg>
                    <div className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${getColor(score)}`}>
                        {score}
                        <span className="text-2xl font-medium">%</span>
                    </div>
                </div>
                 <p className="text-sm text-slate-500 text-center mt-4 px-2">
                    {explanation}
                </p>
            </div>
        </div>
    );
};
