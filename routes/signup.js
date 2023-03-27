const path= require('path');

const express=require('express');
const userscontroller=require('../controllers/signup');

const router=express.Router();

 router.post('/users/signup',userscontroller.signup);
module.exports=router;
