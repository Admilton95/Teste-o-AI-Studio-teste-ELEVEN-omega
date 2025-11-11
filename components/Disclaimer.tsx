
import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md">
      <p className="font-bold">Aviso Importante</p>
      <p className="text-sm">
        Esta é uma avaliação estimada e não substitui um diagnóstico clínico ou profissional. 
        Os resultados são para fins educativos e de autoconhecimento.
      </p>
    </div>
  );
};
