
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            }
        };
        reader.readAsDataURL(file);
    });
    const data = await base64EncodedDataPromise;
    return {
        inlineData: {
            data,
            mimeType: file.type,
        },
    };
};

const buildPrompt = (jobRequirements: string) => {
    return `Eres un asistente de Recursos Humanos experto en análisis de talento, redacción de perfiles y optimización de equipos. Tu tarea es analizar el/los currículums de un candidato en el contexto de los requisitos de un puesto específico.

    **Requisitos del Puesto:**
    ${jobRequirements}
    
    **Instrucciones de Análisis y Salida:**
    Analiza CUIDADOSAMENTE la información de los CVs adjuntos y los requisitos del puesto. Devuelve tu análisis EXCLUSIVAMENTE en un único objeto JSON válido, sin ningún texto o formato adicional fuera del JSON. Si no puedes leer un archivo, devuelve un JSON con status="ERROR_OCR" y un detalle del problema. Si el análisis es exitoso, status="SUCCESS".
    
    El objeto JSON debe seguir esta estructura exacta:
    {
      "candidateName": "string|null",
      "professionalSummary": "string",
      "comparisonData": [{ "skill": "string", "requerido": "number", "candidato": "number" }],
      "globalFitScore": { "score": "number", "explanation": "string" },
      "trainingRecommendations": ["string"],
      "aiResourceSuggestions": [{ "category": "string", "suggestion": "string" }],
      "status": "string",
      "details": "string|null"
    }

    **Reglas para cada campo:**
    1.  **candidateName**: Extrae el nombre completo. Si no se encuentra, déjalo en null.
    2.  **professionalSummary**: Genera un resumen de 80-120 palabras en español, positivo y profesional, destacando logros y habilidades clave.
    3.  **comparisonData**:
        -   Extrae las habilidades técnicas y blandas del CV. Normaliza sinónimos (ej: "JS" a "JavaScript").
        -   Estima el nivel del candidato por habilidad en una escala de 0 a 5 (0=nulo, 5=experto) basándote en años de experiencia, proyectos, certificaciones, etc.
        -   Estima el nivel requerido por la empresa para cada habilidad clave en una escala de 0 a 5.
        -   Crea un array de objetos, uno por cada habilidad principal mencionada en los requisitos del puesto.
    4.  **globalFitScore**:
        -   Calcula un puntaje de ajuste de 0 a 100.
        -   Pondera las habilidades según su importancia para el puesto.
        -   Aplica una penalización fuerte (-15 puntos) por cada habilidad CRÍTICA (must-have) ausente o con nivel muy bajo.
        -   Escribe una breve explicación de cómo llegaste a ese puntaje.
    5.  **trainingRecommendations**: Lista 2-4 recomendaciones claras de capacitación para que el candidato cierre brechas.
    6.  **aiResourceSuggestions**: Sugiere 2-3 herramientas o soluciones de IA, relevantes para el rol o sector, que podrían mejorar la eficiencia del equipo.
    7.  **No uses edad, género u otros datos no laborales en tu evaluación.**
    `;
};


export const analyzeCandidateProfile = async (
    jobRequirements: string,
    candidateFiles: File[]
): Promise<AnalysisResult> => {
    if (!process.env.API_KEY) {
        throw new Error("API key for Gemini is not configured.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-pro';

    const textPart = { text: buildPrompt(jobRequirements) };
    const fileParts = await Promise.all(candidateFiles.map(fileToGenerativePart));
    
    const contents = { parts: [textPart, ...fileParts] };

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        candidateName: { type: Type.STRING, nullable: true },
        professionalSummary: { type: Type.STRING },
        comparisonData: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              requerido: { type: Type.NUMBER },
              candidato: { type: Type.NUMBER },
            },
            required: ['skill', 'requerido', 'candidato'],
          },
        },
        globalFitScore: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
          },
          required: ['score', 'explanation'],
        },
        trainingRecommendations: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        aiResourceSuggestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              suggestion: { type: Type.STRING },
            },
            required: ['category', 'suggestion'],
          },
        },
        status: { type: Type.STRING },
        details: { type: Type.STRING, nullable: true },
      },
      required: [
        'professionalSummary',
        'comparisonData',
        'globalFitScore',
        'trainingRecommendations',
        'aiResourceSuggestions',
        'status',
      ],
    };

    try {
        const result = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2
            }
        });

        const jsonText = result.text.trim();
        const parsedResult = JSON.parse(jsonText) as AnalysisResult;
        return parsedResult;

    } catch (e) {
        console.error("Error calling Gemini API:", e);
        throw new Error("No se pudo obtener una respuesta válida de la IA. Revisa la consola para más detalles.");
    }
};
