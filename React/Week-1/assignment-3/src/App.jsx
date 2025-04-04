import React, { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard"; // Assuming you created this in the previous task
import "./App.css";
function App() {
  const [count, setCount] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (e) {
      setError(e.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser(count);
  }, [count]);
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrementCount = () => {
    setCount((prevCount) => Math.max(1, prevCount - 1));
  };
  return (
    <div className="App">
      <h1>Counter App with User Info</h1>
      <p>Count: {count}</p>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={incrementCount}>Increment</button>
      <hr />

      {loading && <p>Loading user data...</p>}
      {error && <p>Error fetching user: {error}</p>}
      {user && (
        <div>
          <h2>User Information for ID: {user.id}</h2>
          <ProfileCard name={user.name} email={user.email} />
          <p>Username: {user.username}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          {/* You can display other user properties as needed */}
        </div>
      )}
    </div>
  );
}
export default App;
