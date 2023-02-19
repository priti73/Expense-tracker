const user = require('../models/signup');
const bcrypt=require('bcrypt');

function validatestring(string){
   if(string==undefined || string.length===0)
    return true;
    else {
      return false;
    }
}

exports.signup= (req,res,next)=>{
    try{
       const {name,email,password }=req.body
       if(validatestring(name) || validatestring(email) 
       || validatestring(password)){
         return res.status(400).json({error:"ALL feilds are required"})
       }
       const saltrounds=10;
       bcrypt.hash(password,saltrounds, async(err,hash)=>{
        console.log(err);
         await user.create({
            name,
            email,
            password: hash
         })
         res.status(201).json({message: 'Succesfully signup'});
       })
      }
      
    catch(err){
       res.status(500).json({
          error: err
       })
    }
 }