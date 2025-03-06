


const iflogged = async(req,res,next)=>{
    try {
        if(req.session.isAuth){
            res.redirect('/')
        }else{
            next();
        }
    } catch (error) {
        console.log('error occured',error);
    }
}


const iflogged1 = async(req,res,next)=>{
    try {
        if(req.session.isAuth){
            next();
        }else{
            res.render('contact');
        }
    } catch (error) {
        console.log('error occured',error);
    }
}

const iflogged2 = async(req,res,next)=>{
    try {
        if(req.session.isAuth){
            res.render('home')
        }else{
           res.render("login")
        }
    } catch (error) {
        console.log('error occured',error);
    }
}



module.exports={
    iflogged,
    iflogged1,
    iflogged2
}