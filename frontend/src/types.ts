export interface Card {
    id: string;
    color: string;
    isFlipped: boolean;
    isMatched: boolean;
  }
  
  export interface Game {
    id: string;
    cards: Card[];
    score: number;
    attempts: number;
    isGameOver: boolean;
  }