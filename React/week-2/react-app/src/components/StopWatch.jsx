import React, { useEffect, useRef, useState } from 'react';

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapTime, setElap] = useState(0);

  const intervalRef = useRef(null);   // to store the interval ID
  const startTimeRef = useRef(null);  // to store the time when stopwatch was started

  // Handle start and stop logic
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapTime;

      intervalRef.current = setInterval(() => {
        setElap(Date.now() - startTimeRef.current);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  function start() {
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setElap(0);
  }

  function formatTime() {
    const totalSeconds = Math.floor(elapTime / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(elapTime % 1000).padStart(3, '0');

    return `${minutes}:${seconds}.${milliseconds}`;
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'monospace', marginTop: '30px' }}>
      <h1>Stopwatch</h1>
      <h2>{formatTime()}</h2>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default StopWatch;
