import { useState, useEffect } from 'react';
import './Counter.css';

export function Counter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('counter');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('counter', count.toString());
  }, [count]);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h2 className="counter-display">{count}</h2>
      <div className="counter-buttons">
        <button 
          className="btn btn-danger"
          onClick={decrement}
        >
          -
        </button>
        <button 
          className="btn btn-warning"
          onClick={reset}
        >
          Reset
        </button>
        <button 
          className="btn btn-success"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;