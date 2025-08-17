
import type { CardData, Level } from './types';
import { CardType } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    name: "Level 1: The Basics",
    challenges: [
      { id: 101, prompt: "Create a simple sentence about a cat." },
      { id: 102, prompt: "Form a sentence where 'the dog' is the subject." },
    ],
  },
  {
    id: 2,
    name: "Level 2: Adding Detail",
    challenges: [
      { id: 201, prompt: "Use an adjective to describe the fox." },
      { id: 202, prompt: "Create a sentence with a prepositional phrase (e.g., 'on the mat')." },
      { id: 203, prompt: "Write a question about a cookie." },
    ],
  },
  {
    id: 3,
    name: "Level 3: Complex Connections",
    challenges: [
      { id: 301, prompt: "Create a complex sentence using the conjunction 'and'." },
      { id: 302, prompt: "Form a sentence using 'but' to show contrast." },
    ]
  }
];

const CARD_DECKS: Record<number, CardData[]> = {
  // Level 1
  101: [
    { id: 'c1-1', text: 'The', type: CardType.DETERMINER },
    { id: 'c1-2', text: 'cat', type: CardType.NOUN },
    { id: 'c1-3', text: 'slept', type: CardType.VERB },
    { id: 'c1-4', text: 'soundly', type: CardType.ADVERB },
    { id: 'c1-5', text: '.', type: CardType.PUNCTUATION },
    { id: 'c1-6', text: 'A', type: CardType.DETERMINER },
    { id: 'c1-7', text: 'barks', type: CardType.VERB },
  ],
  102: [
    { id: 'c1-8', text: 'The', type: CardType.DETERMINER },
    { id: 'c1-9', text: 'dog', type: CardType.NOUN },
    { id: 'c1-10', text: 'chased', type: CardType.VERB },
    { id: 'c1-11', text: 'the', type: CardType.DETERMINER },
    { id: 'c1-12', text: 'ball', type: CardType.NOUN },
    { id: 'c1-13', text: '.', type: CardType.PUNCTUATION },
    { id: 'c1-14', text: 'meowed', type: CardType.VERB },
  ],
  // Level 2
  201: [
    { id: 'c4-1', text: 'The', type: CardType.DETERMINER },
    { id: 'c4-2', text: 'quick', type: CardType.ADJECTIVE },
    { id: 'c4-3', text: 'brown', type: CardType.ADJECTIVE },
    { id: 'c4-4', text: 'fox', type: CardType.NOUN },
    { id: 'c4-5', text: 'jumped', type: CardType.VERB },
    { id: 'c4-6', text: '.', type: CardType.PUNCTUATION },
    { id: 'c4-7', text: 'lazy', type: CardType.ADJECTIVE },
    { id: 'c4-8', text: 'dog', type: CardType.NOUN },
  ],
  202: [
    { id: 'c2-1', text: 'The', type: CardType.DETERMINER },
    { id: 'c2-2', text: 'book', type: CardType.NOUN },
    { id: 'c2-3', text: 'is', type: CardType.VERB },
    { id: 'c2-4', text: 'on', type: CardType.PREPOSITION },
    { id: 'c2-5', text: 'the', type: CardType.DETERMINER },
    { id: 'c2-6', text: 'table', type: CardType.NOUN },
    { id: 'c2-7', text: '.', type: CardType.PUNCTUATION },
    { id: 'c2-8', text: 'under', type: CardType.PREPOSITION },
  ],
  203: [
    { id: 'c5-1', text: 'Who', type: CardType.PRONOUN },
    { id: 'c5-2', text: 'ate', type: CardType.VERB },
    { id: 'c5-3', text: 'the', type: CardType.DETERMINER },
    { id: 'c5-4', text: 'last', type: CardType.ADJECTIVE },
    { id: 'c5-5', text: 'cookie', type: CardType.NOUN },
    { id: 'c5-6', text: '?', type: CardType.PUNCTUATION },
    { id: 'c5-7', text: 'Why', type: CardType.ADVERB },
  ],
  // Level 3
  301: [
    { id: 'c3-1', text: 'She', type: CardType.PRONOUN },
    { id: 'c3-2', text: 'sings', type: CardType.VERB },
    { id: 'c3-3', text: 'and', type: CardType.CONJUNCTION },
    { id: 'c3-4', text: 'he', type: CardType.PRONOUN },
    { id: 'c3-5', text: 'dances', type: CardType.VERB },
    { id: 'c3-6', text: '.', type: CardType.PUNCTUATION },
    { id: 'c3-7', text: 'or', type: CardType.CONJUNCTION },
  ],
  302: [
    { id: 'c3-8', text: 'He', type: CardType.PRONOUN },
    { id: 'c3-9', text: 'ran', type: CardType.VERB },
    { id: 'c3-10', text: 'fast', type: CardType.ADVERB },
    { id: 'c3-11', text: 'but', type: CardType.CONJUNCTION },
    { id: 'c3-12', text: 'missed', type: CardType.VERB },
    { id: 'c3-13', text: 'the', type: CardType.DETERMINER },
    { id: 'c3-14', text: 'bus', type: CardType.NOUN },
    { id: 'c3-15', text: '.', type: CardType.PUNCTUATION },
  ]
};

// Function to get a shuffled deck of cards for a given challenge ID
export const getCardsForChallenge = (challengeId: number): CardData[] => {
  const deck = CARD_DECKS[challengeId] || [];
  // Shuffle the array to make the card pool random each time
  return [...deck].sort(() => Math.random() - 0.5);
};
