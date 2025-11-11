
import React from 'react';
import { useAppContext } from './hooks/useAppContext';
import { Page } from './types';
import { LandingPage } from './pages/LandingPage';
import { GamePage } from './pages/GamePage';
import { SummaryPage } from './pages/SummaryPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { TrainingPage } from './pages/TrainingPage';
import { ProfilePage } from './pages/ProfilePage';
import { HistoryPage } from './pages/HistoryPage';

const App: React.FC = () => {
  const { page, user } = useAppContext();

  const renderPage = () => {
    // If user is logged in, certain pages redirect to Home
    if (user) {
        switch(page) {
            case Page.Landing:
            case Page.Login:
            case Page.Register:
            case Page.Recommendations: // After login, recommendations are part of the flow from home
                return <HomePage />;
            case Page.Home:
                return <HomePage />;
            case Page.Game:
                return <GamePage />;
            case Page.Summary:
                return <SummaryPage />;
            case Page.Training:
                return <TrainingPage />;
            case Page.Profile:
                return <ProfilePage />;
            case Page.History:
                return <HistoryPage />;
            default:
                return <HomePage />;
        }
    }

    // Guest flow
    switch (page) {
      case Page.Landing:
        return <LandingPage />;
      case Page.Game:
        return <GamePage />;
      case Page.Summary:
        return <SummaryPage />;
      case Page.Recommendations:
        return <RecommendationsPage />;
      case Page.Login:
        return <LoginPage />;
      case Page.Register:
        return <RegisterPage />;
      default:
        return <LandingPage />;
    }
  };

  return <div className="antialiased">{renderPage()}</div>;
};

export default App;
