const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    const {a,b} = req.query;

    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send("Invalid numbers provided");
      } 
    const result = num1+num2;
    res.send(`Sum is ${result}`);
});

module.exports= router;