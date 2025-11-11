
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page, User } from '../types';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

export const RegisterPage: React.FC = () => {
    const { setUser, setPage, goBack } = useAppContext();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        const ageNum = parseInt(age, 10);
        if (name && age && password && !isNaN(ageNum)) {
            // Mock registration logic
            const newUser: User = { name, age: ageNum };
            setUser(newUser);
            setPage(Page.Home);
        } else {
            setError('Por favor, preencha todos os campos corretamente.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 animate-fade-in">
            <Header onBack={goBack} />
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-primary">Crie a sua Conta</h1>
                    <p className="text-brand-text-secondary">Comece a sua jornada de autodescoberta hoje!</p>
                </div>
                <form onSubmit={handleRegister} className="bg-white shadow-lg rounded-xl p-8 space-y-4">
                    <div>
                        <label htmlFor="name-reg" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input id="name-reg" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label htmlFor="age-reg" className="block text-sm font-medium text-gray-700">Idade</label>
                        <input id="age-reg" type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label htmlFor="password-reg" className="block text-sm font-medium text-gray-700">Senha</label>
                        <input id="password-reg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    {/* Optional photo upload could be added here */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full !mt-6" size="lg">Registar</Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <button onClick={() => setPage(Page.Login)} className="font-medium text-brand-primary hover:text-indigo-500">
                        Faça login
                    </button>
                </p>
            </div>
        </div>
    );
};
