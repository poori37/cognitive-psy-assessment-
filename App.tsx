
import React, { useState, useEffect, useCallback } from 'react';
import { LEVELS, getCardsForChallenge } from './constants';
import type { CardData, ValidationResult } from './types';
import { validateSentence } from './services/geminiService';
import Header from './components/Header';
import ChallengeDisplay from './components/ChallengeDisplay';
import SentenceTray from './components/SentenceTray';
import CardPool from './components/CardPool';
import FeedbackDisplay from './components/FeedbackDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import StatusBar from './components/StatusBar';
import { CheckCircle, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState<number>(() => Number(localStorage.getItem('levelIndex') || '0'));
  const [challengeIndex, setChallengeIndex] = useState<number>(() => Number(localStorage.getItem('challengeIndex') || '0'));
  const [totalScore, setTotalScore] = useState<number>(() => Number(localStorage.getItem('totalScore') || '0'));
  
  const [availableCards, setAvailableCards] = useState<CardData[]>([]);
  const [sentenceCards, setSentenceCards] = useState<CardData[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [challengeBestScore, setChallengeBestScore] = useState<number>(0);

  const currentLevel = LEVELS[levelIndex];
  const currentChallenge = currentLevel?.challenges[challengeIndex];

  const loadChallenge = useCallback((levelIdx: number, challengeIdx: number) => {
    const level = LEVELS[levelIdx];
    const challenge = level?.challenges[challengeIdx];
    if (challenge) {
      setAvailableCards(getCardsForChallenge(challenge.id));
      setSentenceCards([]);
      setValidationResult(null);
      setError(null);
      setChallengeBestScore(0);
      localStorage.setItem('levelIndex', String(levelIdx));
      localStorage.setItem('challengeIndex', String(challengeIdx));
    } else {
      // Handle game completion
      console.log("Game completed!");
    }
  }, []);
  
  useEffect(() => {
    loadChallenge(levelIndex, challengeIndex);
  }, [levelIndex, challengeIndex, loadChallenge]);

  useEffect(() => {
    localStorage.setItem('totalScore', String(totalScore));
  }, [totalScore]);

  const handleDropToSentence = (cardId: string, position?: number) => {
    const cardToMove = availableCards.find(c => c.id === cardId);
    if (cardToMove) {
      setAvailableCards(prev => prev.filter(c => c.id !== cardId));
      setSentenceCards(prev => {
        const newSentence = [...prev];
        if (position !== undefined) {
            newSentence.splice(position, 0, cardToMove);
        } else {
            newSentence.push(cardToMove);
        }
        return newSentence;
      });
    }
  };

  const handleReturnToPool = (cardId: string) => {
    const cardToMove = sentenceCards.find(c => c.id === cardId);
    if (cardToMove) {
      setSentenceCards(prev => prev.filter(c => c.id !== cardId));
      setAvailableCards(prev => [...prev, cardToMove]);
    }
  };
  
  const handleReorderSentence = (draggedId: string, targetId: string | null) => {
    setSentenceCards(prev => {
        const draggedIndex = prev.findIndex(c => c.id === draggedId);
        if (draggedIndex === -1) return prev;

        const newCards = [...prev];
        const [draggedItem] = newCards.splice(draggedIndex, 1);

        if (targetId === null) {
            newCards.push(draggedItem);
        } else {
            const targetIndex = newCards.findIndex(c => c.id === targetId);
            if (targetIndex !== -1) {
                newCards.splice(targetIndex, 0, draggedItem);
            } else {
                 newCards.push(draggedItem); // Fallback
            }
        }
        return newCards;
    });
  };

  const handleSubmitSentence = async () => {
    if (sentenceCards.length === 0) {
      setError("Please build a sentence first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    
    const sentence = sentenceCards.map(c => c.text).join(' ').replace(/\s+([.,?!])/g, '$1');

    try {
      const result = await validateSentence(sentence, currentChallenge?.prompt || '');
      setValidationResult(result);

      // Only update score if the new score is better than the previous best for this challenge
      // and the sentence is considered grammatically correct.
      if (result.isCorrect && result.score > challengeBestScore) {
        const scoreDifference = result.score - challengeBestScore;
        setTotalScore(prev => prev + scoreDifference);
        setChallengeBestScore(result.score);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while validating the sentence. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextChallenge = () => {
    const isLastChallengeInLevel = challengeIndex === currentLevel.challenges.length - 1;
    if (isLastChallengeInLevel) {
      if (levelIndex < LEVELS.length - 1) {
        setLevelIndex(prev => prev + 1);
        setChallengeIndex(0);
      } else {
        // TODO: Handle end of game
        alert("Congratulations! You've completed all levels!");
      }
    } else {
      setChallengeIndex(prev => prev + 1);
    }
  };

  if (!currentChallenge) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-900"><LoadingSpinner /></div>;
  }
  
  const canAdvance = challengeBestScore >= 80;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <Header />
      <StatusBar levelName={currentLevel.name} score={totalScore} />
      <main className="w-full max-w-4xl mx-auto bg-slate-800/50 rounded-2xl shadow-2xl p-6 md:p-8 ring-1 ring-white/10 mt-6">
        <ChallengeDisplay challenge={currentChallenge} />

        <div className="mt-8 space-y-6">
          <SentenceTray 
            cards={sentenceCards} 
            onDropToSentence={handleDropToSentence}
            onReturnToPool={handleReturnToPool}
            onReorder={handleReorderSentence}
          />
          <CardPool cards={availableCards} onDropToPool={handleReturnToPool} />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleSubmitSentence}
            disabled={isLoading || sentenceCards.length === 0 || challengeBestScore === 100}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-500 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <CheckCircle size={20} />
            Check Sentence
          </button>
          <button
            onClick={() => loadChallenge(levelIndex, challengeIndex)}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-lg hover:bg-sky-500 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <RefreshCw size={20} />
            Reset
          </button>
        </div>

        <div className="mt-8 min-h-[100px]">
          {isLoading && <div className="flex justify-center"><LoadingSpinner /></div>}
          {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}
          {validationResult && <FeedbackDisplay result={validationResult} onNextChallenge={goToNextChallenge} canAdvance={canAdvance} />}
        </div>
      </main>
      <footer className="text-center text-slate-400 mt-8 text-sm">
        <p>&copy; 2024 The Syntax Card Game. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
