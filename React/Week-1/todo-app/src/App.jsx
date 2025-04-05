import { useState } from "react";
import "./App.css";

const TodoApp = () => {
  // Main component for TodoApp that manages tasks and their interactions (add, edit, delete, complete)
  const [tasks, setTasks] = useState([]);  
  const [newTask, setNewTask] = useState("");  
  const [editIndex, setEditIndex] = useState(null); 
  const [editTask, setEditTask] = useState(""); 

  // Adds a new task to the list
  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false }]);  
      setNewTask("");  
    }
  };

  // Deletes a task based on the index
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);  
    setTasks(updatedTasks);
  };

  // Sets up the task for editing by saving its index and content
  const handleEditTask = (index) => {
    setEditIndex(index);  
    setEditTask(tasks[index].text);  
  };

  // Saves the edited task and updates the task list
  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex ? { ...task, text: editTask } : task  
    );
    setTasks(updatedTasks);  
    setEditIndex(null);  
    setEditTask(""); 
  };

  // Marks a task as completed or incomplete
  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task  
    );
    setTasks(updatedTasks);  
  };

  return (
    <div className="todo-app">
      {/* Main UI rendering for adding/editing tasks and displaying the task list */}
      <h1>Todo App</h1>
      <div className="input-section">
        {/* Conditional rendering between adding and editing a task */}
        {editIndex === null ? (
          <input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}  
          />
        ) : (
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}  
          />
        )}
        <button onClick={editIndex === null ? handleAddTask : handleSaveEdit}>
          {/* Button text switches between Add and Save Edit */}
          {editIndex === null ? "Add Task" : "Save Edit"}
        </button>
      </div>
      <ul className="task-list">
        {/* Rendering each task dynamically */}
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? "completed" : ""}`}>
            <span>{task.text}</span>
            <div className="buttons">
              <button onClick={() => handleEditTask(index)}>Edit</button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
              <button onClick={() => handleCompleteTask(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;