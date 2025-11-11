
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Header } from '../components/Header';

export const ProfilePage: React.FC = () => {
    const { goBack, user } = useAppContext();

    return (
        <div className="min-h-screen bg-brand-background p-4 animate-fade-in">
            <Header onBack={goBack} />
            <main className="max-w-2xl mx-auto pt-20 text-center">
                <h1 className="text-4xl font-bold text-brand-text-primary mb-4">Perfil</h1>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-lg"><strong>Nome:</strong> {user?.name}</p>
                    <p className="text-lg"><strong>Idade:</strong> {user?.age}</p>
                    <p className="text-brand-text-secondary mt-4">(Página em construção)</p>
                </div>
            </main>
        </div>
    );
};
