import React from 'react';
import { useGameState } from '../hook';
import { startGame, flipCard, resetGame, saveResult } from '../gameLogic';
import '../index.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { game, setGame, error, setError, selectedCard1, setSelectedCard1, isLocked, setIsLocked } = useGameState();

  React.useEffect(() => {
    startGame(setGame, setError, setSelectedCard1, setIsLocked, setIsLoading);
  }, [setError, setGame, setIsLocked, setSelectedCard1]);

  const handleFlipCard = (cardId: string) => {
    flipCard(cardId, game, setGame, selectedCard1, setSelectedCard1, isLocked, setIsLocked);
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!game || isLoading) return <div className="spinner-overlay">
  <div className="spinner" />
</div>;

  if (game.isGameOver) {
    saveResult(game.attempts, game.score);
    const results = JSON.parse(localStorage.getItem('gameResults') || '[]');
    const isWin = game.score > game.attempts;
    return (
      <div className="game-over">
        <h2>{isWin ? 'You Win! 🎉  ' : 'Game Over 😣 '} <br /> after {game.attempts} tries!</h2>
        <p>Score: {game.score}</p>
        <p>Your Last Results:</p>
        <ul>
          {results.map((result: { attempts: number; score: number }, index: number) => (
            <li key={index}>{result.attempts} tries, Score: {result.score}</li>
          ))}
        </ul>
        <p style={{ color: isWin ? 'green' : 'orange' }}>
          {isWin ? 'Great memory!' : 'Try to improve your memory!'}
        </p>
        <button onClick={() => resetGame(setGame, setError, setSelectedCard1, setIsLocked, () => startGame(setGame, setError, setSelectedCard1, setIsLocked))}>BACK TO GAME</button>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <p>Score: {game.score} | Tries: {game.attempts}</p>
        <button onClick={() => resetGame(setGame, setError, setSelectedCard1, setIsLocked, () => startGame(setGame, setError, setSelectedCard1, setIsLocked, setIsLoading))}>RESET GAME</button>
      </div>
      <div className="grid">
        {game.cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            style={{ 
              backgroundColor: card.isFlipped || card.isMatched ? card.color : 'transparent'
            }}
            onClick={() => !card.isFlipped && !card.isMatched && handleFlipCard(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.color : '?'} {/* Visa hex-kod när vänd */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;