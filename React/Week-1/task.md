```js
import { useEffect, useState } from 'react';

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