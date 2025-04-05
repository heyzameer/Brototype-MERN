import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import './index.css';  // Import the CSS file

const AppLayout = () => {
  let [count, setCount] = useState(0);
  // let
  let interval;

  useEffect(()=>{
    return () => clearInterval(interval);
  },[])

  function start(){
    interval = setInterval((setCount(count+1)),1000)
  }

function stop(){
  clearInterval(interval);

 }

  return (
    <>
    <p>{count}</p>
    <button onClick={start}>Start</button>
    <button onClick={stop}>Stop</button>
    </>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppLayout />);
