const express = require('express');
const app = express();
const router = express.Router();

const protected = (req,res,next)=>{
    res.send('You are not authenticated');
}

app.get('/file',protected,(res,req)=>{
    req.send('Hello Zameer');
});

app.delete('/file',protected,(res,req)=>{
    req.send('Delete Zameer');
});

app.listen(3000, ()=> console.log('Server running on port 3000'));














// import EventEmitter from 'event-emitter';

// const emmiter = new EventEmitter();

// emmiter.on('error',(err)=>{
//     console.log('Error: ', err);
// })

// emmiter.emit("error", new Error('Something went wrong'));


// import fs from 'fs'

// const promise = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         let time = new Date().toLocaleTimeString()
//         resolve(time)
//     })}, 1000)

// promise.then((result)=>{
//    fs.writeFile('result.txt', result, (err)=>{
//     if(err) throw err
//    })
// })