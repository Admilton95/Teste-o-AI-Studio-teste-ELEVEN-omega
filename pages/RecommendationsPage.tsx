
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page, IntelligenceType } from '../types';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { ICONS } from '../constants';

const ActionPlanItem: React.FC<{ intelligence: IntelligenceType; action: string }> = ({ intelligence, action }) => (
    <div className="flex items-start p-3 bg-gray-50 rounded-lg">
        <span className="text-2xl mr-4 mt-1">{ICONS[intelligence]}</span>
        <div>
            <h4 className="font-semibold text-brand-text-primary">{intelligence}</h4>
            <p className="text-sm text-brand-text-secondary">{action}</p>
        </div>
    </div>
);

// Mock data for action plans
const ACTION_PLANS: Record<IntelligenceType, string> = {
    [IntelligenceType.Linguistic]: "Leia um livro por 30 minutos todos os dias ou escreva um pequeno parágrafo sobre o seu dia.",
    [IntelligenceType.LogicalMathematical]: "Resolva puzzles de Sudoku ou problemas de lógica encontrados online.",
    [IntelligenceType.Spatial]: "Tente desenhar um mapa da sua vizinhança de memória ou monte um quebra-cabeças.",
    [IntelligenceType.BodilyKinesthetic]: "Pratique um novo desporto, dance ou siga um vídeo de ioga online.",
    [IntelligenceType.Musical]: "Ouça um novo género de música ou tente aprender os acordes básicos de uma canção no ukulele.",
    [IntelligenceType.Interpersonal]: "Inicie uma conversa com um colega ou amigo sobre os seus interesses e pratique a escuta ativa.",
    [IntelligenceType.Intrapersonal]: "Medite por 5-10 minutos ou escreva num diário sobre os seus sentimentos e objetivos.",
    [IntelligenceType.Naturalist]: "Dê um passeio na natureza e tente identificar 5 tipos diferentes de plantas ou pássaros."
};

export const RecommendationsPage: React.FC = () => {
    const { results, selectedIntelligences, setPage, goBack } = useAppContext();

    if (!results) {
        return <div className="p-8">Não foram encontrados resultados. Por favor, complete uma avaliação primeiro.</div>;
    }

    const topThree = [...results.intelligences].sort((a, b) => b.score - a.score).slice(0, 3);

    return (
        <div className="min-h-screen bg-brand-background p-4 pb-24 animate-fade-in">
            <Header onBack={goBack} />
            <main className="max-w-3xl mx-auto pt-16">
                <h1 className="text-3xl font-bold text-center mb-2 text-brand-text-primary">O seu Plano de Ação</h1>
                <p className="text-center text-brand-text-secondary mb-8">Com base nos seus resultados e seleções, aqui estão algumas sugestões.</p>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold mb-3 text-brand-text-primary">As suas Habilidades em Destaque</h2>
                        <ul className="list-disc list-inside space-y-2 text-brand-text-secondary">
                            {topThree.map(intel => (
                                <li key={intel.type}>
                                    <span className="font-semibold">{intel.type}:</span> Excelente capacidade para {intel.type === IntelligenceType.Linguistic ? 'comunicação e expressão' : intel.type === IntelligenceType.LogicalMathematical ? 'raciocínio abstrato e resolução de problemas' : 'perceção visual e espacial'}.
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold mb-3 text-brand-text-primary">Profissões Sugeridas</h2>
                        <div className="flex flex-wrap gap-2">
                            {topThree.map(intel => (
                                <span key={intel.profession} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1.5 rounded-full">
                                    {intel.profession}
                                </span>
                            ))}
                        </div>
                    </div>

                    {selectedIntelligences.length > 0 && (
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold mb-3 text-brand-text-primary">Atividades para Desenvolver</h2>
                            <div className="space-y-4">
                                {selectedIntelligences.map(intelType => (
                                    <ActionPlanItem key={intelType} intelligence={intelType} action={ACTION_PLANS[intelType]} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-10 text-center p-6 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg text-white shadow-xl">
                    <h3 className="text-2xl font-bold">Guarde o seu progresso!</h3>
                    <p className="mt-2 mb-6">Crie uma conta para acompanhar a sua evolução, definir metas e desbloquear novos desafios.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => setPage(Page.Register)} variant="ghost" className="bg-white text-brand-primary hover:bg-gray-100">
                            Registar
                        </Button>
                        <Button onClick={() => setPage(Page.Login)} variant="ghost" className="bg-white/20 text-white hover:bg-white/30">
                            Já tenho conta
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};
