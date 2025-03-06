const express = require('express');
const router = express.Router();
const admincontroller=require('../controller/adminController')
const adminAuth= require('../middlewire/admin')

router.get('/login',adminAuth.isAdmin,admincontroller.loadLogin);
router.post('/login',admincontroller.login);
router.get('/dashboard',adminAuth.isAdmin2,admincontroller.loadDashboard)
router.post('/edit-user',adminAuth.isAdmin2,admincontroller.edituser)
router.get('/delete-user/:id',adminAuth.isAdmin2,admincontroller.deleteUser)
router.post('/add-user',adminAuth.isAdmin2,admincontroller.addUser)
router.get('/logout',adminAuth.isAdmin2,admincontroller.logout)


module.exports=router