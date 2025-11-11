
import React from 'react';
import { Button } from './Button';

interface HeaderProps {
  onBack?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onBack, title }) => {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
      {onBack ? (
        <Button onClick={onBack} variant="ghost" size="sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="ml-2">Voltar</span>
        </Button>
      ) : <div />}
      {title && <h1 className="text-xl font-bold text-brand-text-primary">{title}</h1>}
      <div />
    </header>
  );
};
