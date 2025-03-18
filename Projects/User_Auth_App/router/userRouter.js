const express = require('express');// 
const router = express.Router();
const userController= require('../controller/userController')
const usermiddlewire=require('../middlewire/user')



router.get('/',userController.getuserpage);
router.get('/login',usermiddlewire.iflogged,userController.login);
router.post('/login',userController.loginPost)
router.get('/logout',userController.logout)
router.get('/signup',usermiddlewire.iflogged,userController.signup);
router.get('/contact',usermiddlewire.iflogged1,userController.contact);
// router.get('/forgot-password',usermiddlewire.iflogged,userController.profile);




router.post('/login',userController.loginPost);
router.post('/signup' ,userController.signupPost)

module.exports = router;

