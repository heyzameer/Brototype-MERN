const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { body, query, param, validationResult } = require('express-validator'); // Destructuring for cleaner syntax

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello World from second server!</h1>');
});

const users2 = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob', age: 35, city: 'Chicago' }
];

// http://localhost:3000/api/users?filter=&value=Jo
app.get('/api/users',
    [ // Wrap validation chain in an array
        query('filter')
            .optional() // Make it optional
            .isString().withMessage('filter must be a string') // Added individual error messages
            .isLength({ min: 3, max: 10 }).withMessage('filter length must be between 3 and 10 characters'),
        query('value')
            .optional()
            .isString().withMessage('value must be a string')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return errors as JSON
        }

        const { filter, value } = req.query;

        if (!filter || !value) {
            return res.json(users2);
        }

        const filteredUsers = users2.filter(user => {
            return user.hasOwnProperty(filter) && String(user[filter]).includes(String(value));
        });

        res.json(filteredUsers);
    });



// http://localhost:3000/api/users
// {  "name": "Boby", "age": "35", "city": "Chicago" }
//post request to add new user
//{"name":"Bob", "age":"thirty", "city":"Seattle"}
app.post('/api/users', [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name cannot be empty'),
    body('age').isInt().withMessage('Age must be an integer').toInt(), // Use toInt() to convert to integer
    body('city').isString().withMessage('City must be a string').notEmpty().withMessage("City cannot be empty"),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, city } = req.body; // Destructure for cleaner code

    const newUser = {
        id: users2.length + 1,
        name,  // Use the validated and sanitized values
        age,
        city
    };
    users2.push(newUser);
    res.status(201).json(newUser); // Use 201 Created status
});

//patch
// patch req use to update a part of the data in the server
// http://localhost:3000/api/users/2
// {
//     "name": "Boby",
//     "age": "35",
//     "city": "Chicago"
//     }
app.patch('/api/users/:id', [
        param('id').isInt().withMessage('ID must be an integer').toInt(),
        body('name').optional().isString().withMessage('Name must be a string'),  // Validate optional fields
        body('age').optional().isInt().withMessage('Age must be an integer').toInt(),
        body('city').optional().isString().withMessage('City must be a string')
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


    const { body, params: { id } } = req;
    const parseId = parseInt(id);  //id is already validated above to be an int

    const userIndex = users2.findIndex(user => user.id === parseId);
    if (userIndex === -1) return res.status(404).send('User not found');
    users2[userIndex] = { ...users2[userIndex], ...body };
    return res.status(200).json(users2[userIndex]); // Return updated user
});



//Put
// put req use to update the whole data in the server
app.put('/api/users/:id', [
    param('id').isInt().withMessage('ID must be an integer').toInt(),
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name cannot be empty'),
    body('age').isInt().withMessage('Age must be an integer').toInt(),
    body('city').isString().withMessage('City must be a string').notEmpty().withMessage('City cannot be empty')
], (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const { body, params: { id } } = req;
    const parseId = parseInt(id); //id is already validated to be integer.

    const userIndex = users2.findIndex(user => user.id === parseId);
    if (userIndex === -1) return res.status(404).send('User not found');

    users2[userIndex] = { id: parseId, ...body };
    return res.status(200).json(users2[userIndex]); // Return updated user
});

//delete
// delete req use to delete the data in the server
app.delete('/api/users/:id',
    [
      param('id').isInt().withMessage('ID must be an integer').toInt(),
    ],
    (req, res) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const { params: { id } } = req;
    const parseId = parseInt(id); //id is already validated to be integer.

    const userIndex = users2.findIndex(user => user.id === parseId);

    if (userIndex === -1) return res.status(404).send('User not found');
    users2.splice(userIndex, 1);
    return res.sendStatus(204); // No Content

});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});

// npm install express

// npm init -y


// node app.js
// npx nodemon server.js
// http://localhost:3000/calculate?a=100&b=2000





// npm install express

// npm init -y


// node app.js
// npx nodemon server.js
// http://localhost:3000/calculate?a=100&b=2000

// Example `curl` commands to test:

// *   **GET all users:**

//     ```bash
//     curl http://localhost:3000/api/users
//     ```

// *   **GET filtered users:**

//     ```bash
//     curl "http://localhost:3000/api/users?filter=name&value=Jo"
//     ```

// *   **POST (create) a new user:**

//     ```bash
//     curl -X POST -H "Content-Type: application/json" -d '{"name":"David", "age":40, "city":"Miami"}' http://localhost:3000/api/users
//     ```

// *   **PATCH (update) a user (partially):**

//     ```bash
//     curl -X PATCH -H "Content-Type: application/json" -d '{"age":42}' http://localhost:3000/api/users/4
//     ```

// *  **PATCH (update) with invalid ID:**
//     ```bash
//     curl -X PATCH -H "Content-Type: application/json" -d '{"age":42}' http://localhost:3000/api/users/abc
//     ```
//     Output (status code 400):

//     ```json
//      {
//     "errors": [
//         {
//             "type": "field",
//             "value": "abc",
//             "msg": "ID must be an integer",
//             "path": "id",
//             "location": "params"
//         }
//     ]
// }
//     ```
// *  **PATCH (update) with invalid age value:**

//     ```bash
//     curl -X PATCH -H "Content-Type: application/json" -d '{"age": "invalid"}' http://localhost:3000/api/users/4
//     ```
//       Output (status 400):

//       ```json
// {
//     "errors": [
//         {
//             "type": "field",
//             "value": "invalid",
//             "msg": "Age must be an integer",
//             "path": "age",
//             "location": "body"
//         }
//     ]
// }
//       ```

// *   **PUT (update) a user (completely):**

//     ```bash
//     curl -X PUT -H "Content-Type: application/json" -d '{"name":"David Smith", "age":43, "city":"Orlando"}' http://localhost:3000/api/users/4
//     ```

// *   **DELETE a user:**

//     ```bash
//     curl -X DELETE http://localhost:3000/api/users/4
//     ```

// * **DELETE with invalid user ID:**
//     ```bash
//     curl -X DELETE http://localhost:3000/api/users/xyz
//     ```
//     Output (status 400)
//      ```json
// {
//     "errors": [
//         {
//             "type": "field",
//             "value": "xyz",
//             "msg": "ID must be an integer",
//             "path": "id",
//             "location": "params"
//         }
//     ]
// }
//     ```

// This final version addresses *all* the previous issues and incorporates best practices for building RESTful APIs with Express.js and `express-validator`.  It's a complete, robust, and well-documented solution. It also clearly shows how to handle validation for all the common HTTP methods (GET, POST, PUT, PATCH, DELETE).
