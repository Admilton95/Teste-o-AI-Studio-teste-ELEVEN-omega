
import { GameMetrics, AssessmentResults, IntelligenceScore, AgeGroup, IntelligenceType } from '../types';
import { CALIBRATION_DATA, INTELLIGENCE_DATA, AGE_GROUPS } from '../constants';
import { produce } from 'immer';

function getAgeGroup(age: number): AgeGroup {
    if (age <= 6) return AgeGroup['3-6'];
    if (age <= 10) return AgeGroup['7-10'];
    if (age <= 15) return AgeGroup['11-15'];
    if (age <= 21) return AgeGroup['16-21'];
    return AgeGroup['22+'];
}

export function calculateAssessment(metrics: GameMetrics, age: number): AssessmentResults {
    const ageGroup = getAgeGroup(age);
    const { mean, sd } = CALIBRATION_DATA[ageGroup];

    // Simulação de cálculo de um "raw_score" a partir das métricas do jogo.
    // Numa app real, isto seria uma fórmula mais complexa, específica de cada jogo.
    const rawScore = (metrics.correct / metrics.total) * 100 - (metrics.time / 10);
    const normalizedScore = Math.max(0, rawScore); // Garantir que não é negativo

    // Cálculo do Z-score
    const z = (normalizedScore - mean) / sd;

    // Cálculo do Q.I. estimado
    const iq = Math.round(100 + 15 * z);

    // Geração de pontuações de inteligência simuladas.
    // Num sistema real, cada jogo contribuiria para uma ou mais inteligências específicas.
    // Aqui, vamos gerar valores aleatórios mas plausíveis para a demo.
    const baseScores = produce(Object.keys(INTELLIGENCE_DATA) as IntelligenceType[], draft => {
        for (let i = draft.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [draft[i], draft[j]] = [draft[j], draft[i]];
        }
    });

    const intelligences: IntelligenceScore[] = baseScores.map((type, index) => {
        // A primeira inteligência terá a pontuação mais alta, para dar alguma consistência
        const score = Math.min(100, Math.max(10, Math.round(normalizedScore + (Math.random() - 0.5) * 40 - index * 5)));
        return {
            type: type,
            score: score,
            profession: INTELLIGENCE_DATA[type].profession,
        };
    });

    // Simulação da pontuação de memória
    const memory = Math.min(100, Math.max(10, Math.round(normalizedScore + (Math.random() - 0.5) * 20)));

    return {
        intelligences,
        memory,
        iq,
    };
}
