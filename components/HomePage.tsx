import React from 'react';
import { Page } from '../types';
import { AlertTriangleIcon, MessageSquareIcon } from './icons';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-2xl w-full transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-3">
          💙 ApoioJá
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Um espaço seguro e anônimo para pedir ajuda e obter apoio emocional.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onNavigate(Page.Report)}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
          >
            <AlertTriangleIcon className="h-6 w-6" />
            <span>Fazer uma Denúncia</span>
          </button>
          <button
            onClick={() => onNavigate(Page.Chat)}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
          >
            <MessageSquareIcon className="h-6 w-6" />
            <span>Apoio Emocional</span>
          </button>
        </div>
        <img src="/apoioja-banner.png" alt="Ilustração de ApoioJá: uma pessoa oferecendo conforto a outra." className="mt-10 rounded-lg shadow-md w-full max-w-sm mx-auto" />
      </div>
      <footer className="mt-8 text-gray-500 text-sm">
        <p>Sua segurança e anonimato são nossa prioridade.</p>
      </footer>
    </div>
  );
};

export default HomePage;