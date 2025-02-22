const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Dummy Data
const items = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', description: 'Description of Item 3' },
];

const products = [
    { id: 1, name: 'Product A', price: 25, image: 'https://static.vecteezy.com/system/resources/previews/003/558/840/non_2x/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg' },
    { id: 2, name: 'Product B', price: 50, image: 'https://static.vecteezy.com/system/resources/previews/003/558/840/non_2x/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg' },
    { id: 3, name: 'Product C', price: 75, image: 'https://static.vecteezy.com/system/resources/previews/003/558/840/non_2x/3d-realistic-product-display-with-light-neon-ring-background-free-vector.jpg' }
];

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', city: 'New York' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', city: 'Chicago' },
];

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.get('/items', (req, res) => {
    res.render('items', { items: items, title: 'Items List' });
});

app.get('/cards', (req, res) => {
    res.render('cards', { products: products, title: 'Product Cards' });
});

app.get('/table', (req, res) => {
    res.render('table', { users: users, title: 'User Table' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});