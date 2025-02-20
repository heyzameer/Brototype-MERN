// const EventEmitter=require("events");
// const emitter=new EventEmitter();


// emitter.on("message",(data)=>{
// console.log(data.user);
// })

// emitter.emit("message",{user:"loged"})

//--------------------------------------------------
// const http=require("http");


// http.createServer((req,res)=>{
//     res.write("this is node.js")
//     res.end();
// }).listen(3001,()=>console.log("server is running"))


//-------------------------------------------

// const http=require("http")
// const path=require("path")
// const fs=require("fs")

// const server=http.createServer((req,res)=>{
//     if(req.url==="/"){
//         fs.readFile(path.join(__dirname,"views","index.html"),"utf8",(err,data)=>{
//             if (err) throw err
//             res.writeHead(200,{"content-Type":"text/html"})
//         res.end(data);
//         })
//     }
//     // if(req.url==="/contact"){
//     //     fs.readFile(path.join(__dirname,"views","contact.html"),"utf8",(err,data)=>{
//     //         if (err) throw err
//     //         res.writeHead(200,{"content-Type":"text/html"})
//     //     res.end(data);
//     //     })
//     // }
//     if(req.url==="/contact"){
//         res.write("Conatct page")
//         res.end();
//     }
//     })


// const PORT=process.env.PORT ||3000;
// server.listen(PORT,()=> console.log(`server running on${PORT}`))

//---------------------------------------------------------

// const http = require("http");
// const path = require("path");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     if (req.url === "/") {
//         fs.readFile(path.join(__dirname, "views", "index.html"), "utf8", (err, data) => {
//             if (err) throw err;
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.end(data);
//         });
//     } else if (req.url === "/contact") {
//         fs.readFile(path.join(__dirname, "views", "contact.html"), "utf8", (err, data) => {
//             if (err) throw err;
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.end(data);
//         });
//     }
// });

// server.listen(3000, () => console.log(`Server running at http://localhost:3000`));




//------------------------------------------

// const http=require("http");
// const path=require("path");
// const fs=require("fs");

// const server=http.createServer((req,res)=>{
//     fs.readFile(path.join(__dirname,"views","index.html"),"utf8",(err,data)=>{
//         if(err) throw err;
//         res.writeHead(200,{"content-Type":"text/html"})
//         res.end(data);
//     })
// })
// server.listen(3000,console.log(`server running at http://localhost:3000`))



//------------------------------------------

// const hii=require("./utile");

// console.log(hii(3,5));

//---------------------------------------


// const express=require("express");
// const app=express();
// const path=require("path")

// app.get("/",(req,res)=>{
//     res.sendfile(path.join(__dirname,"views","index.html"))
// })
// app.use(express.static("views"))

// app.listen(3001,()=>console.log(`server http://localhost:3001`))


//----------------------------------------------



// const express=require("express");
// const app=express();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static("views"))


// const emaildb="naveen@gmail.com"
// const passdb="123"


// app.post("/login",(req,res)=>{
//     const {email,password}=req.body
//     if(email==emaildb && password==passdb){
//         res.send("successfully loged")
//     }else{
//         res.render("contact");
//     }
// })



// app.listen(3001,console.log(`server http://localhost:3001`))



//------------------------------------------------------------


// const express=require("express");
// const app=express();
// const PORT=3000;


// app.get('/',(req,res)=>{
//     res.send("hello home page")
// })

// app.get('/contact',(req,res)=>{
//     res.send("hellocontact page")
// })

// app.listen(PORT,()=>{
//     console.log(`server running on http://localhost:3000`)
// })


//--------------------------------------------------

// const express=require("express");
// const app=express();
// const path=require("path")
// const port=3000;


// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'))
// })

// app.get('/contact',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','contact.html'))
// })

// app.listen(port,()=>{
//     console.log(`server running on http://localhost:3000`)
// })


//--------------------------------------------------------------





// const express=require("express");
// const app=express();
// const path=require("path")
// const port=3000;


// app.get('/',(rq,res)=>{
//     res.download(path.join(__dirname,'views','sample.txt'))
// })


// app.listen(port,()=>{
//         console.log(`server running on http://localhost:3000`)
//     })

//-------------------------------------------------------


// const http=require("http");


// http.createServer((req,res)=>{
//     res.write('helloo');
//     res.end();
// }).listen(3000,()=>console.log(`server running on http://localhost:3000`));

//-----------------------------


// const http=require("http")
// const path=require("path")
// const fs=require("fs")


//     // fs.mkdir(path.join(__dirname,"/api","api2.txt"),{},(err)=>{
//     //     if(err) throw err;

//     // })
//     fs.writeFile(path.join(__dirname,"/api2","api2.txt"),"user:helloo",(err)=>{
//         if(err) throw err;

//     })


//...................................

// const express=require("express");
// const app=express();
// const path=require("path")
// const PORT=3000;


// app.get('/',(req,res)=>{
//     res.send("welcome")
// })

// app.get('/admin',(req,res)=>{
//      const value1=req.query.value1
//      const value2=req.query.value2
//      const sum=Number(value1)+Number(value2)
//      res.send(sum.toString())
//  })

// app.get('/home/:id',(req,res)=>{
//     const name=req.params.id
//     res.send(`hi ${name}`)
// })
// // app.get('/contact',(req,res)=>{
// //     res.sendFile(path.join(__dirname,'views','contact.html'))
// // })
// // app.get('/index',(req,res)=>{
// //     res.sendFile(path.join(__dirname,'views','index.html'))
// // })
// app.listen(PORT,()=>{
//     console.log(`server running on http://localhost:3000`)
// })


