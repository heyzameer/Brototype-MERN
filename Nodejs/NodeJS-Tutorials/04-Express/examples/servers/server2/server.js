const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Hello World from second server!</h1>');
}
);


const users = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob', age: 35, city: 'Chicago' }
];


app.get('/api/users',(req,res)=>{
    res.send([{name:'John',age:25,city:'New York'}
           ,{name:'Jane',age:30,city:'Los Angeles'}
           ,{name:'Bob',age:35,city:'Chicago'}]);
 });




 // path parameters or route parameters
 const users2 = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob', age: 35, city: 'Chicago' }
];

app.get('/api/users/f', (req, res) => {
    const { filter, value } = req.query;

    if (!filter || !value) return res.json(users2);

    const filteredUsers = users2.filter(user =>
        user[filter] && user[filter].toString().includes(value)
    );

    res.json(filteredUsers);
});


 // query parameters
app.get('/calculate', (req, res) => {
    const { f, r } = req.query;
    const sum = parseInt(f) + parseInt(r);
    res.status(200).send(`<h1>Sum is ${sum}</h1>`);
}
);


 
app.get('/api/users/products',(req,res)=>{
    res.send([{name:'Laptop',price:1000,brand:'Dell'}
          ,{name:'Mobile',price:500,brand:'Samsung'}
          ,{name:'Tablet',price:800,brand:'Apple'}]);
     });

app.listen(PORT, () => {    
    console.log(`Server is running on http://localhost:${PORT}`);

});

// npm install express

// npm init -y


// node app.js
// npx nodemon server.js
// http://localhost:3000/calculate?a=100&b=2000