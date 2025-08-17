
export enum CardType {
  NOUN = 'noun',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  ADVERB = 'adverb',
  PRONOUN = 'pronoun',
  PREPOSITION = 'preposition',
  CONJUNCTION = 'conjunction',
  DETERMINER = 'determiner',
  PUNCTUATION = 'punctuation',
}

export interface CardData {
  id: string;
  text: string;
  type: CardType;
}

export interface Challenge {
  id: number;
  prompt: string;
}

export interface Level {
  id: number;
  name: string;
  challenges: Challenge[];
}

export interface ValidationResult {
  isCorrect: boolean;
  feedback: string;
  score: number;
}
