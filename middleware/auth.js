const jwt=require('jsonwebtoken');
const User=require('../models/signup');

exports.authenticate=(req,res,next)=>{
 try{
    const token=req.header('Authentication');
    console.log(token);
    const user=jwt.verify(token,'qweryyuioplkjhgfdsazxxcvbnm');
    console.log(user.userid);
    User.findByPk(user.userid).then(user=>{
        console.log(JSON.stringify(user));
        req.user=user;
        next();
        }).catch(err=>{
            throw new Error(err)
        })
 }
 catch (err){
    console.log(err);
    return res.status(401).json({success:false});

 }
}

