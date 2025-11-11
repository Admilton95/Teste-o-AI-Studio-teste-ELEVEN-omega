
import { IntelligenceType, AgeGroup } from './types';

export const INTELLIGENCE_DATA = {
  [IntelligenceType.Linguistic]: { profession: 'Escritor / Jornalista' },
  [IntelligenceType.LogicalMathematical]: { profession: 'Cientista / Matemático' },
  [IntelligenceType.Spatial]: { profession: 'Arquiteto / Designer' },
  [IntelligenceType.BodilyKinesthetic]: { profession: 'Atleta / Dançarino' },
  [IntelligenceType.Musical]: { profession: 'Músico / Compositor' },
  [IntelligenceType.Interpersonal]: { profession: 'Professor / Psicólogo' },
  [IntelligenceType.Intrapersonal]: { profession: 'Filósofo / Conselheiro' },
  [IntelligenceType.Naturalist]: { profession: 'Biólogo / Ecologista' },
};

export const AGE_GROUPS: Record<AgeGroup, { min: number; max: number }> = {
  [AgeGroup['3-6']]: { min: 3, max: 6 },
  [AgeGroup['7-10']]: { min: 7, max: 10 },
  [AgeGroup['11-15']]: { min: 11, max: 15 },
  [AgeGroup['16-21']]: { min: 16, max: 21 },
  [AgeGroup['22+']]: { min: 22, max: 100 },
};

// --- AVISO TÉCNICO ---
// Os dados abaixo são MOCK DATA para fins de demonstração.
// Numa aplicação real, estes valores (mean, sd) devem ser calculados
// a partir de uma amostra piloto representativa para cada faixa etária
// e para cada jogo/métrica. A calibração estatística é crucial para
// a validade das estimativas.
export const CALIBRATION_DATA: Record<AgeGroup, { mean: number; sd: number }> = {
  [AgeGroup['3-6']]: { mean: 50, sd: 10 },
  [AgeGroup['7-10']]: { mean: 65, sd: 12 },
  [AgeGroup['11-15']]: { mean: 75, sd: 15 },
  [AgeGroup['16-21']]: { mean: 85, sd: 15 },
  [AgeGroup['22+']]: { mean: 80, sd: 18 },
};

export const ICONS: Record<IntelligenceType, string> = {
    [IntelligenceType.Linguistic]: '📖',
    [IntelligenceType.LogicalMathematical]: '🧮',
    [IntelligenceType.Spatial]: '🧊',
    [IntelligenceType.BodilyKinesthetic]: '🤸',
    [IntelligenceType.Musical]: '🎵',
    [IntelligenceType.Interpersonal]: '👥',
    [IntelligenceType.Intrapersonal]: '🧘',
    [IntelligenceType.Naturalist]: '🌿',
};
