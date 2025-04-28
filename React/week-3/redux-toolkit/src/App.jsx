import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment,reset } from './features/counter/counterSlice'

function App() {
  const count = useSelector((state)=> state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = ()=>{
    dispatch(increment());
  }

  const handleDecrement = ()=>{
      dispatch(decrement());
  }
  const handleReset = ()=>{
      dispatch(reset());
  }
  return (
    <>
      <div className='container'>
        <button onClick={handleIncrement}>+</button>
        <p>Count:{count}</p>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  )
}

export default App
//create store
// wrap app component under provider
//create slice
//register reducer