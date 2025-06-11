import axios from 'axios';
import { Game } from './types';

const API_URL = process.env.REACT_APP_API_URL;

export const startGame = async (
  setGame: (game: Game | null) => void,
  setError: (error: string | null) => void,
  setSelectedCard1: (id: string | null) => void,
  setIsLocked: (locked: boolean) => void,
  setIsLoading?: (loading: boolean) => void 
) => {
  setError(null);
  setIsLoading?.(true);
  try {
    const response = await axios.post(`${API_URL}/api/game/start`);
    const gameId = response.data.gameId;
    const gameResponse = await axios.get(`${API_URL}/api/game/${gameId}`);
    
    setGame(gameResponse.data);
    setSelectedCard1(null);
    setIsLocked(false);
  } catch (error) {
    console.error('Error starting game:', error);
    setError('Failed to start game. Check backend and CORS settings.');
  } finally {
    setIsLoading?.(false); 
  }
};


export const flipCard = async (cardId: string, game: Game | null, setGame: (game: (prev: Game | null) => Game | null) => void, selectedCard1: string | null, setSelectedCard1: (id: string | null) => void, isLocked: boolean, setIsLocked: (locked: boolean) => void) => {
  if (!game || game.isGameOver || isLocked) return;

  const card = game.cards.find(c => c.id === cardId);
  if (!card || card.isFlipped || card.isMatched) return;

  const updatedCards = game.cards.map(c =>
    c.id === cardId ? { ...c, isFlipped: true } : c
  );
  setGame((prev: Game | null) => prev ? { ...prev, cards: updatedCards } : null); 

  if (!selectedCard1) {
    setSelectedCard1(cardId);
  } else {
    const card1 = game.cards.find(c => c.id === selectedCard1);
    if (card1) {
      setIsLocked(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (card1.color === card.color) {
        const newCards = game.cards.map(c =>
          c.id === cardId || c.id === selectedCard1 ? { ...c, isMatched: true } : c
        );
        setGame((prev: Game | null) => prev ? { ...prev, cards: newCards, score: prev.score + 1 } : null); // Typat prev
      } else {
        const newCards = game.cards.map(c =>
          c.id === cardId || c.id === selectedCard1 ? { ...c, isFlipped: false } : c
        );
        setGame((prev: Game | null) => prev ? { ...prev, cards: newCards, attempts: prev.attempts + 1 } : null); // Typat prev
      }
      setSelectedCard1(null);
      setIsLocked(false);
    }
  }

  axios.post(`${API_URL}/api/game/${game.id}/flip`, { cardId })
    .catch(e => console.warn('Backend flip failed, using local state:', e));
};

export const resetGame = (setGame: (game: Game | null) => void, setError: (error: string | null) => void, setSelectedCard1: (id: string | null) => void, setIsLocked: (locked: boolean) => void, startGame: () => Promise<void>) => {
  setGame(null);
  setError(null);
  setSelectedCard1(null);
  setIsLocked(false);
  startGame();
};

export const saveResult = (attempts: number, score: number) => {
  const results = JSON.parse(localStorage.getItem('gameResults') || '[]');
  results.push({ attempts, score });
  localStorage.setItem('gameResults', JSON.stringify(results.slice(-3)));
};