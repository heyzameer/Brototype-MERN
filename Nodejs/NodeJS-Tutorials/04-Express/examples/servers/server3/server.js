const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello World from second server!</h1>');
}
);


const users2 = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob', age: 35, city: 'Chicago' }
];

//http://localhost:3000/api/users
app.get('/api/users', (req, res) => {
    const { filter, value } = req.query;

    if (!filter || !value) return res.json(users2);

    const filteredUsers = users2.filter(user =>
        user[filter] && user[filter].toString().includes(value)
    );

    res.json(filteredUsers);
});


// http://localhost:3000/api/users/2
// {  "name": "Boby", "age": "35", "city": "Chicago" }
//post request to add new user 
app.post('/api/users', (req, res) => {
    const newUser = { id: users2.length + 1, ...req.body };
    users2.push(newUser);
    res.status(201).send(newUser);

});

//patch
// patch req use to update a part of the data in the server
// http://localhost:3000/api/users/2
// {
//     "name": "Boby",
//     "age": "35",
//     "city": "Chicago"   
//     }
app.patch('/api/users/:id', (req, res) => {
    const {body,params:{id},}=req;

    const parseId = parseInt(id);
    if(isNaN(parseId)) return res.status(400).send('Invalid ID');
    const userIndex = users2.findIndex(user => user.id === parseId);
    if (userIndex === -1) return res.status(404).send('User not found');
    users2[userIndex] = { ...users2[userIndex], ...body };
        return res.sendStatus(200)
});



//Put
// put req use to update the whole data in the server
app.put('/api/users/:id', (req, res) => {
    const {body,params:{id}}=req;

    const parseId = parseInt(id);
    if(isNaN(parseId)) return res.status(400).send('Invalid ID');
    const userIndex = users2.findIndex(user => user.id === parseId);
    if (userIndex === -1) return res.status(404).send('User not found');
   
    users2[userIndex] = { id: parseId, ...body };
    return res.status(200).send(users2[userIndex]);
});

//delete
// delete req use to delete the data in the server
app.delete('/api/users/:id', (req, res) => {
    console.log("helloo");
    const {params:{id}}=req;
    const parseId = parseInt(id);
    if(isNaN(parseId)) return res.status(400).send('Invalid ID');
    const userIndex = users2.findIndex(user => user.id === parseId);
    console.log(userIndex);
    if (userIndex === -1) return res.status(404).send('User not found');
    users2.splice(userIndex, 1);
    return res.sendStatus(204);

})


app.listen(PORT, () => {    
    console.log(`Server is running on http://localhost:${PORT}`);

});

// npm install express

// npm init -y


// node app.js
// npx nodemon server.js
// http://localhost:3000/calculate?a=100&b=2000