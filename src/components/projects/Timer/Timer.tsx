import { useState, useEffect } from 'react';
import './Timer.css';

type TimerMode = 'stopwatch' | 'countdown';
type TimerStatus = 'idle' | 'running' | 'paused';

interface Time {
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export function Timer() {
  const [mode, setMode] = useState<TimerMode>('stopwatch');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [time, setTime] = useState<Time>({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [countdownStart, setCountdownStart] = useState<Time>({ minutes: 1, seconds: 0, milliseconds: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'running') {
      interval = setInterval(() => {
        if (mode === 'stopwatch') {
          setTime(prev => {
            const newMs = prev.milliseconds + 10;
            const newSec = prev.seconds + Math.floor(newMs / 1000);
            const newMin = prev.minutes + Math.floor(newSec / 60);

            return {
              minutes: newMin,
              seconds: newSec % 60,
              milliseconds: newMs % 1000
            };
          });
        } else {
          setTime(prev => {
            if (prev.minutes === 0 && prev.seconds === 0 && prev.milliseconds === 0) {
              setStatus('idle');
              playAlarm();
              return prev;
            }

            let newMs = prev.milliseconds - 10;
            let newSec = prev.seconds;
            let newMin = prev.minutes;

            if (newMs < 0) {
              newMs = 990;
              newSec--;
            }
            if (newSec < 0) {
              newSec = 59;
              newMin--;
            }

            return {
              minutes: newMin,
              seconds: newSec,
              milliseconds: newMs
            };
          });
        }
      }, 10);
    }

    return () => clearInterval(interval);
  }, [status, mode]);

  const toggleTimer = () => {
    if (status === 'idle') {
      if (mode === 'countdown') {
        setTime(countdownStart);
      }
      setStatus('running');
    } else if (status === 'running') {
      setStatus('paused');
    } else {
      setStatus('running');
    }
  };

  const resetTimer = () => {
    setStatus('idle');
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
  };

  const playAlarm = () => {
    const audio = new Audio('/alarm.mp3');
    audio.play();
  };

  const formatTime = (time: Time) => {
    return `${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}.${String(Math.floor(time.milliseconds / 10)).padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-controls mb-4">
        <button 
          className={`btn ${mode === 'stopwatch' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setMode('stopwatch')}
        >
          Chronomètre
        </button>
        <button 
          className={`btn ${mode === 'countdown' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setMode('countdown')}
        >
          Minuteur
        </button>
      </div>

      {mode === 'countdown' && status === 'idle' && (
        <div className="countdown-setup mb-4">
          <input 
            type="number"
            className="form-control"
            value={countdownStart.minutes}
            onChange={e => setCountdownStart(prev => ({
              ...prev,
              minutes: Math.max(0, parseInt(e.target.value) || 0)
            }))}
            min="0"
          />
          <span>minutes</span>
        </div>
      )}

      <div className="timer-display">
        {formatTime(time)}
      </div>

      <div className="timer-actions">
        <button 
          className={`btn ${status === 'running' ? 'btn-warning' : 'btn-success'}`}
          onClick={toggleTimer}
        >
          {status === 'running' ? 'Pause' : 'Start'}
        </button>
        <button 
          className="btn btn-danger"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;