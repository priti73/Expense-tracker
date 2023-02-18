const path= require('path');

const express=require('express');
const logincontroller=require('../controllers/login');

const router=express.Router();

router.post('/users/login',logincontroller.login);
module.exports=router;
