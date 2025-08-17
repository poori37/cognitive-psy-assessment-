
import React from 'react';
import type { Challenge } from '../types';

interface ChallengeDisplayProps {
  challenge: Challenge;
}

const ChallengeDisplay: React.FC<ChallengeDisplayProps> = ({ challenge }) => {
  return (
    <div className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
      <h2 className="text-sm font-semibold text-sky-400 uppercase tracking-wider">Your Challenge</h2>
      <p className="mt-1 text-xl text-white">{challenge.prompt}</p>
    </div>
  );
};

export default ChallengeDisplay;
