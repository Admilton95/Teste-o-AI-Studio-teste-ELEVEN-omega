
export enum Page {
  Landing,
  Game,
  Summary,
  Recommendations,
  Login,
  Register,
  Home,
  Training,
  Profile,
  History,
}

export enum IntelligenceType {
  Linguistic = 'Linguística',
  LogicalMathematical = 'Lógico-Matemática',
  Spatial = 'Espacial',
  BodilyKinesthetic = 'Corporal-Cinestésica',
  Musical = 'Musical',
  Interpersonal = 'Interpessoal',
  Intrapersonal = 'Intrapessoal',
  Naturalist = 'Naturalista',
}

export interface IntelligenceScore {
  type: IntelligenceType;
  score: number; // Percentage 0-100
  profession: string;
}

export interface AssessmentResults {
  intelligences: IntelligenceScore[];
  memory: number; // Percentage 0-100
  iq: number; // Estimated IQ
}

export interface User {
  name: string;
  age: number;
  photo?: string;
}

export enum AgeGroup {
  '3-6',
  '7-10',
  '11-15',
  '16-21',
  '22+',
}

export interface GameMetrics {
    correct: number;
    total: number;
    time: number; // in seconds
}
