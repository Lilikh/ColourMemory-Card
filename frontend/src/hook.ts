import { useState, useEffect } from 'react';
import { Game } from './types';

export const useGameState = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard1, setSelectedCard1] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (game && !game.isGameOver && game.cards.every(card => card.isMatched)) {
      setGame(prev => prev ? { ...prev, isGameOver: true } : null);
    }
  }, [game]);

  return { game, setGame, error, setError, selectedCard1, setSelectedCard1, isLocked, setIsLocked };
};