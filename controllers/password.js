exports.forgotpassword=async(req,res,next)=>{
    try{
       console.log(req.body.email);
    }
    catch(err){
        console.log(err);
    }
}