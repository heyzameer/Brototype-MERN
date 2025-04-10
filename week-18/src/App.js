import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useState,useRef } from 'react';
import './index.css';  // Import the CSS file

const AppLayout = () => {
  // const [count, setCount] = useState(0);
  // const [isRunning, setIsRunning] = useState(false);

  // useEffect(() => {
  //   let interval;

  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setCount(prev => prev + 1);
  //     }, 1000);
  //   }

  //   return () => {console.log("cleared"); clearInterval(interval);} // Cleanup
  // }, [isRunning]);

  // function start() {
  //   setIsRunning(true);
    
  // }

  // function stop() {
  //   setIsRunning(false);
  // }

  // function reset() {
  //   setIsRunning(false);
  //   setCount(prev => prev = 0);
  // }


  // return (
  //   <>
  //   <div className="container">
  //   <p>{count}</p>
  //   <button onClick={start}>Start</button>
  //   <button onClick={stop}>Stop</button>
  //   <button onClick={reset}>reset</button>
  //   </div>
  //   </>
  // )



  // const [count, setCount] = useState(0);
  // const [history, setHistory] = useState([]);

  // const handleIncrement = () => {
  //   setHistory((prev) => [...prev, count]);
  //   setCount(count + 1);
  // };

  // const handleDecrement = () => {
  //   setHistory((prev) => [...prev, count]);
  //   setCount(count - 1);
  // };

  // const handleUndo = () => {
  //   if (history.length === 0) return;
  //   const lastValue = history[history.length - 1];
  //   setCount(lastValue);
  //   setHistory((prev) => prev.slice(0, -1));
  // };

  // return (
  //   <div style={{ textAlign: 'center', marginTop: '2rem' }}>
  //     <h2>Step Counter with Undo</h2>
  //     <h1>{count}</h1>

  //     <button onClick={handleIncrement}>➕ Increment</button>
  //     <button onClick={handleDecrement}>➖ Decrement</button>
  //     <button onClick={handleUndo} disabled={history.length === 0}>
  //       🔄 Undo
  //     </button>
  //   </div>
  // );










    // const [timeLeft, setTimeLeft] = useState(60); // start from 60 seconds
    // const [isRunning, setIsRunning] = useState(false);
  
    // useEffect(() => {
    //   let timer;
  
    //   if (isRunning && timeLeft > 0) {
    //     timer = setInterval(() => {
    //       setTimeLeft((prev) => prev - 1);
    //     }, 1000);
    //   }
  
    //   return () => clearInterval(timer); // cleanup
    // }, [isRunning, timeLeft]);
  
    // const handleStart = () => {
    //   if (timeLeft > 0) {
    //     setIsRunning(true);
    //   }
    // };
  
    // const handlePause = () => setIsRunning(false);
  
    // const handleReset = () => {
    //   setIsRunning(false);
    //   setTimeLeft(60);
    // };
  
    // return (
    //   <div style={{ textAlign: 'center', marginTop: '2rem' }}>
    //     <h2>⏳ Countdown Timer</h2>
    //     <h1>{timeLeft}s</h1>
  
    //     <button onClick={handleStart} disabled={isRunning || timeLeft === 0}>
    //       ▶️ Start
    //     </button>
    //     <button onClick={handlePause} disabled={!isRunning}>
    //       ⏸️ Pause
    //     </button>
    //     <button onClick={handleReset}>
    //       🔄 Reset
    //     </button>
    //   </div>
    // );


    //   const inputRef = useRef();
    // console.log("rerender")
    //   const focusInput = () => {
    //     inputRef.current.focus(); // Focus the input element
    //   };
    
    //   return (
    //     <div>
    //       <input ref={inputRef} type="text" />
    //       <button onClick={focusInput}>Focus Input</button>
    //     </div>
    //   );


    // function App() {
    //   return (
    //     <Suspense fallback={<div>Loading...</div>}>
    //       <LazyComponent />
    //     </Suspense>
    //   );
    // }


    // function App() {
    //   const handleRightClick = (event) => {
    //     event.preventDefault(); // Prevent the context menu
    //     alert("Right-click is disabled!");
    //   };
    
    //   return <div onContextMenu={handleRightClick}>Right-click disabled here</div>;
    // }

    // const LazyComponent = React.lazy(() => import('./LazyComponent'));

// function App() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <LazyComponent />
//     </Suspense>
//   );
// }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);