const express = require('express');
const app = express();

app.get('/sum', (req, res) => {
    const { a, b } = req.query; // Extract query parameters

    // Convert values to numbers and check if they are valid
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Invalid numbers. Please provide valid numeric values.');
    }

    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
