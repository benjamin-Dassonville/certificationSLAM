import { useState, useEffect } from 'react';
import './Memory.css';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Props {
  onScore: (score: number) => void;
}

const CARDS = [
  '🐱', '🐶', '🐼', '🦊', '🐨', '🐯', '🦁', '🐸',
].flatMap(emoji => [
  { id: Math.random(), value: emoji, isFlipped: false, isMatched: false },
  { id: Math.random(), value: emoji, isFlipped: false, isMatched: false }
]);

export function Memory({ onScore }: Props) {
  const [cards, setCards] = useState<Card[]>(() => 
    [...CARDS].sort(() => Math.random() - 0.5)
  );
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsLocked(true);
      const [first, second] = flippedCards;
      
      if (cards[first].value === cards[second].value) {
        setCards(cards.map((card, index) => 
          index === first || index === second
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
      
      setMoves(m => m + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      const score = Math.max(100 - moves * 5, 10);
      onScore(score);
    }
  }, [cards, moves, onScore]);

  const handleCardClick = (index: number) => {
    if (
      isLocked ||
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      cards[index].isMatched
    ) return;

    setFlippedCards([...flippedCards, index]);
  };

  const resetGame = () => {
    setCards([...CARDS].sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setIsLocked(false);
  };

  return (
    <div className="memory-game">
      <div className="memory-header">
        <h3>Memory Game</h3>
        <div className="memory-stats">
          <span>Coups : {moves}</span>
          <button className="btn btn-primary btn-sm" onClick={resetGame}>
            Nouvelle partie
          </button>
        </div>
      </div>

      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`memory-card ${
              card.isFlipped || card.isMatched || flippedCards.includes(index)
                ? 'flipped'
                : ''
            } ${card.isMatched ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Memory;