import {useEffect, useState } from 'react';

import './App.css';
import Navbar from './components/Account';
import Shop from './components/Shop';

function App() {
  const [count, setCount] = useState(0);
  const [action, setAction] = useState(false);

  useEffect(() => {
    let interval;
    if(action){
      interval = setInterval(() => {
        setCount((pre)=>pre+1)
      }, 1000);
    }
    else{
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[action]);

  return (
    <>
      <h1>stop watch</h1>
      <p>Count: {count}</p>
      <button onClick={() =>setAction(true)}>start</button>
      <button onClick={() =>setAction(false)}>stop</button>
      <button onClick={() =>setCount(0)}>reset</button>
    </>
  );
}

export default App;
