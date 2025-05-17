import { useState, useEffect } from 'react';
import { quotes } from './quotes';
import './QuoteGenerator.css';

export function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });
  const [isExiting, setIsExiting] = useState(false);

  const generateNewQuote = () => {
    setIsExiting(true);
    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (quotes[newIndex].text === currentQuote.text);
      
      setCurrentQuote(quotes[newIndex]);
      setIsExiting(false);
    }, 600); // Durée de l'animation de sortie
  };

  return (
    <div className="quote-container">
      <div className="quote-content">
        <blockquote className={`blockquote ${isExiting ? 'exit' : ''}`}>
          <p className="mb-0">{currentQuote.text}</p>
          <footer className="blockquote-footer mt-2">{currentQuote.author}</footer>
        </blockquote>
        <button 
          className="btn btn-primary mt-3" 
          onClick={generateNewQuote}
          disabled={isExiting}
        >
          Nouvelle citation
        </button>
      </div>
    </div>
  );
}

export default QuoteGenerator;