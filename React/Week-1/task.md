```js
import { useEffect, useState } from 'react';


// controlling the frequency
function ThrottledResize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let throttleTimeout = null;

    const handleResize = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setWidth(window.innerWidth);
          throttleTimeout = null;
        }, 1000); // Throttle to run at most once every 1000ms
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <h2>Window Width: {width}px</h2>;
}
``` 









```js
import { useState, useEffect } from 'react';
// waiting fro in activity
function DebouncedInput() {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler); // Cleanup on each re-render
  }, [text]);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type to search..." />
      <p>Debounced Value: {debouncedText}</p>
    </div>
  );
}
```














```js
const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const handleIncrement = () => {
    setHistory((prev) => [...prev, count]);
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setHistory((prev) => [...prev, count]);
    setCount(count - 1);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastValue = history[history.length - 1];
    setCount(lastValue);
    setHistory((prev) => prev.slice(0, -1));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Step Counter with Undo</h2>
      <h1>{count}</h1>

      <button onClick={handleIncrement}>➕ Increment</button>
      <button onClick={handleDecrement}>➖ Decrement</button>
      <button onClick={handleUndo} disabled={history.length === 0}>
        🔄 Undo
      </button>
    </div>
 );
  ```








```js
  import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useState,useRef } from 'react';
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










    const [timeLeft, setTimeLeft] = useState(60); // start from 60 seconds
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      let timer;
  
      if (isRunning && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      }
  
      return () => clearInterval(timer); // cleanup
    }, [isRunning, timeLeft]);
  
    const handleStart = () => {
      if (timeLeft > 0) {
        setIsRunning(true);
      }
    };
  
    const handlePause = () => setIsRunning(false);
  
    const handleReset = () => {
      setIsRunning(false);
      setTimeLeft(60);
    };
  
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>⏳ Countdown Timer</h2>
        <h1>{timeLeft}s</h1>
  
        <button onClick={handleStart} disabled={isRunning || timeLeft === 0}>
          ▶️ Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          ⏸️ Pause
        </button>
        <button onClick={handleReset}>
          🔄 Reset
        </button>
      </div>
    );






      const inputRef = useRef();
    console.log("rerender")
      const focusInput = () => {
        inputRef.current.focus(); // Focus the input element
      };
    
      return (
        <div>
          <input ref={inputRef} type="text" />
          <button onClick={focusInput}>Focus Input</button>
        </div>
      );



    function App() {
      const handleRightClick = (event) => {
        event.preventDefault(); // Prevent the context menu
        alert("Right-click is disabled!");
      };
    
      return <div onContextMenu={handleRightClick}>Right-click disabled here</div>;
    }

const LazyComponent = React.lazy(() => import('./LazyComponent'));

import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./MyComponent')); // Lazy load

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// MyComponent.jsx
import React from 'react';

function MyComponent() {
  return <div>I am loaded lazily!</div>;
}

export default MyComponent;

};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);