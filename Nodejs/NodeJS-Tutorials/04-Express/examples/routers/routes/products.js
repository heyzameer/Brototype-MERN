// routes/products.js
const express = require('express');
const router = express.Router();

// Sample product data (in a real app, this would come from a database)
const products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
];

// GET /products - Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET /products/:id - Get a specific product by ID
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id); // Convert id to integer
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).send('Product not found'); // 404 if not found
    }

    res.json(product);
});
//'{"name":"Monitor", "price":300}' http://localhost:3000/products
// POST /products - Create a new product (very basic example)
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1, // Simple ID generation
        name: req.body.name,
        price: req.body.price
    };

    if (!newProduct.name || !newProduct.price) {
      return res.status(400).send("name and price are required")
    }

    products.push(newProduct);
    res.status(201).json(newProduct); // 201 Created
});

module.exports = router; // Export the router