import { useState } from 'react';
import './Calculator.css';

type Operation = '+' | '-' | '*' | '/' | '=';

interface CalculationHistory {
  calculation: string;
  result: string;
}

export function Calculator() {
  const [display, setDisplay] = useState<string>('0');
  const [firstNumber, setFirstNumber] = useState<string>('');
  const [operation, setOperation] = useState<Operation | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState<boolean>(false);

  const handleNumber = (num: string) => {
    if (waitingForSecondNumber) {
      setDisplay(num);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: Operation) => {
    if (op === '=') {
      if (operation && firstNumber) {
        const result = calculate(firstNumber, display, operation);
        const calculation = `${firstNumber} ${operation} ${display} = ${result}`;
        setHistory([...history, { calculation, result }]);
        setDisplay(result);
        setFirstNumber('');
        setOperation(null);
      }
    } else {
      setFirstNumber(display);
      setOperation(op);
      setWaitingForSecondNumber(true);
    }
  };

  const calculate = (a: string, b: string, op: Operation): string => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    switch (op) {
      case '+': return (num1 + num2).toString();
      case '-': return (num1 - num2).toString();
      case '*': return (num1 * num2).toString();
      case '/': return num2 !== 0 ? (num1 / num2).toString() : 'Error';
      default: return '0';
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber('');
    setOperation(null);
    setWaitingForSecondNumber(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-display">
          {display}
        </div>
        
        <div className="calculator-history">
          <h6>Historique</h6>
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                {item.calculation}
              </div>
            ))}
          </div>
          {history.length > 0 && (
            <button 
              className="btn btn-sm btn-secondary mt-2"
              onClick={clearHistory}
            >
              Effacer l'historique
            </button>
          )}
        </div>

        <div className="calculator-buttons">
          <button onClick={clear}>C</button>
          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button onClick={() => handleOperation('/')}>/</button>
          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button onClick={() => handleOperation('*')}>×</button>
          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>
          <button onClick={() => handleOperation('-')}>-</button>
          <button onClick={() => handleNumber('0')}>0</button>
          <button onClick={() => handleNumber('.')}>.</button>
          <button onClick={() => handleOperation('=')}>=</button>
          <button onClick={() => handleOperation('+')}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;