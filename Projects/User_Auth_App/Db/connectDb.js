const mongoose=require('mongoose');
const connectDb = async () => {
try {
const conn = await mongoose.connect('mongodb+srv://user:zGrxrSAsruBZ3zxt@cluster0.iriaonw.mongodb.net/user_auth_app?retryWrites=true&w=majority', {});
console. log( `MongoDB Connected: ${conn.connection.host}`);
}
 catch (error) {
console. log (error); 
process.exit (1);
}
};


module.exports=connectDb