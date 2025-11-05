import React from 'react';

interface HeaderProps {
    onToggleNav: () => void;
}

const Logo = () => (
    <div className="flex items-center space-x-3">
        <div className="bg-primary-gold p-2 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-16a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
        </div>
        <span className="font-bold text-xl text-brand-text-primary">Empower Forward</span>
    </div>
);

const Header: React.FC<HeaderProps> = ({ onToggleNav }) => {
    return (
        <header className="md:hidden fixed top-0 left-0 right-0 z-20 h-20 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center justify-between">
            <Logo />
            <button onClick={onToggleNav} className="p-2 -mr-2 text-brand-text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </header>
    );
};

export default Header;