import { useState } from "react";

export function CreateTodo({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async function (res) {
        const json = await res.json();
        alert("Todo added");
        addTodo(json.todo); // Call the addTodo function passed from the parent
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
        alert("Failed to add todo: " + err.msg);
      });
  };

  return (
    <div>
      <input
        id="title"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <input
        id="desc"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <button
        style={{
          padding: 10,
          margin: 10,
        }}
        onClick={handleAddTodo}
      >
        Add a todo
      </button>
    </div>
  );
}
