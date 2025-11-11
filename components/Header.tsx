
import React from 'react';
import PanicButton from './PanicButton';

interface HeaderProps {
    onNavigateHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button onClick={onNavigateHome} className="text-2xl font-bold hover:opacity-80 transition-opacity">
                        💙 ApoioJá
                    </button>
                    <PanicButton className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                       <span className="hidden sm:inline">Modo Silêncio</span>
                       <span className="text-xl">🕵️</span>
                    </PanicButton>
                </div>
            </div>
        </header>
    );
};

export default Header;
