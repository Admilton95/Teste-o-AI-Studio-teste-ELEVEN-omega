
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Page } from '../types';

export const TrainingPage: React.FC = () => {
    const { goBack, selectedIntelligences } = useAppContext();

    const hasSelectedIntelligences = selectedIntelligences.length > 0;

    return (
        <div className="min-h-screen bg-brand-background p-4 animate-fade-in">
            <Header onBack={goBack} />
            <main className="max-w-2xl mx-auto pt-20 text-center">
                <h1 className="text-4xl font-bold text-brand-text-primary mb-4">Modo Treino</h1>
                <p className="text-brand-text-secondary mb-10">Escolha como pretende treinar as suas habilidades.</p>

                <div className="space-y-6">
                    <div className={`p-8 border-2 rounded-xl transition-opacity ${hasSelectedIntelligences ? 'border-brand-secondary' : 'border-gray-300 opacity-60'}`}>
                        <h2 className="text-2xl font-bold text-brand-text-primary">Treine-me</h2>
                        <p className="text-brand-text-secondary my-3">
                            Inicie uma sequência de jogos aleatória, focada nas inteligências que escolheu desenvolver.
                        </p>
                        <Button variant="secondary" onClick={() => alert("Modo 'Treine-me' iniciado!")} disabled={!hasSelectedIntelligences}>
                            Começar Treino Guiado
                        </Button>
                        {!hasSelectedIntelligences && <p className="text-xs text-gray-500 mt-2">Complete um teste primeiro para ativar este modo.</p>}
                    </div>

                    <div className="p-8 border-2 border-brand-primary rounded-xl">
                        <h2 className="text-2xl font-bold text-brand-text-primary">Escolha o seu próprio treino</h2>
                        <p className="text-brand-text-secondary my-3">
                            Selecione manualmente os jogos ou as inteligências que pretende praticar.
                        </p>
                        <Button variant="primary" onClick={() => alert("Escolha o seu treino!")}>
                            Personalizar Treino
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};
