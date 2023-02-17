const Expense = require('../models/users');

exports.signup=async (req,res,next)=>{
   const name=req.body.name;
   const email=req.body.email;
   const password=req.body.password;
    try{
 
       if(!req.body.name || !req.body.email || !req.body.password){
          throw new Error('Plz fill all the fields')
       }
   //   const name=req.body.name;
   //   const email=req.body.email;
   //   const password=req.body.password;
     
      const data =await Expense.create({
         name:name,
         email:email,
         password: password
      });
      console.log('new expense');
      res.status(201).json({newuser:data});
    }
    catch(err){
       res.status(500).json({
          error: err
       })
    }
 }