//_______________________________


// const http=require("http")
// const path=require("path")
// const fs=require("fs")


//     // fs.mkdir(path.join(__dirname,"/api","api2.txt"),{},(err)=>{
//     //     if(err) throw err;

//     // })
//     const http=require("http")
//     const path=require("path")
//     const fs=require("fs")


//---------------------------------------------

//     const http=require("http")
// const path=require("path")
// const fs=require("fs")


// // fs.writeFile(path.join(__dirname,"/api","api2.txt"),"use:naveen",(err)=>{
// //      if(err) throw err;
// // })

// fs.unlink(__dirname,"api2.txt",(err)=>{
//    if(err){
//     console.log("err")
//    }else{
//     console.log("deleted")
//    }
// })

//------------------------------------



// const http=require("http")
// const path=require("path")
// const fs=require("fs")


// fs.writeFile(path.join(__dirname,'api','api9'),"helloo",(err)=>{
//     if(err) throw err
// })

//-------------------



// const express=require("express");
// const app=express();

// app.get('/profile',token,validation,(req,res)=>{
//     res.send("done");
// })

// function token(req,res,next){
//      console.log("creating token")
//     //  const TOKEN=123;
//     //  req.token=TOKEN;
//      next();
// }
// function validation(req,res,next){
//     if(req.token){
//         console.log("token approved");
//         next();
//     }else{
//         res.send("not approved")
//     }
// }

// app.listen(3000,()=>console.log(`server running on http://localhost:3000`))



//-------------------


// const EventEmitter=require("events");
// const emitter=new EventEmitter();



// emitter.on('message',(data)=>{
//     console.log(data.user)
// })

// emitter.emit('message',{user:"naveen"})

//---------------







// const fs = require('fs');
// const path = require('path');

// const Filepath =  path.join(__dirname,'date.txt');
// const dateAndTime = new Date().toString();

// fs.writeFile(Filepath, dateAndTime, (err) => {
//     if(err) throw err;
// })

// fs.readFile(Filepath, 'utf8' , (err,data) => {
//     fs.writeFile(path.join(__dirname,'newFile.txt'), data , (err) => {
//         if(err) throw err;
//         console.log('writed success');
//     })
// })

// const fs = require('fs');
// const path = require('path');

// const Filepath =  path.join(__dirname,'date1.txt');
// const dateAndTime = new Date().toString();

// fs.writeFile(Filepath,dateAndTime,(err)=>{
//     if(err) throw err;

// })



//-------
// const http=require("http")

// http.createServer((req,res)=>{
//     res.write("hellol")
//     res.end();
// }).listen(3000,()=>console.log(`server http://localhost:3000`))


// const path=require("path")
// const fs=require("fs")


// fs.mkdir(path.join(__dirname,"/api8/api9"),{},(err)=>{
//     if(err) throw err;
// })

// const EventEmitter=require("events")
// const emitter=new EventEmitter()

// emitter.on("message",(data)=>{
//     console.log(data.text)
// })


// emitter.emit("message",{text:"hello"})



// const http=require("http");
// const fs=require("fs")
// const path=require("path");


// const timeAndDate=new Date().toString();
//     fs.writeFile(path.join(__dirname,"nn5.txt"),timeAndDate,(err,data)=>{
//         if(err) throw err
//         console.log(data)
//     })








// const express = require('express');
// const app = express();

// app.get('/user/:id', (req, res) => {
//   // Access the route parameter
//   const userId = req.params.id; // '123' if the URL is '/user/123'
  
//   res.send(`User ID: ${userId}`);
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


// const express=require("express")
// const app=express();

// app.get("/",(req,res)=>{
//   const name=req.query.name
//   res.send(`${name}`)
// })
// app.listen(3000,()=>{
//   console.log("http://localhost:3000")
// })

//.........................................


// const fs=require("fs")
// const path=require("path")

// // fs.mkdir(path.join(__dirname,"/api","api0"),{},(err)=>{
// //     if(err) throw err
// // })
// const dateandtime=new Date().toString()
// fs.rm(path.join(__dirname,"/api","api0"),{recursive:true},(err)=>{
//     if(err) throw err
// })






// const express=require("express")
// const app=express();


// app.get("/home/:id",(req,res)=>{
//     const name=req.params.id;
//     res.send(`hi ${name}`)
// })
// app.listen(3001,()=>{
//     console.log(`http://localhost:3001`)
// })


// const fs = require('fs')
// const promise = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         // resolve("hello")
//         reject("wrong")
//     },1000)

// })
// promise.then((res)=>{
//     fs.writeFile('resolve.txt',res,(err)=>{
//         if(err) throw err
//         console.log("data added");
//     })
// }).catch((err)=>{
//     fs.writeFile('reject.txt',err,(err)=>{
//         if(err) throw err
//         console.log("data added");
//     })
// })

// const fs=require("fs")

// const promise=new Promise((res,rej)=>{
//     // res("hello")
//     rej("sorry")
// })
// promise.then((response)=>{
//     fs.writeFile("jj.txt",response,(err)=>{
//         if(err) throw err
//     })
// }).catch((err)=>{
//     fs.writeFile("kk.txt",err,(err)=>{
//         if(err) throw err
//     })
// })

// const express=require("express")
// const app=express();

// app.get('/home/:id',(req,res)=>{
//     const name=req.params.id
//     res.send(`hi ${name}`)
// }).listen(3000,()=>{
//     console.log(`http://localhost:3000`)
// })

// const fs=require("fs")
// const path=require("path")



// const d=new Date().toString()

// fs.writeFile("gg.txt",d,(err)=>{
//     if(err) throw err
// })




