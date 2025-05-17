import { useState, useEffect } from 'react';
import './Clock.css';

interface TimeFormat {
  hours: string;
  minutes: string;
  seconds: string;
  period: string;
}

export function Clock() {
  const [time, setTime] = useState<TimeFormat>({
    hours: '00',
    minutes: '00',
    seconds: '00',
    period: 'AM'
  });
  const [is24Hour, setIs24Hour] = useState(() => 
    localStorage.getItem('clockFormat') === '24h'
  );

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      let period = hours >= 12 ? 'PM' : 'AM';

      if (!is24Hour) {
        hours = hours % 12 || 12;
      }

      setTime({
        hours: hours.toString().padStart(2, '0'),
        minutes,
        seconds,
        period
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

  const toggleFormat = () => {
    setIs24Hour(prev => {
      const newFormat = !prev;
      localStorage.setItem('clockFormat', newFormat ? '24h' : '12h');
      return newFormat;
    });
  };

  return (
    <div className="clock-container">
      <div className="clock-face">
        <div className="time-display">
          <span className="hours">{time.hours}</span>
          <span className="separator">:</span>
          <span className="minutes">{time.minutes}</span>
          <span className="separator">:</span>
          <span className="seconds">{time.seconds}</span>
          {!is24Hour && <span className="period">{time.period}</span>}
        </div>
      </div>
      <button 
        className="btn btn-outline-primary mt-4"
        onClick={toggleFormat}
      >
        Format {is24Hour ? '24h' : '12h'}
      </button>
    </div>
  );
}

export default Clock;