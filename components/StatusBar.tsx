
import React from 'react';
import { Award, BarChart2 } from 'lucide-react';

interface StatusBarProps {
    levelName: string;
    score: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ levelName, score }) => {
    return (
        <div className="w-full max-w-4xl mx-auto mt-6 flex justify-between items-center bg-slate-800/60 p-3 rounded-lg ring-1 ring-white/10">
            <div className="flex items-center gap-2">
                <BarChart2 className="text-sky-400" size={20} />
                <span className="text-sm font-semibold text-slate-300">LEVEL:</span>
                <span className="text-md font-bold text-white">{levelName}</span>
            </div>
            <div className="flex items-center gap-2">
                <Award className="text-amber-400" size={20} />
                <span className="text-sm font-semibold text-slate-300">SCORE:</span>
                <span className="text-md font-bold text-white">{score}</span>
            </div>
        </div>
    );
};

export default StatusBar;
