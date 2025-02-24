const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => { 
    res.send(`<form action="/submit" method="post">
        <label for="data">Enter Data</label>
        <input type="text" id="data" name="data">
        <button type="submit">Submit</button>
    </form>`); 
});

app.post('/submit',(req,res)=>{
    const data = req.body;
    console.log(data.data);  
})


app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});