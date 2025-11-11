
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page, GameMetrics } from '../types';
import { calculateAssessment } from '../utils/assessment';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

const patterns = [
  { question: 'A, C, E, G, ?', answer: 'I' },
  { question: '2, 4, 8, 16, ?', answer: '32' },
  { question: '↑, →, ↓, ←, ?', answer: '↑' },
  { question: 'Z, Y, X, W, ?', answer: 'V' },
  { question: '1, 1, 2, 3, 5, ?', answer: '8' },
];

export const GamePage: React.FC = () => {
  const { setPage, setResults, goBack } = useAppContext();
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (userAnswer.trim().toLowerCase() === patterns[currentPatternIndex].answer.toLowerCase()) {
      setScore(s => s + 1);
    }
    setUserAnswer('');
    if (currentPatternIndex < patterns.length - 1) {
      setCurrentPatternIndex(i => i + 1);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setIsLoading(true);
    const endTime = Date.now();
    const metrics: GameMetrics = {
      correct: score,
      total: patterns.length,
      time: (endTime - startTime) / 1000,
    };
    
    // Using a mock user age for guest mode.
    // In a real app, this would be asked or come from a profile.
    const userAge = 25; 
    const assessmentResults = calculateAssessment(metrics, userAge);
    
    setTimeout(() => {
        setResults(assessmentResults);
        setPage(Page.Summary);
        setIsLoading(false);
    }, 1500); // Simulate calculation time
  };
  
  const currentProgress = ((currentPatternIndex + 1) / patterns.length) * 100;

  if (isLoading) {
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-background p-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
              <p className="mt-4 text-lg text-brand-text-secondary">A calcular os seus resultados...</p>
          </div>
      )
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4 animate-fade-in">
        <Header onBack={goBack} />
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-brand-text-secondary text-center">Jogo de Padrões</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Complete a sequência</p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-brand-secondary h-2.5 rounded-full" style={{ width: `${currentProgress}%`, transition: 'width 0.3s ease-in-out' }}></div>
            </div>

            <div className="my-8 text-center">
                <p className="text-3xl font-mono tracking-widest text-brand-text-primary">
                    {patterns[currentPatternIndex].question}
                </p>
            </div>
            
            <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                placeholder="Resposta"
                autoFocus
            />

            <Button onClick={handleNext} className="w-full mt-6" size="lg">
                {currentPatternIndex < patterns.length - 1 ? 'Próximo' : 'Finalizar'}
            </Button>
        </div>
    </div>
  );
};
