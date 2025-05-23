const mongoose=require("mongoose");

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:false
    }
})

module.exports= mongoose.model("user",userSchema)