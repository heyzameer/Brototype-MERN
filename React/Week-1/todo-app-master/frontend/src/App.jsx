import { useState, useEffect } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos on component mount
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
      });
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  // Function to add a todo to the list after creation
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <CreateTodo addTodo={addTodo} /> {/* Pass addTodo function to CreateTodo */}
      <Todos todos={todos} />
    </div>
  );
}

export default App;
