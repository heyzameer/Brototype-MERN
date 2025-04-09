const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = "mongodb+srv://user:zGrxrSAsruBZ3zxt@cluster0.iriaonw.mongodb.net/todo-app?retryWrites=true&w=majority";

// Connect to MongoDB (no need for deprecated options anymore)
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'], // Validation
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'], // Validation
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

// Create a model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo, // Export the Todo model
};
