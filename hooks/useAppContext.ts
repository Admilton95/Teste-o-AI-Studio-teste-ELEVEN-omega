
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useCallback } from 'react';
import { Page, User, AssessmentResults, IntelligenceType } from '../types';

interface AppContextType {
  page: Page;
  setPage: Dispatch<SetStateAction<Page>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  results: AssessmentResults | null;
  setResults: Dispatch<SetStateAction<AssessmentResults | null>>;
  selectedIntelligences: IntelligenceType[];
  setSelectedIntelligences: Dispatch<SetStateAction<IntelligenceType[]>>;
  historyStack: Page[];
  navigate: (newPage: Page) => void;
  goBack: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasVisited] = useState(() => localStorage.getItem('hasVisited') === 'true');
  const [page, setPage] = useState<Page>(hasVisited ? Page.Home : Page.Landing);
  const [user, setUser] = useState<User | null>(null); // Start with no user logged in
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [selectedIntelligences, setSelectedIntelligences] = useState<IntelligenceType[]>([]);
  const [historyStack, setHistoryStack] = useState<Page[]>([hasVisited ? Page.Home : Page.Landing]);

  const navigate = useCallback((newPage: Page) => {
    setHistoryStack(prev => [...prev, newPage]);
    setPage(newPage);
  }, []);

  const goBack = useCallback(() => {
    setHistoryStack(prev => {
        if (prev.length <= 1) return prev;
        const newStack = [...prev];
        newStack.pop();
        setPage(newStack[newStack.length - 1]);
        return newStack;
    });
  }, []);


  // FIX: Replaced JSX with React.createElement to be compatible with a .ts file extension.
  // The original JSX syntax was causing parsing errors because this file is not a .tsx file.
  return React.createElement(AppContext.Provider, {
    value: {
      page,
      setPage: navigate,
      user,
      setUser,
      results,
      setResults,
      selectedIntelligences,
      setSelectedIntelligences,
      historyStack,
      navigate,
      goBack,
    },
  }, children);
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
