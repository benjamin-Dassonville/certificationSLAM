import { useState, useEffect, useCallback } from 'react';
import './Snake.css';

interface Props {
  onScore: (score: number) => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
];

export function Snake({ onScore }: Props) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('UP');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(200);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    const head = snake[0];
    let newHead: Position;

    switch (direction) {
      case 'UP':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'DOWN':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'LEFT':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'RIGHT':
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    // Vérification des collisions
    if (
      newHead.x < 0 || newHead.x >= GRID_SIZE ||
      newHead.y < 0 || newHead.y >= GRID_SIZE ||
      snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setIsGameOver(true);
      onScore(score);
      return;
    }

    const newSnake = [newHead, ...snake];

    // Si on mange la nourriture
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood());
      setScore(s => s + 10);
      setGameSpeed(s => Math.max(s - 10, 50));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, isGameOver, generateFood, score, onScore]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, gameSpeed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, gameSpeed]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection('UP');
    setIsGameOver(false);
    setScore(0);
    setGameSpeed(200);
  };

  return (
    <div className="snake-game">
      <div className="game-info">
        <span>Score: {score}</span>
        <button className="btn btn-primary" onClick={resetGame}>
          {isGameOver ? 'Nouvelle partie' : 'Recommencer'}
        </button>
      </div>

      <div className="game-grid">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = Math.floor(index / GRID_SIZE);
          const y = index % GRID_SIZE;
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={index}
              className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
            />
          );
        })}
      </div>

      {isGameOver && (
        <div className="game-over">
          Game Over ! Score final : {score}
        </div>
      )}
    </div>
  );
}

export default Snake;