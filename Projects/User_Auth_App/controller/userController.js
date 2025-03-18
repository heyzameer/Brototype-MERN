const User = require('../model/userModel')



const getuserpage=async (req,res)=>{
    if(req.session.isAuth){
       
        res.render('home')
    }else{
        res.render('login')
    } 
}

const login=async(req,res)=>{
    res.render('login');
}


const signupPost = async (req,res) => {
    try {

        const {email,password}=req.body
        console.log(email,password)
        const user= await User.findOne({email})
        if(user){
            alert("user already exist")
            return res.render('signup')
            
        } 
        
        const newUser= {
            email,
            password
        }

        await User.create(newUser);
        req.session.isAuth=true;
        req.session.user=newUser.email;

        return res.render('home')
    } catch (error) {
        console.log(error.message)
    }
}


const loginPost=async (req , res) => {
    try {
        const {email , password } = req.body;
        console.log('req.body:',req.body);
        const ifUser = await User.findOne({email});
        console.log(ifUser)
        // console.log(ifUser)
        if(!ifUser){
            req.flash('error','email is not correct')
           return res.redirect('/login');
        }
        

        if(email !== ifUser.email && password !== ifUser.password){
           return res.redirect('/login');
        }

        req.session.user = email;
         req.session.isAuth = true;

        return res.redirect('/');
    } catch (error) {
        console.log(error.message); 
    }
}

const signup=async (req,res)=>{
    res.render('signup');
}


const contact=async(req,res)=>{
    req.session.isAuth=false;
    res.render('contact')
}


const logout = async(req,res)=>{
    req.session.isAuth = false;
    res.redirect('/login');
}



const profile=async(req,res)=>{
    res.render('profile')
}

module.exports={
    getuserpage,
    signupPost,
    loginPost,
    logout,
    login,
    signup,
    contact,
    profile
};