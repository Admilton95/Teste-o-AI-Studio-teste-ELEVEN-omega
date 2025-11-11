
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page, User } from '../types';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

export const LoginPage: React.FC = () => {
    const { setUser, setPage, goBack } = useAppContext();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && password) {
            // Mock login logic
            const mockUser: User = { name: name, age: 28 }; // Mock age
            setUser(mockUser);
            setPage(Page.Home);
        } else {
            setError('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 animate-fade-in">
            <Header onBack={goBack} />
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-primary">Bem-vindo de volta!</h1>
                    <p className="text-brand-text-secondary">Faça login para continuar a sua jornada.</p>
                </div>
                <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full" size="lg">Entrar</Button>
                </form>
                 <p className="mt-4 text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <button onClick={() => setPage(Page.Register)} className="font-medium text-brand-primary hover:text-indigo-500">
                        Registe-se
                    </button>
                </p>
            </div>
        </div>
    );
};
