import { useState, useEffect } from 'react';
import './TicTacToe.css';

interface Props {
  onScore: (score: number) => void;
}

type Player = 'X' | 'O';
type Board = (Player | null)[];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
  [0, 4, 8], [2, 4, 6]             // diagonales
];

export function TicTacToe({ onScore }: Props) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'DRAW' | null>(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const checkWinner = (squares: Board): Player | 'DRAW' | null => {
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }
    return squares.every(square => square) ? 'DRAW' : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner !== 'DRAW') {
        setScores(prev => ({
          ...prev,
          [gameWinner]: prev[gameWinner] + 1
        }));
        onScore(scores[gameWinner] + 1);
      }
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="tictactoe">
      <div className="game-info">
        <div className="scores">
          <span>X: {scores.X}</span>
          <span>O: {scores.O}</span>
        </div>
        {winner ? (
          <div className="winner">
            {winner === 'DRAW' ? 'Match nul !' : `Joueur ${winner} gagne !`}
          </div>
        ) : (
          <div className="current-player">
            Tour du joueur {currentPlayer}
          </div>
        )}
        <button className="btn btn-primary" onClick={resetGame}>
          Nouvelle partie
        </button>
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? 'marked' : ''}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicTacToe;