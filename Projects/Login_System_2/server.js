// const express = require("express");
// const path = require("path"); // Required to handle file paths
// const bodyParser = require("body-parser"); // Required to handle POST requests

// const app = express();
// const port = 3000;

// // Middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Route to serve HTML file correctly
// app.get("/home", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html")); // ✅ Correct absolute path
// });

// // Handle form submission
// app.post("/submit", (req, res) => {
//     const data = req.body;
//     console.log(data);
//     res.send("Data received");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


let a = [2,2,1,1,3,4,3,5,6,7,8];

let b = a.filter((item, index) => {
    return a.indexOf(item) == index;
});

console.log(b);

let c = a.reduce((acc, item) => {
    if(!acc.includes(item)){
        acc.push(item);
    }
    return acc;
}, []);
console.log(c);


let d = a.reduce((acc,item)=>{
    if(!acc.includes(item)){
    acc.push(item)
    }
    return acc;
},[]);


console.log(d);


let e = a.filter((item,index)=>{
    return a.indexOf(item)===index;
})
