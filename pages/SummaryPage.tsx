
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page, IntelligenceType } from '../types';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Disclaimer } from '../components/Disclaimer';
import { ICONS } from '../constants';

const ProgressBar: React.FC<{ value: number; color: string }> = ({ value, color }) => (
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className={`h-4 rounded-full ${color}`}
      style={{ width: `${value}%`, transition: 'width 0.5s ease-in-out' }}
    ></div>
  </div>
);

const IntelligenceCard: React.FC<{ icon: string; type: IntelligenceType; score: number; profession: string; isSelected: boolean; onSelect: () => void }> = ({ icon, type, score, profession, isSelected, onSelect }) => {
    return (
        <div 
            onClick={onSelect}
            className={`p-4 bg-white rounded-lg shadow-md transition-all duration-300 cursor-pointer border-2 ${isSelected ? 'border-brand-primary ring-2 ring-brand-primary' : 'border-transparent hover:shadow-lg'}`}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <span className="text-2xl mr-3">{icon}</span>
                    <h3 className="font-bold text-brand-text-primary">{type}</h3>
                </div>
                <span className="font-bold text-lg text-brand-primary">{score}%</span>
            </div>
            <ProgressBar value={score} color="bg-brand-primary" />
            <p className="text-xs text-brand-text-secondary mt-2">Ex: {profession}</p>
        </div>
    );
};

export const SummaryPage: React.FC = () => {
  const { results, setPage, goBack, selectedIntelligences, setSelectedIntelligences } = useAppContext();
  const [localSelection, setLocalSelection] = useState<IntelligenceType[]>(selectedIntelligences);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>A carregar resultados...</p>
        <Button onClick={() => setPage(Page.Game)}>Voltar ao Jogo</Button>
      </div>
    );
  }

  const handleSelect = (type: IntelligenceType) => {
    setLocalSelection(prev => {
        if (prev.includes(type)) {
            return prev.filter(t => t !== type);
        }
        if (prev.length < 3) {
            return [...prev, type];
        }
        return prev;
    });
  };

  const handleContinue = () => {
    setSelectedIntelligences(localSelection);
    setPage(Page.Recommendations);
  };

  const sortedIntelligences = [...results.intelligences].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-brand-background p-4 pb-24 animate-fade-in">
      <Header onBack={goBack} />
      <main className="max-w-4xl mx-auto pt-16">
        <h1 className="text-3xl font-bold text-center mb-2 text-brand-text-primary">Resumo da Avaliação</h1>
        <p className="text-center text-brand-text-secondary mb-8">Aqui está um resumo do seu desempenho.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <h2 className="text-lg font-semibold text-brand-text-secondary mb-2">Q.I. Estimado</h2>
                <p className="text-6xl font-bold text-brand-secondary">{results.iq}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                <h2 className="text-lg font-semibold text-brand-text-secondary mb-2">Memória</h2>
                <p className="text-6xl font-bold text-brand-secondary">{results.memory}<span className="text-4xl">%</span></p>
            </div>
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-4 text-brand-text-primary">Perfil de Inteligências</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedIntelligences.map((intel) => (
                    <IntelligenceCard
                        key={intel.type}
                        icon={ICONS[intel.type]}
                        type={intel.type}
                        score={intel.score}
                        profession={intel.profession}
                        isSelected={localSelection.includes(intel.type)}
                        onSelect={() => handleSelect(intel.type)}
                    />
                ))}
            </div>
        </div>
        
        <div className="mt-8 text-center p-4 bg-indigo-100 rounded-lg">
            <h3 className="text-lg font-semibold text-brand-primary">Próximo Passo</h3>
            <p className="text-brand-text-secondary">Escolha até 3 inteligências que gostaria de desenvolver.</p>
            <p className="font-bold text-brand-text-primary my-2">{localSelection.length} / 3 selecionadas</p>
            <Button onClick={handleContinue} disabled={localSelection.length === 0}>
                Ver Recomendações
            </Button>
        </div>

        <Disclaimer />
      </main>
    </div>
  );
};
