const { ListSearchIndexesCursor } = require('mongodb')
const adminModel=require('../model/adminModel')
const userModel=require('../model/userModel')


const loadLogin=async (req,res)=>{

    res.render('adminLogin')
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('req.body:', req.body);

        // Find the admin by email
        const ifAdmin = await userModel.findOne({ email, isAdmin: true });





        if (!ifAdmin) {
            console.log('Admin not found');
            req.flash('error', 'Email is not correct');
            return res.redirect('/admin/login');
        }

         req.session.admin = true;
        console.log('Session set: ', req.session.admin);

        // Redirect to dashboard after successful login
        return res.redirect('/admin/dashboard');

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('Server Error');
    }
};


const loadDashboard = async (req, res) => {
   if(req.session.admin){
        try {
            const admin = await userModel.findOne({ isAdmin: true });
            console.log('admin:',admin);
            console.log('req.session.admin:',req.session.admin);
                if (!admin) {
                    return res.redirect('/admin/login');
                }
                const users = await userModel.find({});
                return res.render('dashboard', { users });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Server Error');
        }
   }else{
    return res.redirect('/admin/login');
   }
};


const edituser=async(req,res)=>{
    try {
        const {email,password,id}=req.body
        const user=await userModel.findOneAndUpdate({_id:id},{$set:{email,password}})

        
        res.redirect('/admin/dashboard');


    } catch (error) {
        console.log(error);
    }
}

const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params
        const user = await userModel.findByIdAndDelete({_id:id})
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error);
    }
}
const addUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const newUser=new userModel({
            email,
            password
        })
        await newUser.save()
        res.redirect('/admin/dashboard')
    } catch (error) {
        console.log(error);
    }
}

// const logout=async(req,res)=>{
//     req.session.admin=null;
//     res.redirect('/admin/login')
// }
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error in destroying session:', err);
        }
        res.redirect('/admin/login');
    });
};





module.exports={loadLogin,login,loadDashboard,edituser,deleteUser,addUser,logout}