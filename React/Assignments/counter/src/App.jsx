import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function increment() {
    const newCount = count + 1
    setCount(newCount)
    if (newCount % 2 !== 0) {
      alert('Odd number!')
    }
  }

  function decrement() {
    const newCount = count - 1
    setCount(newCount)
    if (newCount % 2 !== 0) {
      alert('Odd number!')
    }
  }

  return (
    <>
    <p>Count {count}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    </>
  )
}

export default App
