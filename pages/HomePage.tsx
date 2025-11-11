
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page } from '../types';
import { Button } from '../components/Button';

const HomeButton: React.FC<{ icon: string; title: string; description: string; onClick: () => void; className?: string }> = ({ icon, title, description, onClick, className }) => (
    <button onClick={onClick} className={`text-left p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start space-x-4 ${className}`}>
        <div className="text-4xl">{icon}</div>
        <div>
            <h3 className="text-xl font-bold text-brand-text-primary">{title}</h3>
            <p className="text-brand-text-secondary mt-1">{description}</p>
        </div>
    </button>
);

export const HomePage: React.FC = () => {
    const { user, setPage, setUser } = useAppContext();

    if (!user) {
        // This should not happen if logic is correct, but as a fallback
        setPage(Page.Login);
        return null;
    }
    
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('hasVisited'); // Reset for new guest session
        setPage(Page.Landing);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8 animate-fade-in">
            <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-brand-primary">Olá, {user.name}!</h1>
                    <p className="text-brand-text-secondary">Pronto para crescer hoje?</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={() => setPage(Page.Profile)}>Perfil</Button>
                    <Button variant="danger" size="sm" onClick={handleLogout}>Sair</Button>
                </div>
            </header>
            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                <HomeButton 
                    icon="🧠" 
                    title="Modo Teste" 
                    description="Faça uma avaliação completa para obter um novo resumo." 
                    onClick={() => setPage(Page.Game)}
                    className="lg:col-span-2 bg-gradient-to-r from-brand-primary to-indigo-600 !text-white"
                />
                <HomeButton 
                    icon="🏋️" 
                    title="Modo Treino" 
                    description="Exercícios focados para desenvolver as suas inteligências." 
                    onClick={() => setPage(Page.Training)} 
                />
                <HomeButton 
                    icon="📊" 
                    title="Histórico e Estatísticas" 
                    description="Veja a sua evolução, recordes e progresso ao longo do tempo." 
                    onClick={() => setPage(Page.History)} 
                />
            </main>
        </div>
    );
};
