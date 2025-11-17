import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [action, setAction] = useState(false);

  // Stopwatch logic
  useEffect(() => {
    let interval;
    if (action) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [action]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
    };

    // Add listener once when component mounts
    window.addEventListener('resize', handleResize);

    // Clean up listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // empty dependency -> runs once

  return (
    <>
      <h1>Stopwatch</h1>
      <p>Count: {count}</p>
      <button onClick={() => setAction(true)}>Start</button>
      <button onClick={() => setAction(false)}>Stop</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
}

export default App;
