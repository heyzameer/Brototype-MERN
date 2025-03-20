const express = require('express');
const app = express();

const path = require('path');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];
const product = {};

app.get('/sum',(req,res)=>{
    const {a,b}= req.query;
    const num1= parseFloat(a);
    const num2 =  parseFloat(b);
    const result = num1 + num2;
    res.json({result})
});

app.get("/render",(req,res)=>{
    res.render('index');
})
app.post('/submit', (req, res) => {
    const data = req.body;

    users.push(data);

    res.send(`
        <h1>User Data</h1>
        <ul>
            ${users.map(user => `<li>Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}</li>`).join('')}
        </ul>
    `);
});

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})