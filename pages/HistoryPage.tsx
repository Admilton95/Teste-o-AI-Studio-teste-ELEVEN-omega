
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Header } from '../components/Header';

export const HistoryPage: React.FC = () => {
    const { goBack } = useAppContext();

    return (
        <div className="min-h-screen bg-brand-background p-4 animate-fade-in">
            <Header onBack={goBack} />
            <main className="max-w-2xl mx-auto pt-20 text-center">
                <h1 className="text-4xl font-bold text-brand-text-primary mb-4">Histórico e Estatísticas</h1>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-brand-text-secondary">(Página em construção)</p>
                </div>
            </main>
        </div>
    );
};
