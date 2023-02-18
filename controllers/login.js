//const login = require('../models/login');
const signup=require('../models/users');

function validatestring(string){
   if(string==undefined || string.length===0)
    return true;
    else {
      return false;
    }
}

exports.login= async (req,res,next)=>{
   try{
      const {email,password }=req.body
      if(validatestring(email) || validatestring(password)){
         return res.status(400).json({error:"ALL feilds are required"})
         }
       const user=await signup.findAll({where : {email}})
       if(user.length>0){
            if(user[0].password===password){
              console.log(user[0].password);
             res.status(200).json({ success: true, message:"user logged successfully"})
            }
      
          else{
            res.status(400).json({ success: false, message:"incorrect password"})
              }
            }
       else{
         res.status(404).json({success:false, message: "User not found"})
       }
      
      }
      catch(err){
      res.status(500).json({message: err, success:false})
    }
 }
