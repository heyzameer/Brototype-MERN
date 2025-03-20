const User = require('../model/userModel')


const getuserpage = async (req, res) => {
    if (req.session.isAuth) {
        res.render('home', { message: "Login Successful!" });
    } else {
        res.render('login');
    }
};


    
const login=async(req,res)=>{
    res.render('login');
}


const signupPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({ email });

        if (user) {
            req.flash("error", "User already exists! Please log in.");
            return res.redirect('/signup'); // Redirect back to signup page
        }

        const newUser = await User.create({ email, password });
        req.session.isAuth = true;
        req.session.user = newUser.email;

        
        return res.redirect('/'); // Redirect to home page after signup
    } catch (error) {
        console.log(error.message);
        req.flash("error", "Server error, please try again.");
        return res.redirect('/signup');
    }
};




const loginPost = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('req.body:', req.body);

        const ifUser = await User.findOne({ email });

        if (!ifUser) {
            req.flash('error', 'Email is not correct');
            return res.redirect('/login');
        }

        if (password !== ifUser.password) {
            req.flash('error', 'Incorrect password');
            return res.redirect('/login');
        }

        req.session.user = email;
        req.session.isAuth = true;

        
        return res.redirect('/');
    } catch (error) {
        console.log(error.message);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/login');
    }
};



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