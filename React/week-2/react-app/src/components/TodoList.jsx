import React, { useState } from 'react'
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [deletedTask, setDeleteTask] = useState([]);

  function addTask() {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("")
    }
  }

  function deleteTask(index) {
    setDeleteTask([...deletedTask, todos[index]])
    setTodos(todos.filter((todo, curIndex) => index !== curIndex));
  }

  function upTask(index) {
    if (index > 0) {
      const upTodo = [...todos];
      [upTodo[index], upTodo[index - 1]] = [upTodo[index - 1], upTodo[index]]
      setTodos(upTodo);
    }
  }
  function downTask(index) {
    if (index < todos.length - 1) {
      const upTodo = [...todos];
      [upTodo[index], upTodo[index + 1]] = [upTodo[index + 1], upTodo[index]]
      setTodos(upTodo);
    }
  }

  function restoreTask(index) {
    const restored = deletedTask[index];
    setTodos([...todos, restored]);
    setDeleteTask(deletedTask.filter((_, i) => i !== index));
  }


  return (
    <div className="container">
      <h1>TODO LIST</h1>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTask}>ADD</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => upTask(index)}>Move upTask</button>
            <button onClick={() => downTask(index)}>Move Down</button>
          </li>
        ))}

      </ul>

      {deletedTask.length > 0 && (
        <>
          <h2>Deleted Tasks</h2>
          <ul>
            {deletedTask.map((todo, index) => (
              <li key={index}>
                {todo}
                <button style={{ marginLeft: '10px' }} onClick={() => restoreTask(index)}>Restore</button>
              </li>
            ))}
          </ul>
        </>
      )}


    </div>
  )
}

export default TodoList
