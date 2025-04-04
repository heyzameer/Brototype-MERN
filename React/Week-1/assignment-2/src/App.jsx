import React, { useState } from "react";
import "./App.css"; // Optional: You can create this for basic app styling
function App() {
  // State declaration using useState Hook
  const [count, setCount] = useState(0); // Initial count is 0
  // Function to increment the count
  const incrementCount = () => {
    setCount(count + 1);
  };
  // Function to decrement the count
  const decrementCount = () => {
    setCount(count - 1);
  };
  return (
    <div className="App">
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}
export default App;
