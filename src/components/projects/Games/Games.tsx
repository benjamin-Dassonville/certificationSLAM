import { useState } from 'react';
import Memory from './Memory';
import TicTacToe from './TicTacToe';
import Snake from './Snake';
import './Games.css';

type GameType = 'memory' | 'tictactoe' | 'snake' | null;

export function Games() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('game-scores');
    return saved ? JSON.parse(saved) : {
      memory: [],
      tictactoe: [],
      snake: []
    };
  });

  const updateScore = (game: GameType, score: number) => {
    if (!game) return;
    
    const newScores = {
      ...highScores,
      [game]: [...highScores[game], score]
        .sort((a, b) => b - a)
        .slice(0, 5)
    };
    
    setHighScores(newScores);
    localStorage.setItem('game-scores', JSON.stringify(newScores));
  };

  return (
    <div className="games-container">
      {selectedGame === null ? (
        <div className="game-selection">
          <h2 className="text-center mb-4">Mini-Jeux</h2>
          <div className="row g-4">
            {[
              { id: 'memory', title: 'Memory', desc: 'Testez votre mémoire' },
              { id: 'tictactoe', title: 'Morpion', desc: 'Jeu classique à deux joueurs' },
              { id: 'snake', title: 'Snake', desc: 'Dirigez le serpent et mangez les pommes' }
            ].map(game => (
              <div key={game.id} className="col-md-4">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <h3>{game.title}</h3>
                    <p>{game.desc}</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setSelectedGame(game.id as GameType)}
                    >
                      Jouer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="high-scores mt-4">
            <h3 className="text-center mb-3">Meilleurs Scores</h3>
            <div className="row">
              {Object.entries(highScores).map(([game, scores]) => (
                <div key={game} className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">{game.charAt(0).toUpperCase() + game.slice(1)}</h4>
                      <ol className="list-unstyled">
                        {(scores as number[]).map((score, index) => (
                          <li key={index}>#{index + 1}: {score} points</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="game-area">
          <button 
            className="btn btn-outline-secondary mb-3"
            onClick={() => setSelectedGame(null)}
          >
            Retour aux jeux
          </button>
          
          {selectedGame === 'memory' && 
            <Memory onScore={(score) => updateScore('memory', score)} />}
          {selectedGame === 'tictactoe' && 
            <TicTacToe onScore={(score) => updateScore('tictactoe', score)} />}
          {selectedGame === 'snake' && 
            <Snake onScore={(score) => updateScore('snake', score)} />}
        </div>
      )}
    </div>
  );
}

export default Games;