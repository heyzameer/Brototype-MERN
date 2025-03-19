const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const filePath = path.join(__dirname, 'data.json');

// Read data from file (return an empty array if file is missing or empty)
const readData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const parsedData = data ? JSON.parse(data) : [];
        return Array.isArray(parsedData) ? parsedData : []; // Ensure it's an array
    } catch {
        return [];
    }
};


// Write data to file
const writeData = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Render form
app.get('/', (req, res) => res.render('index'));

// Save form data
app.post('/submit', async (req, res) => {
    console.log(req.body.name);
    const newEntry = { name: req.body.name, email: req.body.email, phone: req.body.phone };
    const existingData = await readData();  // Read current data
    console.log(newEntry);
    existingData.push(newEntry);            // Add new entry
    await writeData(existingData);          // Save back to file
    res.redirect('/');
});

// Read stored data
app.get('/readData', async (req, res) => res.json(await readData()));

app.listen(3000, () => console.log('Server running on port 3000'));
