const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db"); // Use Todo instead of todo
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// POST route to create a new todo
app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }

    // Create a new todo item in MongoDB
    try {
        const newTodo = await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        });

        res.json({
            msg: "Todo created",
            todo: newTodo,
        });
    } catch (err) {
        console.error("Error creating todo:", err);
        res.status(500).json({
            msg: "Error creating todo",
        });
    }
});

// GET route to fetch all todos
app.get("/todos", async function(req, res) {
    try {
        const todos = await Todo.find({});
        res.json({
            todos: todos,
        });
    } catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).json({
            msg: "Error fetching todos",
        });
    }
});

// PUT route to mark a todo as completed
app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.body.id,
            { completed: true },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({
                msg: "Todo not found",
            });
        }

        res.json({
            msg: "Todo marked as completed",
            todo: updatedTodo,
        });
    } catch (err) {
        console.error("Error updating todo:", err);
        res.status(500).json({
            msg: "Error marking todo as completed",
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
