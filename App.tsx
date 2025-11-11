
import React, { useState, useCallback } from 'react';
import { Page } from './types';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ReportPage from './components/ReportPage';
import ChatbotPage from './components/ChatbotPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Report:
        return <ReportPage />;
      case Page.Chat:
        return <ChatbotPage />;
      case Page.Home:
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans text-gray-800 antialiased">
      <Header onNavigateHome={() => navigate(Page.Home)} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
