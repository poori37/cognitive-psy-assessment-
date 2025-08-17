
import React, { useState, useRef } from 'react';
import type { CardData } from '../types';
import Card from './Card';

interface SentenceTrayProps {
  cards: CardData[];
  onDropToSentence: (cardId: string, position: number) => void;
  onReturnToPool: (cardId: string) => void;
  onReorder: (draggedId: string, targetId: string | null) => void;
}

const SentenceTray: React.FC<SentenceTrayProps> = ({ cards, onDropToSentence, onReturnToPool, onReorder }) => {
  const [dragOver, setDragOver] = useState(false);
  const trayRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    try {
        const { cardId, source } = JSON.parse(e.dataTransfer.getData("application/json"));
        
        if (source === 'pool') {
            const dropPosition = getDropPosition(e.clientX);
            onDropToSentence(cardId, dropPosition);
        } else if (source === 'sentence') {
            const targetElement = (e.target as HTMLElement).closest('[data-card-id]');
            const targetId = targetElement ? targetElement.getAttribute('data-card-id') : null;
            if (cardId !== targetId) {
                onReorder(cardId, targetId);
            }
        }
    } catch (error) {
        console.error("Failed to parse drag data", error);
    }
  };

  const getDropPosition = (clientX: number): number => {
    if (!trayRef.current) return cards.length;
    const children = Array.from(trayRef.current.children)
        .filter(child => child.hasAttribute('data-card-id'));
    
    let dropIndex = children.length;

    for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        const rect = child.getBoundingClientRect();
        const midPoint = rect.left + rect.width / 2;
        if (clientX < midPoint) {
            dropIndex = i;
            break;
        }
    }
    return dropIndex;
  }

  return (
    <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-300">Your Sentence</h3>
        <div
            ref={trayRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`min-h-[80px] bg-slate-900/70 p-4 rounded-lg border-2 border-dashed flex flex-wrap items-center gap-3 transition-all duration-300 ${dragOver ? 'border-sky-400 bg-sky-900/50' : 'border-slate-600'}`}
        >
        {cards.length === 0 ? (
            <p className="text-slate-500 w-full text-center">Drag cards here to build a sentence</p>
        ) : (
            cards.map((card, index) => (
                <div key={card.id} data-card-id={card.id}>
                    <Card 
                        card={card} 
                        source="sentence" 
                        onDoubleClick={() => onReturnToPool(card.id)} 
                    />
                </div>
            ))
        )}
        </div>
    </div>
  );
};

export default SentenceTray;
