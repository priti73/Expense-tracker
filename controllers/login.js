
const signup=require('../models/signup');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function validatestring(string){
   if(string==undefined || string.length===0)
    return true;
    else {
      return false;
    }
}

function generateToken(id,name,ispremiumuser){
  return jwt.sign({userid:id,name:name,ispremiumuser},process.env.JWT_SECRET_KEY);
}

exports.login= async (req,res,next)=>{
   try{
        const {email,password }=req.body
       if(validatestring(email) || validatestring(password)){
         return res.status(400).json({error:"ALL feilds are required"})
         }
         const user = await signup.findOne({ email });

       if(user){
           bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
              res.status(500).json({  message:"something went wrong"})
            }
            else if(result===true){
            console.log(user.password);
            res.status(201).json({ success: true, message:"user logged successfully"
          ,token:generateToken(user.id,user.name,user.ispremiumuser)})
            }
    
            else{
            res.status(401).json({ success: false, message:"incorrect password"})
               }
            }
          )}
       else{
         res.status(404).json({success:false, message: "User not found"})
       }
      
      }
      catch(err){
      res.status(500).json({message: err, success:false})
    }
 }
