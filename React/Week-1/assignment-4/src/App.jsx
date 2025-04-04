import React, { useState, useRef, useEffect } from 'react';
import "./App.css";
function App() {
  // Controlled Component State
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  // Uncontrolled Component Ref
  const inputRef = useRef(null);
  // Focus the input element on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  // Controlled Component Input Change Handler
  const handleInputChange = (event) => {
    setName(event.target.value);
    setError(""); // Clear any previous error on input change
  };
  // Form Submit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "") {
      setError("Name is required.");
      return;
    }

    console.log("Submitted Name (Controlled):", name);
  };
  // Uncontrolled Component Submit Handler (using onClick on the button)
  const handleUncontrolledSubmit = () => {
    if (inputRef.current && inputRef.current.value.trim() === "") {
      alert("Name is required (Uncontrolled).");
      return;
    }
    if (inputRef.current) {
      console.log("Submitted Name (Uncontrolled):", inputRef.current.value);
    }
  };
  return (
    <div className="App">
      <h1>Simple Form</h1>
      {/* Controlled Component Example */}
      <h2>Controlled Component</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-controlled">Enter your name:</label>
        <input
          type="text"
          id="name-controlled"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter name here"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit (Controlled)</button>
      </form>

      <hr />

      {/* Uncontrolled Component Example */}
      <h2>Uncontrolled Component</h2>
      <form>
        {" "}
        {/* No onSubmit here */}
        <label htmlFor="name-uncontrolled">Enter your name:</label>
        <input
          type="text"
          id="name-uncontrolled"
          ref={inputRef} // Attach the ref to the input element
          placeholder="Enter name here"
        />
        <button type="button" onClick={handleUncontrolledSubmit}>
          Submit (Uncontrolled)
        </button>
      </form>
    </div>
  );
}
export default App;
