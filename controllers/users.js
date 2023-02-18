const user = require('../models/users');

function validatestring(string){
   if(string==undefined || string.length===0)
    return true;
    else {
      return false;
    }
}

exports.signup=async (req,res,next)=>{
   
    try{
       const {name,email,password }=req.body
       if(validatestring(name) || validatestring(email) 
       || validatestring(password)){
         return res.status(400).json({error:"ALL feilds are required"})
       }
     
      const data =await user.create({
         name:name,
         email:email,
         password: password
      });
      console.log('new user');
      res.status(201).json({newuser:data});
    }
    catch(err){
       res.status(500).json({
          error: err
       })
    }
 }