import React, { useState, useEffect } from 'react';

const SimpleStopwatch = () => {
  const [time, setTime] = useState(0); // time in seconds
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // cleanup
  }, [running]);

  const formatTime = () => {
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{formatTime()}</h1>
      <button onClick={() => setRunning(true)} disabled={running}>Start</button>
      <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
      <button onClick={() => { setTime(0); setRunning(false); }}>Reset</button>
    </div>
  );
};

export default SimpleStopwatch;
