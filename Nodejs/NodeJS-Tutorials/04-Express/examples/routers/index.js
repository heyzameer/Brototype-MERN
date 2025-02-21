// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import the products router
const productRouter = require('./routes/products');

// Middleware to parse JSON bodies (important for POST/PUT requests)
app.use(express.json());

// Mount the productRouter at the /products path
app.use('/products', productRouter);

// Basic route for the root URL
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Product API!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});