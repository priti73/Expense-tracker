require('dotenv').config();
const uuid = require('uuid');
const Sib= require('sib-api-v3-sdk');
const User = require('../models/signup');

const Password = require('../models/forgotpassword');
let requestId;
let recepientEmail;
/*exports.forgotpassword = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

         const client = Sib.ApiClient.instance;

        const apiKey = client.authentications['api-key'];

        apiKey.apiKey = 'xsmtpsib-9a9df84009b6ce585fc7e83bb94c910aa091e13b1abd876e05b28b3d1186b433-KtOWxMDr9Rp03wzT';

        const transEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email : 'pritikumarinits@gmail.com',
            name : 'Priti'
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
            htmlContent : `<h1>Your password reset link<h1>`,
            
        })

        res.status(200).json({status : 200, message : "check your mailbox for reset link"});
    }
}
    catch(err) {
        console.log(err);
        res.status(409).json({message : "failed changing password"})
    }
 }*/


 
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
            active : true
        })

        const client = Sib.ApiClient.instance;

        const apiKey = client.authentications['api-key'];

        apiKey.apiKey = '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';

        const transEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email : 'kevray39@gmail.com',
            name : 'Kevin'
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
            <a href="http://3.110.155.116:3000/password/resetpassword/{{params.requestId}}">click here to reset your password</a>`,
            params : {
                requestId : requestId
            }
        })

        res.status(200).json({status : 200, message : "check your mailbox for reset link"});
    }
    catch(err) {
        console.log(err);
        res.status(409).json({message : "failed changing password"})
    }
 }
