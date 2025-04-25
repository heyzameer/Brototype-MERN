const express = require('express');
const app=express();
const userRouter = require('./router.js')


app.use('/sum',userRouter)

app.use((req,res,next)=>{
    if(!req.method=='GET'){
        // console.log(req.method);
        next();
    }
    res.send("GET request is blocked")
})

app.post('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(3000,()=>{
    console.log(`server http://localhost:3000`)
})