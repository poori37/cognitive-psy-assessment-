
import React from 'react';
import type { CardData } from '../types';
import { CardType } from '../types';

interface CardProps {
  card: CardData;
  source: 'pool' | 'sentence';
  onDoubleClick?: () => void;
}

const getCardColors = (type: CardType): string => {
  switch (type) {
    case CardType.NOUN: return 'bg-sky-600 border-sky-400';
    case CardType.PRONOUN: return 'bg-sky-700 border-sky-500';
    case CardType.VERB: return 'bg-emerald-600 border-emerald-400';
    case CardType.ADJECTIVE: return 'bg-amber-600 border-amber-400';
    case CardType.ADVERB: return 'bg-purple-600 border-purple-400';
    case CardType.PREPOSITION: return 'bg-rose-600 border-rose-400';
    case CardType.CONJUNCTION: return 'bg-pink-600 border-pink-400';
    case CardType.DETERMINER: return 'bg-teal-600 border-teal-400';
    case CardType.PUNCTUATION: return 'bg-slate-500 border-slate-300';
    default: return 'bg-slate-600 border-slate-400';
  }
};

const Card: React.FC<CardProps> = ({ card, source, onDoubleClick }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const dragData = { cardId: card.id, source };
        e.dataTransfer.setData("application/json", JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'move';
    };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDoubleClick={onDoubleClick}
      title={source === 'sentence' ? 'Double-click to return' : ''}
      className={`px-4 py-2 rounded-lg shadow-md cursor-grab active:cursor-grabbing transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${getCardColors(card.type)} border-b-4`}
    >
      <span className="text-lg font-semibold text-white select-none">{card.text}</span>
    </div>
  );
};

export default Card;
