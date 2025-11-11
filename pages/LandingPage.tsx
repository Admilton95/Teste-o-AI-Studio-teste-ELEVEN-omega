
import React from 'react';
import { Button } from '../components/Button';
import { useAppContext } from '../hooks/useAppContext';
import { Page } from '../types';

export const LandingPage: React.FC = () => {
  const { setPage } = useAppContext();

  const handleStart = () => {
    localStorage.setItem('hasVisited', 'true');
    setPage(Page.Game);
  };

  const handleExit = () => {
    // In a real web app, this might close the window or redirect.
    // For this SPA, we'll just show an alert.
    alert('Sessão terminada. Obrigado por visitar!');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4 text-center animate-fade-in">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" onClick={handleExit}>Sair</Button>
      </div>
      <main className="flex flex-col items-center">
        <div className="mb-8 animate-slide-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold text-brand-primary">IntelliGrow</h1>
            <p className="mt-4 text-lg md:text-xl text-brand-text-secondary">
                Descubra o seu potencial. Desenvolva as suas inteligências.
            </p>
        </div>
        <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <Button size="lg" onClick={handleStart}>
            Experimente Agora
            </Button>
        </div>
      </main>
    </div>
  );
};
