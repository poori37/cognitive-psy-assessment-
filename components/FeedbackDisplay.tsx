
import React from 'react';
import type { ValidationResult } from '../types';
import { CheckCircle2, XCircle, ArrowRightCircle } from 'lucide-react';

interface FeedbackDisplayProps {
  result: ValidationResult;
  onNextChallenge: () => void;
  canAdvance: boolean;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
  const circumference = 2 * Math.PI * 30; // 2 * pi * r
  const offset = circumference - (score / 100) * circumference;

  let strokeColor = 'stroke-green-400';
  if (score < 50) strokeColor = 'stroke-red-400';
  else if (score < 80) strokeColor = 'stroke-yellow-400';

  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full" viewBox="0 0 70 70">
        <circle
          className="text-slate-700"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="35"
          cy="35"
        />
        <circle
          className={`transform -rotate-90 origin-center ${strokeColor} transition-all duration-1000`}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="35"
          cy="35"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">{score}</span>
    </div>
  );
};


const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ result, onNextChallenge, canAdvance }) => {
  const { isCorrect, feedback, score } = result;

  const title = score === 100 ? 'Perfect!' : score >= 80 ? 'Excellent!' : isCorrect ? 'Correct!' : 'Needs Improvement';

  return (
    <div className={`p-4 rounded-lg flex flex-col sm:flex-row items-start gap-4 ${isCorrect ? 'bg-green-900/50 border-green-700' : 'bg-red-900/50 border-red-700'} border`}>
      <div className="flex-shrink-0 mx-auto sm:mx-0">
        <ScoreCircle score={score} />
      </div>
      <div className="flex-grow text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
            {isCorrect ? (
                <CheckCircle2 className="text-green-400" size={24} />
            ) : (
                <XCircle className="text-red-400" size={24} />
            )}
            <h3 className={`text-xl font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                {title}
            </h3>
        </div>
        <p className="mt-1 text-slate-200">{feedback}</p>
        
        {canAdvance && score < 100 && (
            <p className="mt-2 text-sm text-sky-200/80 italic">
                You can move on, or try rearranging the words to get a perfect 100!
            </p>
        )}

        {canAdvance && (
            <button 
                onClick={onNextChallenge}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
            >
                Next Challenge
                <ArrowRightCircle size={20} />
            </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackDisplay;
