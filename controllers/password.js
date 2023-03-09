require("dotenv").config();
const uuid = require('uuid');
const Sib= require('sib-api-v3-sdk');
const User = require('../models/signup');
const bcrypt = require('bcrypt');

const Password = require('../models/forgotpassword');

let recepientEmail;
exports.postForgotPassword = async(req, res, next) => {
    try {
        const email = req.body.email;
        const requestId = uuid.v4();
            
        recepientEmail = await User.findOne({where : {email : email}});

        if(!recepientEmail) {
            res.status(404).json({status : 404, message : "please provide your registered email"})
        }


        const resetRequest = await Password.create({
            id : requestId,
            active : true,
            signupId: recepientEmail.id,
        })

        const client = Sib.ApiClient.instance;

        const apiKey = client.authentications['api-key'];
        console.log(process.env.SEND_IN_BLUE_API_KEY);

        apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

        const transEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email : 'kumaripriti3298@gmail.com',
            name: 'Priti',
        }

        const recievers = [
        {
            email : `${email}`
        },
        ]
        
        const emailResponse = await transEmailApi.sendTransacEmail({
            sender,
            To : recievers,
            subject : 'Password reset link',
            textContent : 'hey  here to reset your password',
            htmlContent : `<h1>Your password reset link<h1>
            <a href="http://localhost:3000/password/resetpassword/{{params.requestId}}">click here to reset your password</a>`,
            params : {
                requestId : requestId
            }
        })

        res.status(200).json({status : 200, message : "check your mailbox for reset link"});
    }
    catch(err) {
        res.status(409).json({message : "failed changing password"})
    }
 }


exports.resetPassword=async (req,res,next)=>{
try{
  const resetuser=await Password.findByPk(req.params.id);
  if(resetuser){
      if(resetuser.active===true)
      {
        console.log('user exist');
        resetuser.update({ active: false});
        res.send(`<form  action="/password/updatepassword/${req.params.id}" method="get">
        <label for="newpassword">Password:</label>
        <input type="text" name="newpassword" id="newpassword" required/>
        <button>Submit</button>
       </form>
        <script> function formsubmitted(e){
            e.preventDefault();
            console.log('called')
        }
        </script>`)
        res.end();
      }
  }
  else{
    res.status(404).json({message : "You don't have existing account"})
  }
}
catch(err) {
    console.log(err);
    res.status(409).json({message : "failed changing password"})
}
}

exports.updatepassword =async (req,res)=>{
    try{
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        const updatepassword=await Password.findByPk(resetpasswordid);
        console.log(updatepassword.signupId);
        const user=await User.findByPk(updatepassword.signupId);
        if(user){
            const saltRounds=10;
            bcrypt.genSalt(saltRounds,  function(err,salt){
                if(err){
                    console.log(err);
                    throw new Error(err);
                }
                bcrypt.hash(newpassword,salt,function(err,hash){
                    if(err){
                        console.log(err);
                        throw new Error(err);  
                    }
                        user.update({password:hash}).then(()=>{
                        res.status(201).json({message: 'Successfuly update the new password'}) 
                     })
                })
            })
            
        }
        else{
            return res.status(404).json({ error: 'No user Exists', success: false})
        }
    }
    catch(err) {
        console.log(err);
        res.status(409).json({message : "failed changing password"})
    }
}