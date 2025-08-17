
import React, { useState } from 'react';
import type { CardData } from '../types';
import Card from './Card';

interface CardPoolProps {
  cards: CardData[];
  onDropToPool: (cardId: string) => void;
}

const CardPool: React.FC<CardPoolProps> = ({ cards, onDropToPool }) => {
    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        try {
            const { cardId, source } = JSON.parse(e.dataTransfer.getData("application/json"));
            if (source === 'sentence') {
                onDropToPool(cardId);
            }
        } catch (error) {
            console.error("Failed to parse drag data", error);
        }
    };

    const handleDragLeave = () => {
        setDragOver(false);
    }

  return (
    <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-300">Available Cards</h3>
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            className={`min-h-[80px] bg-slate-700/50 p-4 rounded-lg border flex flex-wrap items-center gap-3 transition-colors duration-300 ${dragOver ? 'border-sky-400' : 'border-slate-600'}`}
        >
        {cards.map(card => (
            <Card key={card.id} card={card} source="pool" />
        ))}
        </div>
    </div>
  );
};

export default CardPool;
