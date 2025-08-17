
import React from 'react';
import { PenSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
        <div className="flex items-center justify-center gap-4">
            <PenSquare size={48} className="text-sky-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
                The Syntax Card Game
            </h1>
        </div>
        <p className="mt-2 text-lg text-slate-300">
            Build sentences, complete challenges, and master grammar with AI feedback.
        </p>
    </header>
  );
};

export default Header;
