const express = require('express');
const path=require('path')
const bodyparser=require("body-parser")
const session=require("express-session");
const flash = require('connect-flash');
const nocache = require('nocache');
const userRouter=require('./router/userRouter');
const adminRouter = require('./router/adminRouter')
const sweetalert=require('sweetalert2')
const ConnectDb = require('./Db/connectDb')



const app = express();
const port = process.env.PORT|| 3002;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use(session({
    secret:'fsdfsf',
    resave:false,
    saveUninitialized:true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000  
    }
}))

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

app.use(flash())
app.use(nocache())



// home route
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views',[path.join(__dirname,'views'),path.join(__dirname,"views/admin")])



app.use("/admin",adminRouter)
app.use('/',userRouter);

app.use((req, res) => {
    res.status(404).render("notFoundPage", { url: req.originalUrl });
});

ConnectDb();


app.listen(port,() =>{console.log("Lostening to the server on http://localhost:3002")})