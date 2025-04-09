import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';  // Import the CSS file

const AppLayout = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }

    return () => {console.log("cleared"); clearInterval(interval);} // Cleanup
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setCount(prev => prev = 0);
  }


  return (
    <>
    <div className="container">
    <p>{count}</p>
    <button onClick={start}>Start</button>
    <button onClick={stop}>Stop</button>
    <button onClick={reset}>reset</button>
    </div>
    </>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);