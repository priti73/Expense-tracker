const User=require('../models/signup');
// const Expense=require('../models/expense');
// const sequelize=require('../util/database');



exports.getUserLeaderBoard=async(req,res)=>{
    try{
    //   const userleaderboarddetails=await User.findAll({
         
    //      order:[['totalexpense','DESC']]
         
    const userleaderboarddetails = await User.find().sort({ totalexpense: -1 });
         
      
       res.status(200).json(userleaderboarddetails)

    }
    catch (err){
        console.log(err);
        res.status(500).json(err)

    }
}
